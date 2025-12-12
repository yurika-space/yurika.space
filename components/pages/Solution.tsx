import React from "react";
import { Section } from "../atoms/Section";
import Icons from "../atoms/Icons";
import ComponentHeader from "../atoms/ComponentHeader";
import "../stylesheets/game-over.css";


export default function TheSolution() {


const steps = [
	{ icon: Icons.Globe, title: 'Get a Domain', desc: 'Register coolstartup.com for as little as $0.99', step: '01' },
	{ icon: Icons.Zap, title: 'Tokenize It', desc: 'Mint tokens representing fractional ownership + revenue rights', step: '02' },
	{ icon: Icons.Users, title: 'Rally Community', desc: 'Raise $5K-$50K from people who believe in you', step: '03' },
	{ icon: Icons.TrendingUp, title: 'Build & Share', desc: 'Revenue flows automatically via smart contracts', step: '04' },
]

return (
<Section sectionId="solution" background="dark" className="min-h-screen w-screen flex items-center justify-center align-center overflow-hidden relative">
		<div className="absolute inset-0 w-screen min-h-screen bg-yurika-bg-secondary">
        {/* Background effects layer */}
        <div className="absolute inset-0">
          {/* Scanline effect */}
          <div className="scanlines absolute inset-0" />

          {/* Glitch background */}
          <div className="glitch-bg absolute inset-0 opacity-10" />

          {/* Vignette effect */}
          <div className="vignette absolute inset-0" />
        </div>
	</div>

<div className="max-w-6xl mx-auto">
	<div className="text-center mb-16">
		<ComponentHeader title="THE SOLUTION" item="🔥" className="animate-fade-in-up w-3/4 mx-auto" style={{ animationDelay: "0.2s" }} />
		<h2 className="text-3xl md:text-5xl font-bold mb-6">Domain-Backed <span className="text-theme-primary">Crowdfunding</span></h2>
		<p className="text-theme-muted max-w-2xl mx-auto text-lg">Your domain is your equity. Tokenize it. Let your community own a piece.</p>
	</div>

	<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
		{steps.map((item, i) => (
			<div key={i} className="bg-black border-2 border-theme-border hover:border-theme-primary transition-colors p-6 relative group">
				<div className="absolute top-4 right-4 text-4xl font-bold text-theme-muted group-hover:text-theme-primary/20 transition-colors">{item.step}</div>
				<item.icon/>
				<h3 className="font-bold text-lg mb-2 mt-4 text-theme-primary">{item.title}</h3>
				<p className="text-theme-muted text-sm">{item.desc}</p>
			</div>
		))}
	</div>
</div>
</Section>
)
}
