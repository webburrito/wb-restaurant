import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Loader.css";

const Loader = () => {
  const textRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Looping animation
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    tl.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1.2, duration: 0.7, ease: "power2.out" }
    ).to(
      textRef.current,
      { opacity: 0.7, scale: 1, duration: 0.7, ease: "power2.in" }
    );

    // Listen for page load
    const handleLoad = () => {
      setLoaded(true);
      tl.pause();
      // Clever finish: burst and fade out
      gsap.to(textRef.current, {
        scale: 2,
        opacity: 0,
        rotate: 20,
        duration: 0.8,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.to(".loader-overlay", { opacity: 0, duration: 0.5, onComplete: () => {
            document.querySelector(".loader-overlay").style.display = "none";
          }});
        }
      });
    };
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
      tl.kill();
    };
  }, []);

  return (
    <div className="loader-overlay">
      <span ref={textRef} className="loader-jp">ようこそ</span>
    </div>
  );
};

export default Loader;
