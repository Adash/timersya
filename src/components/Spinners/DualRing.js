import React from 'react';
import './dualRing.css';

export default function DualRing({ color = '#7f58af', style = {}, size = 80 }) {
  return (
    <div
      className="lds-dual-ring"
      style={{ width: size, height: size, ...style }}
    >
      <div
        className="lds-dual-ring-after"
        style={{
          borderColor: `${color} transparent`,
          borderWidth: size * 0.1,
          width: size * 0.7 - 6,
          height: size * 0.7 - 6,
        }}
      />
    </div>
  );
}
