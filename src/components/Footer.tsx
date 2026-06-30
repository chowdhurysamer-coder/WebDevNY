import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white">W</div>
              <span className="font-barlow font-bold text-white text-[15px]">WebDev NY</span>
            </div>
            <p className="text-white/40 font-barlow text-sm leading-relaxed">Custom web design and development for New York businesses that want to grow online.</p>
          </div>
          <div>
            <div className="text-white/30 font-barlow text-xs uppercase tracking-widest mb-4">Company</div>
            <div className="flex flex-col gap-2">
              {[["Home","/"],["Web Design","/web-design"],["Capabilities","/capabilities"],["Portfolio","/portfolio"]].map(([l,to]) => (
                <Link key={l as string} to={to as string} className="text-white/55 font-barlow text-sm hover:text-white transition-colors">{l as string}</Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-white/30 font-barlow text-xs uppercase tracking-widest mb-4">Services</div>
            <div className="flex flex-col gap-2">
              {[["Previews","/previews"],["Analytics","/analytics"],["Pricing","/pricing"],["Plans","/plans"]].map(([l,to]) => (
                <Link key={l as string} to={to as string} className="text-white/55 font-barlow text-sm hover:text-white transition-colors">{l as string}</Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-white/30 font-barlow text-xs uppercase tracking-widest mb-4">Contact</div>
            <div className="flex flex-col gap-2">
              <a href="mailto:hello@webdevny.com" className="text-white/55 font-barlow text-sm hover:text-white transition-colors">hello@webdevny.com</a>
              <a href="tel:+12125550190" className="text-white/55 font-barlow text-sm hover:text-white transition-colors">(212) 555-0190</a>
              <span className="text-white/55 font-barlow text-sm">New York, NY</span>
            </div>
            <Link to="/contact" className="mt-5 inline-flex items-center gap-1.5 text-sky-400 font-barlow text-sm hover:text-sky-300 transition-colors">
              Start a project <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-white/25 font-barlow text-xs">© {year} WebDev NY. All rights reserved.</span>
          <span className="text-white/25 font-barlow text-xs">Built with ♥ in New York</span>
        </div>
      </div>
    </footer>
  );
}
