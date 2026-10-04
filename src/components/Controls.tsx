import React from 'react';
import { TowerType } from '../engine/types';

interface ControlsProps {
  selectedTowerType?: TowerType | null;
  onSelectTower?: (type: TowerType | null) => void;
}

export default function Controls({ selectedTowerType, onSelectTower }: ControlsProps) {
  const towers: TowerType[] = ['basic', 'sniper', 'splash'];

  return (
    
      {towers.map((type) => (
         onSelectTower && onSelectTower(selectedTowerType === type ? null : type)}
          style={{
            padding: '8px 12px',
            background: selectedTowerType === type ? '#007acc' : '#2d3748',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {type.toUpperCase()} Tower
        
      ))}
    
  );
}