import React from 'react';

interface BenchmarkPanelProps {
  fps?: number;
  entityCount?: number;
}

export default function BenchmarkPanel({ fps = 60, entityCount = 0 }: BenchmarkPanelProps) {
  return (
    
      FPS: {fps}
      Active Entities: {entityCount}
    
  );
}