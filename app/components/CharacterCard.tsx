'use client';

import { useState } from 'react';

interface CharacterCardProps {
  name: string;
  role: string;
  power: string;
}

export default function CharacterCard({ name, role, power }: CharacterCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-32 cursor-pointer"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500`}
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* 正面 */}
        <div 
          className="absolute w-full h-full"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-4 text-white shadow-lg dark:shadow-xl">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-bold mb-1">{name}</h3>
                <p className="text-sm opacity-90">{role}</p>
              </div>
              <div className="text-xs opacity-75">
                点击查看详情
              </div>
            </div>
          </div>
        </div>
        
        {/* 背面 */}
        <div 
          className="absolute w-full h-full"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-600 rounded-lg p-4 text-white shadow-lg dark:shadow-xl">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-bold mb-1">{name}</h3>
                <p className="text-sm opacity-90">神通: {power}</p>
              </div>
              <div className="text-xs opacity-75">
                角色背景丰富
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 