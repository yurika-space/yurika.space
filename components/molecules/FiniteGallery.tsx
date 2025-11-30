'use client';

import { useRef, useMemo, useCallback, useState, useEffect, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

/**
 * Represents a single component item in the gallery.
 * Contains the React component to render and an optional unique identifier.
 */
interface ComponentItem {
	component: ReactNode;
	id?: string | number;
}

/**
 * Configuration for fade in/out effects as slides enter and exit view.
 * Values are normalized positions (0-1) where 0 is fully out and 1 is center.
 */
interface FadeSettings {
	fadeIn: {
		start: number;
		end: number;
	};
	fadeOut: {
		start: number;
		end: number;
	};
}

/**
 * Props for the FiniteComponentGallery component.
 * Supports both arrays of ComponentItem objects or raw ReactNode arrays.
 */
interface FiniteComponentGalleryProps {
	components: ComponentItem[] | ReactNode[];
	speed?: number;
	zSpacing?: number;
	fadeSettings?: FadeSettings;
	className?: string;
	style?: React.CSSProperties;
	onScrollEnd?: () => void;
	onScrollStart?: () => void;
	enablePageScroll?: boolean;
	slideWidth?: number;
	slideHeight?: number;
	scale?: number;
}

const DEFAULT_Z_SPACING = 3;
const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;

/**
 * Individual slide plane component rendered in 3D space using drei's Html.
 * Handles positioning, opacity, and pointer events based on visibility.
 */
function ComponentPlane({
	component,
	position,
	opacity,
	slideWidth,
	slideHeight,
	scale,
}: {
	component: ReactNode;
	position: [number, number, number];
	opacity: number;
	slideWidth: number;
	slideHeight: number;
	scale: number;
}) {
	return (
		<Html
			position={position}
			center
			transform
			occlude
			style={{
				width: `${slideWidth}px`,
				height: `${slideHeight}px`,
				opacity: opacity,
				transition: 'opacity 0.3s ease',
				// Disable pointer events for nearly invisible slides to prevent interaction issues
				pointerEvents: opacity > 0.1 ? 'auto' : 'none',
			}}
			scale={scale}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{component}
			</div>
		</Html>
	);
}

interface GallerySceneProps extends Omit<FiniteComponentGalleryProps, 'className' | 'style'> {
	slideWidth: number;
	slideHeight: number;
	scale: number;
}

/**
 * Inner scene component that runs inside the R3F Canvas.
 * Handles scroll physics, keyboard navigation, and renders slides in 3D space.
 */
function GalleryScene({
	components,
	speed = 1,
	zSpacing = DEFAULT_Z_SPACING,
	fadeSettings = {
		fadeIn: { start: 0.05, end: 0.15 },
		fadeOut: { start: 0.85, end: 0.95 },
	},
	onScrollEnd,
	onScrollStart,
	enablePageScroll = true,
	slideWidth,
	slideHeight,
	scale,
}: GallerySceneProps) {
	const [scrollPosition, setScrollPosition] = useState(0);
	const [scrollVelocity, setScrollVelocity] = useState(0);
	// Track boundary state in ref since it doesn't need to trigger re-renders
	const isAtBoundary = useRef(false);

	/**
	 * Normalize components array to ensure consistent ComponentItem structure.
	 * Handles both ComponentItem[] and ReactNode[] input types.
	 */
	const normalizedComponents = useMemo((): ComponentItem[] =>
		components.map((item, index): ComponentItem => {
			// Check if it's already a ComponentItem object (has 'component' property but isn't a React element)
			if (
				item &&
				typeof item === 'object' &&
				'component' in item &&
				!('$$typeof' in item)
			) {
				// Safe to cast since we verified the structure
				const componentItem = item as { component: ReactNode; id?: string | number };
				return { component: componentItem.component, id: componentItem.id ?? index };
			}
			// Otherwise treat it as a ReactNode and wrap it
			return { component: item as ReactNode, id: index };
		}),
		[components]
	);

	/**
	 * Pre-calculate spatial positions for each slide using golden ratio-based distribution.
	 * Creates an aesthetically pleasing arrangement in 3D space.
	 */
	const spatialPositions = useMemo(() => {
		const positions: { x: number; y: number }[] = [];
		const maxHorizontalOffset = MAX_HORIZONTAL_OFFSET;
		const maxVerticalOffset = MAX_VERTICAL_OFFSET;

		for (let i = 0; i < normalizedComponents.length; i++) {
			// Use golden ratio (2.618, 1.618) for natural-looking distribution
			const horizontalAngle = (i * 2.618) % (Math.PI * 2);
			const verticalAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);

			const horizontalRadius = (i % 3) * 1.2;
			const verticalRadius = ((i + 1) % 4) * 0.8;

			const x =
				(Math.sin(horizontalAngle) * horizontalRadius * maxHorizontalOffset) / 3;
			const y =
				(Math.cos(verticalAngle) * verticalRadius * maxVerticalOffset) / 4;

			positions.push({ x, y });
		}

		return positions;
	}, [normalizedComponents.length]);

	const totalComponents = normalizedComponents.length;
	const totalDepth = (totalComponents - 1) * zSpacing;
	const minScroll = 0;
	const maxScroll = totalDepth;

	/**
	 * Handle mouse wheel events for scrolling through the gallery.
	 * Implements boundary detection to allow page scroll when at edges.
	 */
	const handleWheel = useCallback(
		(event: WheelEvent) => {
			const delta = event.deltaY;
			const newScrollVelocity = scrollVelocity + delta * 0.001 * speed;
			const potentialNewPosition = scrollPosition + newScrollVelocity * 10;

			// Check if we're at the start or end boundaries
			const atStart = potentialNewPosition <= minScroll && delta < 0;
			const atEnd = potentialNewPosition >= maxScroll && delta > 0;

			// Allow native page scroll when at boundaries if enabled
			if ((atStart || atEnd) && enablePageScroll) {
				isAtBoundary.current = true;

				if (atEnd && onScrollEnd) {
					onScrollEnd();
				}
				if (atStart && onScrollStart) {
					onScrollStart();
				}

				return;
			}

			// Prevent page scroll and handle gallery scroll internally
			event.preventDefault();
			isAtBoundary.current = false;
			setScrollVelocity(newScrollVelocity);
		},
		[scrollVelocity, scrollPosition, speed, minScroll, maxScroll, onScrollEnd, onScrollStart, enablePageScroll]
	);

	/**
	 * Handle arrow key navigation for accessibility.
	 * Up/Left moves backward, Down/Right moves forward.
	 */
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
				event.preventDefault();
				setScrollVelocity((prev) => prev - 2 * speed);
			} else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
				event.preventDefault();
				setScrollVelocity((prev) => prev + 2 * speed);
			}
		},
		[speed]
	);

	// Attach event listeners to canvas and document
	useEffect(() => {
		const canvas = document.querySelector('canvas');

		if (canvas) {
			canvas.addEventListener('wheel', handleWheel, { passive: false });
			document.addEventListener('keydown', handleKeyDown);

			return () => {
				canvas.removeEventListener('wheel', handleWheel);
				document.removeEventListener('keydown', handleKeyDown);
			};
		}
	}, [handleWheel, handleKeyDown]);

	// Animation frame loop for smooth scroll physics
	useFrame((_state, delta) => {
		// Apply damping: reduce velocity by 5% each frame for smooth deceleration
		setScrollVelocity((prev) => prev * 0.95);

		// Update scroll position based on current velocity
		let newScrollPosition = scrollPosition + scrollVelocity * delta * 10;

		// Clamp to boundaries to prevent over-scrolling
		newScrollPosition = Math.max(minScroll, Math.min(maxScroll, newScrollPosition));
		setScrollPosition(newScrollPosition);
	});

	if (normalizedComponents.length === 0) return null;

	// Calculate half depth for centering slides in view
	const halfDepth = totalDepth / 2;

	return (
		<>
			{/* 
				Render each slide by computing positions from scrollPosition state.
				This approach avoids accessing refs during render (React best practice).
			*/}
			{normalizedComponents.map((componentData, index) => {
				// Compute plane position based on current scroll state
				const planeZ = index * zSpacing - scrollPosition;
				const planeX = spatialPositions[index]?.x ?? 0;
				const planeY = spatialPositions[index]?.y ?? 0;
				const worldZ = planeZ - halfDepth;

				// Calculate normalized position (0 to 1 across the entire depth range)
				const normalizedPosition = (planeZ + halfDepth) / totalDepth;

				// Calculate opacity based on fade settings for smooth transitions
				let opacity = 1;

				if (
					normalizedPosition >= fadeSettings.fadeIn.start &&
					normalizedPosition <= fadeSettings.fadeIn.end
				) {
					// Fade in: gradually increase opacity
					const fadeInProgress =
						(normalizedPosition - fadeSettings.fadeIn.start) /
						(fadeSettings.fadeIn.end - fadeSettings.fadeIn.start);
					opacity = fadeInProgress;
				} else if (normalizedPosition < fadeSettings.fadeIn.start) {
					// Before fade in zone: fully transparent
					opacity = 0;
				} else if (
					normalizedPosition >= fadeSettings.fadeOut.start &&
					normalizedPosition <= fadeSettings.fadeOut.end
				) {
					// Fade out: gradually decrease opacity
					const fadeOutProgress =
						(normalizedPosition - fadeSettings.fadeOut.start) /
						(fadeSettings.fadeOut.end - fadeSettings.fadeOut.start);
					opacity = 1 - fadeOutProgress;
				} else if (normalizedPosition > fadeSettings.fadeOut.end) {
					// After fade out zone: fully transparent
					opacity = 0;
				}

				// Ensure opacity is clamped between 0 and 1
				opacity = Math.max(0, Math.min(1, opacity));

				return (
					<ComponentPlane
						key={componentData.id ?? index}
						component={componentData.component}
						position={[planeX, planeY, worldZ]}
						opacity={opacity}
						slideWidth={slideWidth}
						slideHeight={slideHeight}
						scale={scale}
					/>
				);
			})}
		</>
	);
}

