import React from 'react';
import ProjectCard from './ProjectCard';
import type { ProjectInterface } from '../../data/projects';

type ProjectsProps = {
    projects: ProjectInterface[];
}

function ProjectBento({ projects }: ProjectsProps) {
    return (
        <div className='relative grid h-[90vh] grid-cols-12 grid-rows-12 gap-4'>
            {projects.map((project, i) => (
                <ProjectCard
                    key={i}
                    width={project.width} // Adjust width as needed
                    height={project.height} // Adjust height as needed
                    title={project.title}
                    description={project.description}
                    link={project.link || '#'}
                    image={project.image}
                />
            ))}
        </div>
    );
}

export default ProjectBento;