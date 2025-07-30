'use client';

import { useState } from 'react';

interface Skill {
  name: string;
  level: number;
  description: string;
}

interface SkillTreeProps {
  children: React.ReactNode;
}

interface SkillProps {
  name: string;
  level: number;
  description: string;
}

function Skill({ name, level, description }: SkillProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-dark-800 dark:to-dark-700 rounded-lg border border-orange-200 dark:border-orange-700 cursor-pointer transition-all duration-200 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-orange-800 dark:text-orange-300">{name}</span>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < level ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      {isHovered && (
        <div className="absolute top-full left-0 mt-2 p-3 bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg shadow-lg z-10 min-w-64">
          <div className="text-sm">
            <div className="font-semibold text-gray-800 dark:text-gray-200 mb-1">技能详情</div>
            <div className="text-gray-600 dark:text-gray-400">{description}</div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
              等级: {level}/5
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CombatDemo({ children }: SkillTreeProps) {
  return (
    <div className="my-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-dark-800 dark:to-dark-700 rounded-lg border border-orange-200 dark:border-orange-700">
      <h3 className="text-lg font-semibold mb-4 text-orange-800 dark:text-orange-300">战斗技能树</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

export { Skill }; 