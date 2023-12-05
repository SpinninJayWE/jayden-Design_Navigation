import { useEffect, useState } from "react";

export const useInView = (ref: React.RefObject<HTMLElement>, options = {}) => {
    const [isInView, setIsInView] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        // Update our state when observer callback fires
        setIsInView(entry.isIntersecting);
      }, options);
  
      if (ref.current) {
        observer.observe(ref.current);
      }
  
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [ref, options]); // Only re-run effect if ref or options change
  
    return isInView;
  };
export default useInView