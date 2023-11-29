import React, { useMemo } from 'react';

interface FlightListStatusBoxProps {
  children?: React.ReactNode;
  error?: boolean;
  loading?: boolean;
}

export default function FlightListStatusBox({ children, error, loading }: FlightListStatusBoxProps) {
  const textColor = useMemo(() => {
    if (error) return 'text-error';
    return 'text-primary-blue';
  }, [error]);

  const borderColor = useMemo(() => {
    if (error) return 'border-error';
    return 'border-primary-blue';
  }, [error]);

  function renderChildren() {
    if (loading) return <p className="text-white">loading...</p>;
    return typeof children === 'string' ? <p className={`${textColor}`}>{children}</p> : children;
  }

  return (
    <div className={`relative ${textColor}`}>
      <div className={`w-[330px] md:w-[370px] h-[64px] border-[2px] ${borderColor} flex justify-center items-center`}>
        {renderChildren()}
      </div>
   
    </div>
  );
}
