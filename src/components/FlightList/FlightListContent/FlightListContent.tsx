import { FlightState } from 'constants/common';

import FlightListStatusBox from 'components/FlightList/FlightListStatusBox';
import gsap from 'gsap';
import React, { useEffect, useRef, useMemo } from 'react';
import { FlightResponse } from 'types/interface';

interface FlightListContentProps {
  state: FlightState;
}

export default function FlightListContent({ state }: FlightListContentProps) {
  const containerRef = useRef(null);

  const showContent = !!TITLES[state];

  useEffect(() => {
    if (!containerRef.current || !showContent) return undefined;

    gsap.to(containerRef.current, {
      opacity: 1,
      pointerEvents: 'auto',
      duration: 1.6,
      delay: 0,
    });
    return () => {
      gsap.to(containerRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 1.6,
        delay: 0,
      });
    };
  }, [showContent]);

  const title = TITLES[state] || '';
  const textColor = state === FlightState.NoDataFound ? 'text-error' : 'text-primary-blue';

  function renderContent() {
    if (state === FlightState.CheckingProgress) return <FlightListStatusBox loading />;
    if (state === FlightState.NoDataFound)
      // Render error status
      return null;

    // Render content
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="cover flex flex-col justify-center items-center pointer-events-none opacity-0"
    >
      <div className="relative">
        {renderContent()}
        <div
          className={`text-center w-full caption-small uppercase absolute top-[-30px] ${textColor}`}
        >
          {title}
        </div>
      </div>
    </div>
  );
}

const TITLES: Record<number, string> = {
  [FlightState.CheckingProgress]: 'checking flight status',
};
