'use client';

import { useRef } from 'react';
import FiniteComponentGallery from '@/components/molecules/FiniteGallery';

// Example slide components
function HeroSlide() {
	return (
		<div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center text-white p-12">
			<div className="text-center">
				<h1 className="text-6xl font-bold mb-4">Welcome</h1>
				<p className="text-2xl opacity-90">Scroll to explore my work</p>
			</div>
		</div>
	);
}

interface ProjectSlideProps {
	title: string;
	description: string;
	tech: string[];
}

function ProjectSlide({ title, description, tech }: ProjectSlideProps) {
	return (
		<div className="w-full h-full bg-white rounded-2xl shadow-2xl p-12 flex flex-col justify-between">
			<div>
				<h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
				<p className="text-xl text-gray-600 mb-6">{description}</p>
			</div>
			<div>
				<h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Technologies</h3>
				<div className="flex flex-wrap gap-2">
					{tech.map((t) => (
						<span key={t} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
							{t}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}

interface QuoteSlideProps {
	quote: string;
	author: string;
}

function QuoteSlide({ quote, author }: QuoteSlideProps) {
	return (
		<div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl shadow-2xl flex items-center justify-center text-white p-12">
			<div className="text-center max-w-2xl">
				<p className="text-3xl font-serif italic mb-6">&ldquo;{quote}&rdquo;</p>
				<p className="text-lg opacity-75">— {author}</p>
			</div>
		</div>
	);
}

function SkillsSlide() {
	const skills = [
		{ name: 'React', level: 95 },
		{ name: 'TypeScript', level: 90 },
		{ name: 'Next.js', level: 88 },
		{ name: 'Three.js', level: 75 },
		{ name: 'Tailwind CSS', level: 92 },
	];

	return (
		<div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-white">
			<h2 className="text-4xl font-bold mb-8">Skills</h2>
			<div className="space-y-6">
				{skills.map((skill) => (
					<div key={skill.name}>
						<div className="flex justify-between mb-2">
							<span className="text-lg font-medium">{skill.name}</span>
							<span className="text-lg font-medium">{skill.level}%</span>
						</div>
						<div className="w-full bg-white/20 rounded-full h-3">
							<div
								className="bg-white rounded-full h-3 transition-all duration-1000"
								style={{ width: `${skill.level}%` }}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default function ComponentGalleryExample() {
	const nextSectionRef = useRef<HTMLElement>(null);

	const handleScrollEnd = () => {
		console.log('Finished viewing all slides');
		nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	// Define your slides
	const slides = [
		{ component: <HeroSlide />, id: 'hero' },
		{
			component: (
				<ProjectSlide
					title="E-Commerce Platform"
					description="A full-stack e-commerce solution with real-time inventory management and AI-powered recommendations."
					tech={['Next.js', 'PostgreSQL', 'Stripe', 'TensorFlow']}
				/>
			),
			id: 'project1',
		},
		{
			component: (
				<QuoteSlide
					quote="Design is not just what it looks like and feels like. Design is how it works."
					author="Steve Jobs"
				/>
			),
			id: 'quote1',
		},
		{
			component: (
				<ProjectSlide
					title="Social Media Dashboard"
					description="Analytics dashboard for tracking social media metrics across multiple platforms with real-time updates."
					tech={['React', 'D3.js', 'WebSocket', 'Node.js']}
				/>
			),
			id: 'project2',
		},
		{ component: <SkillsSlide />, id: 'skills' },
		{
			component: (
				<ProjectSlide
					title="Blockchain Wallet"
					description="Secure cryptocurrency wallet with multi-chain support and DeFi integration."
					tech={['Solidity', 'Web3.js', 'React', 'Hardhat']}
				/>
			),
			id: 'project3',
		},
		{
			component: (
				<QuoteSlide
					quote="I create; therefore I am."
					author="Your Philosophy"
				/>
			),
			id: 'quote2',
		},
	];

	return (
		<main className="min-h-screen bg-black">
			{/* Component Gallery Section */}
			<section className="h-screen relative">
				<FiniteComponentGallery
					components={slides}
					speed={1.2}
					zSpacing={3}
					slideWidth={900}
					slideHeight={600}
					scale={0.0018}
					onScrollEnd={handleScrollEnd}
					className="h-screen w-full"
					fadeSettings={{
						fadeIn: { start: 0.05, end: 0.25 },
						fadeOut: { start: 0.75, end: 0.95 },
					}}
				/>

				{/* Overlay instructions */}
				<div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
					<div className="inline-flex flex-col items-center gap-2 text-white">
						<p className="font-mono uppercase text-[11px] font-semibold">
							Use mouse wheel or arrow keys to navigate
						</p>
						<p className="font-mono text-[10px] opacity-60">
							Scroll past the end to continue
						</p>
					</div>
				</div>
			</section>

			{/* Next Section */}
			<section ref={nextSectionRef} className="min-h-screen bg-white text-black flex items-center justify-center">
				<div className="max-w-4xl px-8 py-20 text-center">
					<h2 className="text-5xl md:text-7xl font-bold mb-8">
						Get In Touch
					</h2>
					<p className="text-xl md:text-2xl leading-relaxed text-gray-600 mb-8">
						Ready to work together? Let&apos;s create something amazing.
					</p>
					<button className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors">
						Contact Me
					</button>
				</div>
			</section>
		</main>
	);
}
