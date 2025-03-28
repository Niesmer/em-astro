import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import type { ProjectInterface } from "../../data/projects";

type ProjectTransitionProps = {
  project?: ProjectInterface;
};

function ProjectTransition({ project }: ProjectTransitionProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [valid, setValid] = useState(true);
  useEffect(() => {
    console.log("useEffect ProjectTransition");

    const customReferrer = sessionStorage.getItem("customReferrer");
    console.log(customReferrer);

    if (customReferrer && !customReferrer.endsWith("/")) {
      setValid(false);
      return;
    }

    if (ref.current) {
      const finalRect = document
        .getElementById("projectImage")
        ?.getBoundingClientRect();

      document.body.classList.add("isAnimating");

      gsap.to(ref.current, {
        x: finalRect?.x,
        y: finalRect?.y,
        width: finalRect?.width,
        height: finalRect?.height,
        duration: 0.5,
        delay: 0.5,
        onComplete: () => {
          setValid(false);
          document.body.classList.remove("isAnimating");
        },
      });
    }
  }, []);

  return (
    valid && (
      <img
        ref={ref}
        src={project?.image}
        className="w-screen h-screen z-10 fixed top-0 left-0 object-cover"
        alt={project?.title}
      />
    )
  );
}

export default ProjectTransition;
