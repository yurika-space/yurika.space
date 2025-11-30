'use client';

import { useRef } from 'react';
/**
 * Import the FiniteGallery component from its correct location.
 * The component provides a 3D scrollable gallery using Three.js/R3F.
 */
import FiniteComponentGallery from '@/components/molecules/FiniteGallery';

export default function SimpleExample() {
	const nextSectionRef = useRef<HTMLElement>(null);

	const handleScrollEnd = () => {
		nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	// Simple inline components
	const slides = [
		{
			component: (
				<div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-2xl p-12 flex items-center justify-center text-white">
					<div className="text-center">
						<h2 className="text-6xl font-bold mb-4">Slide 1</h2>
						<p className="text-2xl opacity-90">Welcome to my portfolio</p>
					</div>
				</div>
			),
			id: 1,
		},
		{
			component: (
				<div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl p-12 flex items-center justify-center text-white">
					<div className="text-center">
						<h2 className="text-6xl font-bold mb-4">Slide 2</h2>
						<p className="text-2xl opacity-90">Check out my projects</p>
					</div>
				</div>
			),
			id: 2,
		},
		{
			component: (
				<div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-2xl p-12 flex items-center justify-center text-white">
					<div className="text-center">
						<h2 className="text-6xl font-bold mb-4">Slide 3</h2>
						<p className="text-2xl opacity-90">Let&apos;s work together</p>
					</div>
				</div>
			),
			id: 3,
		},
		{
			component: (
				<div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-2xl p-12 flex items-center justify-center text-white">
					<div className="text-center">
						<h2 className="text-6xl font-bold mb-4">Slide 4</h2>
						<p className="text-2xl opacity-90">Get in touch</p>
					</div>
				</div>
			),
			id: 4,
		},
	];

	return (
		<main className="min-h-screen bg-black">
			{/* Gallery Section */}
			<section className="h-screen relative">
				<FiniteComponentGallery
					components={slides}
					speed={1.2}
					zSpacing={3}
					slideWidth={800}
					slideHeight={600}
					scale={0.002}
					onScrollEnd={handleScrollEnd}
					className="h-screen w-full"
				/>

				{/* Instructions */}
				<div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
					<p className="text-white font-mono text-xs uppercase">
						Use mouse wheel or arrow keys to navigate
					</p>
				</div>
			</section>

			{/* Next Section */}
			<section ref={nextSectionRef} className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center px-8">
					<h1 className="text-6xl font-bold mb-4">Next Section</h1>
					<p className="text-2xl text-gray-600">Content goes here</p>
				</div>
			</section>
		</main>
	);
}
