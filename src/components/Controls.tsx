
import React, { MutableRefObject } from 'react';
import { TowerType } from '../engine/types';
import { GameEngine } from '../engine/GameEngine';

interface ControlsProps {
  selectedTowerType: TowerType | null;
  onSelectTower: (type: TowerType | null) => void;
  engineRef: MutableRefObject<GameEngine | null>;
}

export default function Controls({
  selectedTowerType,
  onSelectTower,
  engineRef,
}: ControlsProps) {
  const handleStartWave = () => {
    if (engineRef.current) {
      // Wave start logic
    }
  };

  return (
    <div className="controls-panel">
      <button onClick={handleStartWave}>Start Wave</button>
      <button onClick={() => onSelectTower('basic')}>
        Basic {selectedTowerType === 'basic' ? '(Selected)' : ''}
      </button>
      <button onClick={() => onSelectTower('sniper')}>
        Sniper {selectedTowerType === 'sniper' ? '(Selected)' : ''}
      </button>
    </div>
  );
}
