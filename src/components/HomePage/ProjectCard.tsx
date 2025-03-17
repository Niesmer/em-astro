import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { navigate } from 'astro:transitions/client';

type ProjectCardProps = {
    width?: 4 | 6 | 8 | 12;
    height?: 4 | 6 | 8 | 12 | 36;
    title: string;
    description: string;
    link: string;
    image: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

function ProjectCard({ width, height, title, link, description, image }: ProjectCardProps) {
    const style = {
        gridColumn: `span ${width}`,
        gridRow: `span ${height}`,
    };

    const elementRef = useRef<HTMLAnchorElement>(null);

    const handleTransition = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        console.log("handleTransition triggered");

        const element = elementRef.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();

        // Account for scroll position
        const absoluteX = rect.left;
        const absoluteY = rect.top;

        // Clone the element
        const clone = element.cloneNode(true) as HTMLElement;
        document.body.appendChild(clone);

        // Set initial styles for the clone
        clone.style.position = "fixed"; // Use fixed to keep it in the viewport
        clone.style.width = `${rect.width}px`;
        clone.style.height = `${rect.height}px`;
        clone.style.left = `${absoluteX}px`;
        clone.style.top = `${absoluteY}px`;
        clone.style.zIndex = "1000";
        clone.style.pointerEvents = "none"; // Avoid interactions

        // Animate the transition
        gsap.to(clone, {
            duration: 1,
            width: "100vw",
            height: "100vh",
            left: 0,
            top: 0,
            borderRadius: 0,
            padding: 0,
            border: "none",
            ease: "power2.inOut",
            onComplete: () => {
                navigate(element.href);
                clone.addEventListener("astro:page-load", () => {
                    clone.parentNode?.removeChild(clone);
                });
            },
        });

        gsap.to(clone.querySelectorAll('*'), {
            duration: 1,
            borderRadius: 0,
            ease: "power2.inOut",
        });

        return () => {
            if (clone.parentNode) {
                clone.parentNode.removeChild(clone);
            }
        };
    };


    return (
        <a
            href={`project/${link}`}
            style={style}
            className="project-card relative w-full h-full border rounded-lg shadow-md overflow-hidden"
            onClick={handleTransition}
            ref={elementRef}
        >
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-40 flex flex-col justify-center items-center text-center p-4">
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-300">{description}</p>
            </div>
        </a>
    );
}

export default ProjectCard;