/**
 * FiniteComponentGallery - A 3D scrollable gallery component using React Three Fiber.
 * 
 * Features:
 * - Smooth scroll physics with momentum and damping
 * - Keyboard navigation (arrow keys)
 * - Configurable fade transitions
 * - Golden ratio-based spatial positioning for aesthetic slide arrangement
 * - Boundary callbacks for integration with page scroll
 * 
 * @example
 * ```tsx
 * <FiniteComponentGallery
 *   components={[{ component: <Slide1 />, id: 'slide-1' }, ...]}
 *   speed={1.2}
 *   onScrollEnd={() => scrollToNextSection()}
 * />
 * ```
 */
export default function FiniteComponentGallery({
	components,
	className = 'h-screen w-full',
	style,
	speed = 1,
	zSpacing = DEFAULT_Z_SPACING,
	fadeSettings = {
		fadeIn: { start: 0.05, end: 0.25 },
		fadeOut: { start: 0.75, end: 0.95 },
	},
	onScrollEnd,
	onScrollStart,
	enablePageScroll = true,
	slideWidth = 800,
	slideHeight = 600,
	scale = 0.002,
}: FiniteComponentGalleryProps) {
	return (
		<div className={className} style={style}>
			{/* R3F Canvas with camera positioned at origin looking into -z direction */}
			<Canvas
				camera={{ position: [0, 0, 0], fov: 55 }}
				gl={{ antialias: true, alpha: true }}
			>
				<GalleryScene
					components={components}
					speed={speed}
					zSpacing={zSpacing}
					fadeSettings={fadeSettings}
					onScrollEnd={onScrollEnd}
					onScrollStart={onScrollStart}
					enablePageScroll={enablePageScroll}
					slideWidth={slideWidth}
					slideHeight={slideHeight}
					scale={scale}
				/>
			</Canvas>
		</div>
	);
}
