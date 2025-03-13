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
        
        if (ref.current) {
            console.log(ref.current);

            gsap.fromTo(ref.current,
                { width: "100vw", height: "100vh", position: "fixed", objectFit: "cover" },
                { width: "10%", height: "10%", position: "absolute", objectFit: "cover", delay: 1, duration: 0.5 }
            );
        }
    }, []);

    return (
        <img ref={ref} src={project?.image} alt={project?.title} style={{ width: '100vw', height: '100vh', objectFit: 'cover' }} />
    );
}

export default ProjectTransition;