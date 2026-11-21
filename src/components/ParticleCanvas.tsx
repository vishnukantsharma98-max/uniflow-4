import React from 'react';

export const ParticleCanvas: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 nb-dot-grid opacity-[0.16] dark:opacity-[0.35]"
      aria-hidden="true"
    />
  );
};
