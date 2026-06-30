import { useEffect, useRef } from "react";

/**
 * Hand-written WebGL flowing mesh-gradient ("aurora") in warm light tones.
 * fbm-domain-warped noise, cursor-reactive. No three.js, no shader libs.
 */
export function Aurora({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true, premultipliedAlpha: false });
    if (!gl) return;

    const vert = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;
    const frag = `
      precision highp float;
      uniform vec2 r; uniform float t; uniform vec2 m;
      // palette (warm, light)
      vec3 cPaper = vec3(0.972,0.956,0.929);
      vec3 cCream = vec3(0.949,0.886,0.776);
      vec3 cKraft = vec3(0.776,0.431,0.133);
      vec3 cPeach = vec3(0.909,0.620,0.447);
      vec3 cSky   = vec3(0.560,0.717,0.792);

      float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
      float noise(vec2 p){
        vec2 i=floor(p), f=fract(p);
        float a=hash(i), b=hash(i+vec2(1,0)), c=hash(i+vec2(0,1)), d=hash(i+vec2(1,1));
        vec2 u=f*f*(3.-2.*f);
        return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
      }
      float fbm(vec2 p){
        float v=0., a=0.5;
        for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=0.5; }
        return v;
      }
      void main(){
        vec2 uv = gl_FragCoord.xy / r;
        vec2 asp = vec2(r.x/r.y, 1.0);
        vec2 q = uv * asp;
        float tt = t*0.045;

        // domain warp
        vec2 w = vec2(fbm(q*1.6 + vec2(0.0, tt)), fbm(q*1.6 + vec2(5.2, -tt)));
        float n = fbm(q*2.2 + w*1.8 + tt*0.6);

        // cursor influence
        float md = distance(uv*asp, m*asp);
        n += smoothstep(0.6, 0.0, md) * 0.18;

        vec3 col = cPaper;
        col = mix(col, cCream, smoothstep(0.30,0.75,n));
        col = mix(col, cPeach, smoothstep(0.45,0.95,n)*0.55);
        col = mix(col, cKraft, smoothstep(0.66,1.05,n)*0.40);
        col = mix(col, cSky,   smoothstep(0.20,0.0,n)*0.30);

        // soft top vignette to paper for text legibility
        col = mix(col, cPaper, smoothstep(0.45,0.0,uv.y)*0.0 + smoothstep(0.55,1.0,uv.y)*0.35);

        // grain
        col -= (hash(uv*r*0.5+t)-0.5)*0.015;
        gl_FragColor = vec4(col,1.0);
      }`;

    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uR = gl.getUniformLocation(prog, "r");
    const uT = gl.getUniformLocation(prog, "t");
    const uM = gl.getUniformLocation(prog, "m");
    const mouse = { x: 0.5, y: 0.5 };
    let dpr = Math.min(window.devicePixelRatio || 1, 1.6);

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr; canvas.height = canvas.offsetHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = 1 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0, start = performance.now();
    const render = () => {
      const t = (performance.now() - start) / 1000;
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform1f(uT, t);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMove); };
  }, []);

  return <canvas ref={ref} className={className} />;
}
