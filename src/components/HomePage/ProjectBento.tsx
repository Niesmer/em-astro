import React from 'react';
import ProjectCard from './ProjectCard';
import type { ProjectInterface } from '../../data/projects';

type ProjectsProps = {
    projects: ProjectInterface[];
    className?: string;
}

function ProjectBento({ projects, className }: ProjectsProps) {
    const [mobile, setMobile] = React.useState(window.innerWidth < 1024);

    React.useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return (
        <div className={`relative grid ${mobile ? 'grid-flow-row ' : 'grid-cols-12 grid-rows-12'} pb-18 gap-4 ${className}`}>
            {projects.map((project, i) => (
            <ProjectCard
                key={i}
                className={mobile? 'h-72': 'h-full'}
                width={mobile ? undefined : project.width} // Adjust width as needed
                height={mobile ? undefined : project.height} // Adjust height as needed
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