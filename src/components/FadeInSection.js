import { useState, useRef, useEffect } from "react";
import './FadeInSection.scss';

// TODO Not used; has issues. Modify/Re-apply to MovieCard at some point.

export function FadeInSection(props) {
  const [isVisible, setVisible] = useState(true);
  const domRef = useRef();

  useEffect( () => {
    const observer = new IntersectionObserver( entries => {
      entries.forEach( entry => {
        if (entry.isIntersecting)
          setVisible(true);
       });
    });
    observer.observe(domRef.current);
    return () => observer.unobserve(domRef.current);
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}