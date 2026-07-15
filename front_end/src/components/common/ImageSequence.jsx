import React, { useState, useEffect, useRef, useCallback } from 'react';

const ImageSequence = ({ 
  folder, 
  prefix, 
  suffix = '.jpg', 
  startFrame, 
  endFrame, 
  fps = 24, 
  step = 1,
  className = "", 
  onFrameChange 
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const onFrameChangeRef = useRef(onFrameChange);
  const frameImagesRef = useRef([]); // Stores preloaded Image objects
  const animFrameRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const currentIndexRef = useRef(0);

  const totalFrames = endFrame - startFrame + 1;
  // Compute the actual frame indices we'll use (with step)
  const steppedIndices = useRef([]);

  // Build stepped indices once
  useEffect(() => {
    const indices = [];
    for (let i = 0; i < totalFrames; i += step) {
      indices.push(i);
    }
    steppedIndices.current = indices;
  }, [totalFrames, step]);

  // Build the src URL for a given frame index
  const getSrc = useCallback((frameIndex) => {
    const frameNumber = (startFrame + frameIndex).toString().padStart(8, '0');
    return `/${folder}/${prefix}${frameNumber}${suffix}`;
  }, [startFrame, folder, prefix, suffix]);

  // Keep callback ref updated
  useEffect(() => {
    onFrameChangeRef.current = onFrameChange;
  }, [onFrameChange]);

  // Intersection Observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '400px' } // Start prefetching well before visible
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  // ── Preload images when in view ──
  // Load all stepped frames as Image objects. As soon as the first batch 
  // is ready, start animation. Continue loading remaining frames in background.
  useEffect(() => {
    if (!isInView) return;

    const indices = [];
    for (let i = 0; i < totalFrames; i += step) {
      indices.push(i);
    }
    const totalToLoad = indices.length;
    
    // Initialize the array with nulls
    const images = new Array(totalToLoad).fill(null);
    frameImagesRef.current = images;
    let loadedCount = 0;
    const MIN_FRAMES_TO_START = Math.min(10, totalToLoad); // Start playing after 10 frames loaded
    let cancelled = false;

    // Load in priority order: first MIN_FRAMES_TO_START frames first, then rest
    const loadImage = (arrayIndex) => {
      if (cancelled) return;
      const frameIndex = indices[arrayIndex];
      const src = getSrc(frameIndex);
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        images[arrayIndex] = img;
        loadedCount++;
        if (loadedCount >= MIN_FRAMES_TO_START && !isReady) {
          setIsReady(true);
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        loadedCount++;
        if (loadedCount >= MIN_FRAMES_TO_START && !isReady) {
          setIsReady(true);
        }
      };
      img.src = src;
    };

    // Load first batch immediately (priority frames)
    const priorityCount = Math.min(MIN_FRAMES_TO_START, totalToLoad);
    for (let i = 0; i < priorityCount; i++) {
      loadImage(i);
    }

    // Load remaining frames in small batches to avoid overwhelming the network
    let batchCursor = priorityCount;
    const BATCH_SIZE = 4;
    const BATCH_INTERVAL = 100; // ms between batches

    const batchTimer = setInterval(() => {
      if (cancelled || batchCursor >= totalToLoad) {
        clearInterval(batchTimer);
        return;
      }
      const end = Math.min(batchCursor + BATCH_SIZE, totalToLoad);
      for (let i = batchCursor; i < end; i++) {
        loadImage(i);
      }
      batchCursor = end;
    }, BATCH_INTERVAL);

    return () => {
      cancelled = true;
      clearInterval(batchTimer);
    };
  }, [isInView, totalFrames, step, getSrc]);

  // ── Canvas Animation Loop ──
  // Uses requestAnimationFrame for smooth rendering. Draws the current 
  // frame to canvas, advancing the playhead at the target fps.
  useEffect(() => {
    if (!isInView || !isReady || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const interval = 1000 / fps;
    const images = frameImagesRef.current;
    const indices = steppedIndices.current;
    const totalSteppedFrames = indices.length;

    // Size the canvas to fill the container
    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawFrame = (index) => {
      const img = images[index];
      if (!img || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw with object-fit: cover behavior
      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;
      let drawW, drawH, drawX, drawY;

      if (canvasRatio > imgRatio) {
        // Canvas is wider than image — fit to width
        drawW = canvas.width;
        drawH = canvas.width / imgRatio;
        drawX = 0;
        drawY = (canvas.height - drawH) / 2;
      } else {
        // Canvas is taller than image — fit to height
        drawH = canvas.height;
        drawW = canvas.height * imgRatio;
        drawX = (canvas.width - drawW) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    // Draw the very first available frame immediately
    drawFrame(currentIndexRef.current);

    const animate = (timestamp) => {
      animFrameRef.current = requestAnimationFrame(animate);

      const elapsed = timestamp - lastFrameTimeRef.current;
      if (elapsed < interval) return;

      lastFrameTimeRef.current = timestamp - (elapsed % interval);

      // Advance playhead
      let nextIndex = (currentIndexRef.current + 1) % totalSteppedFrames;
      
      // If next frame isn't loaded yet, find nearest loaded frame ahead
      if (!images[nextIndex]) {
        let found = false;
        for (let scan = 1; scan <= 5; scan++) {
          const candidate = (currentIndexRef.current + 1 + scan) % totalSteppedFrames;
          if (images[candidate]) {
            nextIndex = candidate;
            found = true;
            break;
          }
        }
        // If nothing found ahead, stay on current frame
        if (!found) return;
      }

      currentIndexRef.current = nextIndex;
      drawFrame(nextIndex);

      // Notify parent
      if (onFrameChangeRef.current) {
        const realFrameIndex = indices[nextIndex] ?? 0;
        onFrameChangeRef.current(realFrameIndex, totalFrames);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isInView, isReady, fps, totalFrames]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Loading Spinner — shown until minimum frames are loaded */}
      {!isReady && isInView && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#111315] z-10">
          <div className="w-10 h-10 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Canvas for rendering frames */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: isReady ? 'block' : 'none' }}
      />
    </div>
  );
};

export default ImageSequence;
