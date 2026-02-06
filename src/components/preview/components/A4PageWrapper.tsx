import React from 'react';

const A4PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-8.5in min-h-[11in] max-h-[11in] a4-wrapper">
      {children}
    </div>
  );
};

export default A4PageWrapper;
