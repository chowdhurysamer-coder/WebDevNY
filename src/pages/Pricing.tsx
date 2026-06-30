import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { RippleButton } from "@/components/ui/RippleButton";
import { useEffect, useRef } from "react";

// WebGL shader background
function ShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vert = `attribute vec2 a; void main(){ gl_Position=vec4(a,0.,1.); }`;
    const frag = `
      precision highp float;
      uniform float t; uniform vec2 r; uniform vec3 bg;
      mat2 rot(float a){ float c=cos(a),s=sin(a); return mat2(c,-s,s,c); }
      float var(vec2 v1,vec2 v2,float str,float spd){ return sin(dot(normalize(v1),normalize(v2))*str+t*spd)/100.; }
      vec3 circle(vec2 uv,vec2 ctr,float rad,float w){
        vec2 d=ctr-uv; float l=length(d);
        l+=var(d,vec2(0.,1.),5.,2.); l-=var(d,vec2(1.,0.),5.,2.);
        return vec3(smoothstep(rad-w,rad,l)-smoothstep(rad,rad+w,l));
      }
      void main(){
        vec2 uv=gl_FragCoord.xy/r.xy; uv.x*=1.5; uv.x-=.25;
        float m=0.; float rad=.35; vec2 c=vec2(.5);
        m+=circle(uv,c,rad,.035).r; m+=circle(uv,c,rad-.018,.01).r; m+=circle(uv,c,rad+.018,.005).r;
        vec2 v=rot(t)*uv;
        vec3 fg=vec3(v.x,v.y,.7-v.y*v.x);
        vec3 col=mix(bg,fg,m);
        col=mix(col,vec3(1.),circle(uv,c,rad,.003).r);
        gl_FragColor=vec4(col,1.);
      }`;

    const makeShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, makeShader(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, makeShader(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const a = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);

    const tLoc = gl.getUniformLocation(prog, "t");
    const rLoc = gl.getUniformLocation(prog, "r");
    const bgLoc = gl.getUniformLocation(prog, "bg");
    gl.uniform3fv(bgLoc, [0, 0, 0]);

    let raf: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; gl.viewport(0,0,canvas.width,canvas.height); };
    resize();
    window.addEventListener("resize", resize);

    const render = (time: number) => {
      gl.uniform1f(tLoc, time * 0.001);
      gl.uniform2f(rLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" />;
}

const plans = [
  {
    name: "Starter",
    price: "2,499",
    desc: "Perfect for new businesses that need a strong digital presence fast.",
    features: ["Up to 5 pages", "Mobile-responsive design", "Contact form + map", "On-page SEO", "1-year hosting included", "30-day support"],
    cta: "Get Started",
    popular: false,
    color: "#38bdf8",
  },
  {
    name: "Growth",
    price: "4,999",
    desc: "For established businesses ready to compete and convert online.",
    features: ["Up to 12 pages", "Custom animations", "Blog / CMS integration", "Full SEO foundation", "GA4 + heatmap setup", "Booking / lead system", "90-day support"],
    cta: "Most Popular",
    popular: true,
    color: "#a78bfa",
  },
  {
    name: "Elite",
    price: "9,999",
    desc: "Full-stack custom build with e-commerce, API integrations, and ongoing strategy.",
    features: ["Unlimited pages", "E-commerce ready", "Custom API integrations", "A/B testing setup", "Advanced analytics", "Priority support", "Quarterly strategy calls"],
    cta: "Let's Talk",
    popular: false,
    color: "#fbbf24",
  },
];

export default function Pricing() {
  return (
    <div className="bg-black text-white pt-28 min-h-screen relative overflow-hidden">
      <ShaderCanvas />

      <section className="relative px-4 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-[clamp(36px,7vw,84px)] font-bold leading-[0.92] tracking-[-0.03em] mb-6"
        >
          Simple, flat<br />
          <span className="gradient-text italic">pricing.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/60 font-barlow text-lg max-w-xl mx-auto"
        >
          One-time project fee. No retainers, no monthly surprises. You own everything we build.
        </motion.p>
      </section>

      <section className="relative px-4 pb-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 items-start">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className={`glass rounded-3xl p-7 relative ${p.popular ? "ring-1 ring-violet-400/40 scale-105" : ""}`}
            >
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-barlow font-semibold" style={{ background: p.color, color: "#000" }}>
                  Most Popular
                </div>
              )}
              <h2 className="font-display text-3xl font-bold text-white mb-1">{p.name}</h2>
              <p className="text-white/50 font-barlow text-sm mb-5">{p.desc}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-white/40 font-barlow text-lg">$</span>
                <span className="font-display text-5xl font-bold text-white">{p.price}</span>
                <span className="text-white/40 font-barlow text-sm">flat</span>
              </div>
              <div className="h-px bg-white/5 mb-5" />
              <ul className="flex flex-col gap-2.5 mb-7">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-white/70 font-barlow text-sm">
                    <Check className="w-4 h-4 shrink-0" style={{ color: p.color }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <RippleButton
                  className={`w-full py-3 rounded-xl font-barlow font-semibold text-sm transition-all ${p.popular ? "text-black hover:opacity-90" : "glass hover:bg-white/10 text-white"}`}
                  style={p.popular ? { background: p.color } : {}}
                >
                  {p.cta}
                </RippleButton>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-white/30 font-barlow text-sm mt-10"
        >
          All prices in USD. Payment plans available. Custom quotes for enterprise.
        </motion.p>
      </section>

      {/* FAQ */}
      <section className="relative px-4 pb-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-[clamp(24px,4vw,44px)] font-bold text-white mb-10 text-center">Common questions</h2>
          {[
            ["What's included in the flat fee?", "Design, development, testing, launch, DNS setup, and one month of support. Everything you need to go live."],
            ["Do I own the website?", "Yes — 100%. You own the code, the domain, and all content. We hand over everything."],
            ["How long does it take?", "Starter sites launch in 1 week. Growth sites in 10-14 days. Elite builds in 3-4 weeks."],
            ["Can I upgrade later?", "Absolutely. Clients often start on Starter and upgrade as they grow. We make it seamless."],
          ].map(([q, a], i) => (
            <motion.details
              key={q as string}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl mb-3 group"
            >
              <summary className="px-6 py-4 font-barlow font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                {q as string}
                <ArrowRight className="w-4 h-4 text-white/40 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 pb-4 text-white/60 font-barlow text-sm leading-relaxed">{a as string}</div>
            </motion.details>
          ))}
        </div>
      </section>
    </div>
  );
}
