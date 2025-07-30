'use client';

import { useState } from 'react';

interface BattleSceneProps {
  boss: string;
  duration: string;
  difficulty: string;
  strategy: string;
}

export default function BattleReplay({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-dark-800 dark:to-dark-700 rounded-lg border border-red-200 dark:border-red-700">
      <h3 className="text-lg font-semibold mb-4 text-red-800 dark:text-red-300">战斗回放</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

export function BattleScene({ boss, duration, difficulty, strategy }: BattleSceneProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="p-4 bg-white dark:bg-dark-700 rounded-lg border border-gray-200 dark:border-dark-600 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <h4 className="font-semibold text-gray-800 dark:text-gray-200">对战 {boss}</h4>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          {isPlaying ? '暂停' : '播放'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 dark:text-gray-400">时长:</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">{duration}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 dark:text-gray-400">难度:</span>
          <span className={`font-medium px-2 py-1 rounded text-xs ${
            difficulty === '困难' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' : 
            difficulty === '中等' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300' : 
            'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
          }`}>
            {difficulty}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 dark:text-gray-400">策略:</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">{strategy}</span>
        </div>
      </div>
      
      {isPlaying && (
        <div className="mt-3 p-3 bg-gray-50 dark:bg-dark-600 rounded border-l-4 border-red-500">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <div className="font-medium mb-1">战斗进行中...</div>
            <div className="space-y-1 text-xs">
              <div>• 使用七十二变躲避攻击</div>
              <div>• 寻找敌人破绽时机</div>
              <div>• 合理分配法力值</div>
              <div>• 保持冷静，耐心等待</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 