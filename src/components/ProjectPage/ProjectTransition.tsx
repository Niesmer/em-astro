/* eslint-disable @next/next/no-img-element */
"use client"
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import type { ProjectInterface } from '../../data/projects';

type ProjectTransitionProps = {
    project?: ProjectInterface
}

function ProjectTransition({ project }: ProjectTransitionProps) {
    const ref = useRef<HTMLImageElement>(null);

    useEffect(() => {
        console.log("useEffect ProjectTransition");

        // Get the custom referrer from session storage
        const customReferrer = sessionStorage.getItem("customReferrer");
        console.log(customReferrer);

        // Check if the custom referrer is index.html
        if (customReferrer && !customReferrer.endsWith('/')) {
            console.log("Custom referrer is not index.html, skipping animation");
            return;
        }

        if (ref.current) {
            console.log(ref.current);

            // Get the final position of the image
            const finalRect = ref.current.getBoundingClientRect();

            // Set the initial style to fullscreen and make it visible
            gsap.set(ref.current, {
                width: "100vw",
                height: "100vh",
                position: "fixed",
                objectFit: "cover",
                left: 0,
                top: 0,
                visibility: 'visible' // Make the image visible
            });

            // Animate to the final position
            gsap.to(ref.current, {
                width: finalRect.width,
                height: finalRect.height,
                left: finalRect.left,
                top: finalRect.top,
                position: "absolute",
                objectFit: "cover",
                delay: 1,
                duration: 0.5,
                onComplete: () => {
                    // Ensure the image behaves like a classic DOM element
                    gsap.set(ref.current, {
                        position: "relative",
                        width: "",
                        height: "",
                        left: "",
                        top: "",
                        objectFit: ""
                    });
                }
            });
        }
    }, []);

    return (
        <img ref={ref} src={project?.image} alt={project?.title} />
    );
}

export default ProjectTransition;