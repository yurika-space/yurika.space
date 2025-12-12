import { SpaceInvader } from "../atoms/SpaceInvader"

const Footer: React.FC = () => {
  return (
    <footer className="bg-terminal-black py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="font-mono text-gray-500 text-sm mb-6">
          © 2025 Yurika.space • Built for founders, by founders
        </p>
        <div className="flex justify-center gap-3">
          {[...Array(5)].map((_, i) => (
            <SpaceInvader key={i} size="sm" color="var(--primary)" className="opacity-30" animated/>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
