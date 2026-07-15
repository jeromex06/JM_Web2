import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const GlassIcon = ({ icon, id, index }) => {
    const containerRef = useRef(null);
    const glassRef = useRef(null);
    const reflectionRef = useRef(null);
    const blobRef = useRef(null);
    const svgRef = useRef(null);

    // QuickTo for smooth mouse tracking
    const xTo = useRef();
    const yTo = useRef();
    const rxTo = useRef();
    const ryTo = useRef();
    const reflXTo = useRef();
    const reflYTo = useRef();

    useGSAP(() => {
        // Setup QuickTo instances for smooth follow
        xTo.current = gsap.quickTo(glassRef.current, "x", { duration: 0.5, ease: "power3" });
        yTo.current = gsap.quickTo(glassRef.current, "y", { duration: 0.5, ease: "power3" });
        rxTo.current = gsap.quickTo(glassRef.current, "rotationX", { duration: 0.5, ease: "power3" });
        ryTo.current = gsap.quickTo(glassRef.current, "rotationY", { duration: 0.5, ease: "power3" });

        reflXTo.current = gsap.quickTo(reflectionRef.current, "x", { duration: 0.5, ease: "power3" });
        reflYTo.current = gsap.quickTo(reflectionRef.current, "y", { duration: 0.5, ease: "power3" });

        // Set initial 3D perspective
        gsap.set(containerRef.current, { perspective: 1000 });
        gsap.set(glassRef.current, { transformStyle: "preserve-3d" });

        // Idle floating animation
        const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
        floatTl.to(glassRef.current, {
            y: "-=8",
            rotationX: "+=2",
            rotationY: "-=2",
            duration: 3 + (index * 0.2), // Offset slightly based on index
            ease: "sine.inOut"
        });

        // Idle blob breathing animation
        gsap.to(blobRef.current, {
            scale: 1.2,
            opacity: 0.3,
            duration: 4 + (index * 0.3),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Prepare SVG for draw animation
        if (svgRef.current) {
            const paths = svgRef.current.querySelectorAll('path, circle, rect, polyline');
            paths.forEach(path => {
                const length = path.getTotalLength ? path.getTotalLength() : 100; // fallback
                gsap.set(path, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                    opacity: 0 // initially hidden
                });
            });
        }

    }, { scope: containerRef });

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        // Calculate normalized values (-1 to 1)
        const normX = (x / width) * 2 - 1;
        const normY = (y / height) * 2 - 1;

        // Move slightly towards mouse
        xTo.current(normX * 10);
        yTo.current(normY * 10);

        // Tilt based on mouse position
        rxTo.current(normY * -15);
        ryTo.current(normX * 15);

        // Move reflection opposite to mouse
        reflXTo.current(normX * -30);
        reflYTo.current(normY * -30);
    };

    const handleMouseLeave = () => {
        // Reset positions smoothly
        xTo.current(0);
        yTo.current(0);
        rxTo.current(0);
        ryTo.current(0);
        reflXTo.current(0);
        reflYTo.current(0);
    };

    // Modify the SVG node to ensure it has the ref and classes
    const enhancedIcon = React.isValidElement(icon)
        ? React.cloneElement(icon, {
            ref: svgRef,
            className: "icon-svg relative z-20 stroke-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] will-change-transform w-12 h-12",
            strokeWidth: "1.5"
        })
        : null;

    return (
        <div
            ref={containerRef}
            className="glass-icon-container relative w-[120px] h-[120px] md:w-[140px] md:h-[140px] flex items-center justify-center cursor-pointer group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background breathing blob */}
            <div
                ref={blobRef}
                className="absolute w-full h-full rounded-full bg-[#ff6b00] opacity-10 blur-[40px] z-0 pointer-events-none"
            />

            {/* Main Glass Circle */}
            <div
                ref={glassRef}
                className="glass-circle absolute w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center z-10 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_8px_rgba(255,107,0,0.2)] overflow-hidden"
            >
                {/* Glossy Reflection Layer */}
                <div
                    ref={reflectionRef}
                    className="reflection-layer absolute inset-0 z-10 w-[200%] h-[200%] top-[-50%] left-[-50%] pointer-events-none opacity-0"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)',
                        transform: 'translate(-30%, -30%)'
                    }}
                />

                {/* The Icon */}
                {enhancedIcon}
            </div>
        </div>
    );
};

export default GlassIcon;