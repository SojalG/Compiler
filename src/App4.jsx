import React from 'react';
import { SplitText } from 'gsap/SplitText';
import { useEffect, useRef } from 'react';
import gsap from 'gsap/src';

function App4() {
  const headingRef = useRef(null);

  useEffect(() => {
    const split = new SplitText(headingRef.current, { type: 'chars' });
    gsap.from(split.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 2,
    });

    return () => split.revert();
  }, []);

  return (
    <>
      <h1 ref={headingRef}>Hello </h1>
      <h1 ref={headingRef}>How are you ? </h1>
    </>
  );
}

export default App4;