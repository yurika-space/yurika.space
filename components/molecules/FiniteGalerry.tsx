"use client";

import { Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface ComponentItem {
  component: ReactNode;
  id?: string | number;
}

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
  /** Width of each component slide (default: 800px) */
  slideWidth?: number;
  /** Height of each component slide (default: 600px) */
  slideHeight?: number;
  /** Scale factor for the 3D view (default: 0.002) */
  scale?: number;
}

interface PlaneData {
  index: number;
  z: number;
  componentIndex: number;
  x: number;
  y: number;
}

const DEFAULT_Z_SPACING = 3;
const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;

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
        transition: "opacity 0.3s ease",
        pointerEvents: opacity > 0.1 ? "auto" : "none",
      }}
      scale={scale}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {component}
      </div>
    </Html>
  );
}

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
  slideWidth = 800,
  slideHeight = 600,
  scale = 0.002,
}: Omit<FiniteComponentGalleryProps, "className" | "style"> & {
  slideWidth: number;
  slideHeight: number;
  scale: number;
}) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isAtBoundary = useRef(false);

  // Normalize components to objects with IDs
  const normalizedComponents = useMemo(
    () =>
      components.map((item, index) => {
        if (React.isValidElement(item) || typeof item === "string") {
          return { component: item, id: index };
        }
        return item as ComponentItem;
      }),
    [components]
  );

  const spatialPositions = useMemo(() => {
    const positions: { x: number; y: number }[] = [];
    const maxHorizontalOffset = MAX_HORIZONTAL_OFFSET;
    const maxVerticalOffset = MAX_VERTICAL_OFFSET;

    for (let i = 0; i < normalizedComponents.length; i++) {
      const horizontalAngle = (i * 2.618) % (Math.PI * 2);
      const verticalAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);

      const horizontalRadius = (i % 3) * 1.2;
      const verticalRadius = ((i + 1) % 4) * 0.8;

      const x =
        (Math.sin(horizontalAngle) * horizontalRadius * maxHorizontalOffset) /
        3;
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

  // Initialize plane data
  const planesData = useRef<PlaneData[]>(
    Array.from({ length: totalComponents }, (_, i) => ({
      index: i,
      z: i * zSpacing,
      componentIndex: i,
      x: spatialPositions[i]?.x ?? 0,
      y: spatialPositions[i]?.y ?? 0,
    }))
  );

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      const delta = event.deltaY;
      const newScrollVelocity = scrollVelocity + delta * 0.001 * speed;
      const potentialNewPosition = scrollPosition + newScrollVelocity * 10;

      // Check if we're at boundaries
      const atStart = potentialNewPosition <= minScroll && delta < 0;
      const atEnd = potentialNewPosition >= maxScroll && delta > 0;

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

      event.preventDefault();
      isAtBoundary.current = false;
      setScrollVelocity(newScrollVelocity);
    },
    [
      scrollVelocity,
      scrollPosition,
      speed,
      minScroll,
      maxScroll,
      onScrollEnd,
      onScrollStart,
      enablePageScroll,
    ]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        setScrollVelocity((prev) => prev - 2 * speed);
      } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        setScrollVelocity((prev) => prev + 2 * speed);
      }
    },
    [speed]
  );

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    canvasRef.current = canvas as HTMLCanvasElement;

    if (canvas) {
      canvas.addEventListener("wheel", handleWheel, { passive: false });
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        canvas.removeEventListener("wheel", handleWheel);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [handleWheel, handleKeyDown]);

  useFrame((state, delta) => {
    // Damping
    setScrollVelocity((prev) => prev * 0.95);

    // Update scroll position
    let newScrollPosition = scrollPosition + scrollVelocity * delta * 10;

    // Clamp to boundaries
    newScrollPosition = Math.max(
      minScroll,
      Math.min(maxScroll, newScrollPosition)
    );
    setScrollPosition(newScrollPosition);

    // Update plane positions and opacity
    const halfDepth = totalDepth / 2;

    planesData.current.forEach((plane, i) => {
      plane.z = i * zSpacing - newScrollPosition;
      plane.x = spatialPositions[i]?.x ?? 0;
      plane.y = spatialPositions[i]?.y ?? 0;
    });
  });

  // Collect planes from the ref in a useMemo (FIX: Don't access ref during render)
  const renderedPlanes = useMemo(() => {
    return (planesData.current || []).map((plane) => {
      const componentData = normalizedComponents[plane.componentIndex];
      if (!componentData) return null;
      return { plane, componentData, halfDepth };
    });
  }, [normalizedComponents, totalDepth, planesData.current]);
			
  return (
    <>
      {renderedPlanes.map((entry, idx) => {
        if (!entry) return null;
        const { plane, componentData, halfDepth } = entry;
        const worldZ = plane.z - halfDepth;

        // Calculate normalized position (0 to 1 across the entire depth range)
        const normalizedPosition = (plane.z + halfDepth) / totalDepth;

        // Calculate opacity based on fade settings
        let opacity = 1;

        if (
          normalizedPosition >= fadeSettings.fadeIn.start &&
          normalizedPosition <= fadeSettings.fadeIn.end
        ) {
          const fadeInProgress =
            (normalizedPosition - fadeSettings.fadeIn.start) /
            (fadeSettings.fadeIn.end - fadeSettings.fadeIn.start);
          opacity = fadeInProgress;
        } else if (normalizedPosition < fadeSettings.fadeIn.start) {
          opacity = 0;
        } else if (
          normalizedPosition >= fadeSettings.fadeOut.start &&
          normalizedPosition <= fadeSettings.fadeOut.end
        ) {
          const fadeOutProgress =
            (normalizedPosition - fadeSettings.fadeOut.start) /
            (fadeSettings.fadeOut.end - fadeSettings.fadeOut.start);
          opacity = 1 - fadeOutProgress;
        } else if (normalizedPosition > fadeSettings.fadeOut.end) {
          opacity = 0;
        }

        opacity = Math.max(0, Math.min(1, opacity));

        return (
          <ComponentPlane
            key={componentData.id ?? plane.index}
            component={componentData.component}
            position={[plane.x, plane.y, worldZ]}
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

export default function FiniteComponentGallery({
  components,
  className = "h-screen w-full",
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
