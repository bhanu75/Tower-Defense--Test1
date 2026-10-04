import React, { MutableRefObject } from 'react';
import { TowerType } from '../engine/types';
import { GameEngine } from '../engine/GameEngine';

interface ControlsProps {
  selectedTowerType: TowerType | null;
  onSelectTower: (type: TowerType | null) => void;
  engineRef: MutableRefObject;
}

export default function Controls({
  selectedTowerType,
  onSelectTower,
  engineRef,
}: ControlsProps) {
  const handleStartWave = () => {
    if (engineRef.current) {
      // wave logic
    }
  };

  return (
    
      Start Wave
       onSelectTower('basic')}>
        Basic {selectedTowerType === 'basic' ? '(Selected)' : ''}
      
       onSelectTower('sniper')}>
        Sniper {selectedTowerType === 'sniper' ? '(Selected)' : ''}
      
    
  );
}