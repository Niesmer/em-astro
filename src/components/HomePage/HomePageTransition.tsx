import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { navigate } from "astro:transitions/client";

type HomePageTransitionProps = {
  width?: 4 | 6 | 8 | 12;
  height?: 4 | 6 | 8 | 12 | 36;
  title: string;
  description: string;
  link: string;
  image: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

function HomePageTransition({
  width,
  height,
  title,
  link,
  description,
  image,
  className,
}: HomePageTransitionProps) {
  const elementRef = useRef<HTMLAnchorElement>(null);

  const handleTransition = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    sessionStorage.setItem("playTransition", "true");

    const element = elementRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();

    const absoluteX = rect.left;
    const absoluteY = rect.top;

    const clone = element.cloneNode(true) as HTMLElement;
    document.body.appendChild(clone);

    clone.style.position = "fixed";
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.left = `${absoluteX}px`;
    clone.style.top = `${absoluteY}px`;
    clone.style.zIndex = "1000";
    clone.style.pointerEvents = "none";

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

    gsap.to(clone.querySelectorAll("*"), {
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

  useEffect(() => {
    const customReferrer = sessionStorage.getItem("customReferrer");

    if (customReferrer && !customReferrer.endsWith("/")) {
      return;
    }

    if (elementRef.current) {
      const finalRect = elementRef.current.getBoundingClientRect();

      gsap.set(elementRef.current, {
        width: "100vw",
        height: "100vh",
        position: "fixed",
        objectFit: "cover",
        left: 0,
        top: 0,
        visibility: "visible",
      });

      gsap.to(elementRef.current, {
        width: finalRect.width,
        height: finalRect.height,
        left: finalRect.left,
        top: finalRect.top,
        position: "absolute",
        objectFit: "cover",
        delay: 1,
        duration: 0.5,
        onComplete: () => {
          gsap.set(elementRef.current, {
            position: "relative",
            width: "",
            height: "",
            left: "",
            top: "",
            objectFit: "",
          });
        },
      });
    }
  }, []);

  return (
    <div className={`project-card relative overflow-hidden ${className ?? ""}`}>
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black opacity-40 flex flex-col justify-center items-center text-center p-4">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
  );
}

export default HomePageTransition;
