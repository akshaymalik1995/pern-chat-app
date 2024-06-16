import { useEffect, useRef } from 'react';

export default function useScrollToBottom(dependencyArray: any[]) {
    const ref = useRef<HTMLDivElement | null>(null); // Create a ref to store the element to scroll
    
    // useEffect hook to scroll to the bottom of the element
    useEffect(() => {
        if (ref.current) {
            // Scroll to the bottom of the element
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, dependencyArray); // Dependency array to trigger the effect when the dependency changes
  return ref; // Return the ref to be used in the component
}
