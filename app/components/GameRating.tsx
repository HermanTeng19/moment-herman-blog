'use client';

interface GameRatingProps {
  graphics: number;
  gameplay: number;
  story: number;
  music: number;
  overall: number;
}

export default function GameRating({ graphics, gameplay, story, music, overall }: GameRatingProps) {
  const categories = [
    { name: '画面', score: graphics },
    { name: '玩法', score: gameplay },
    { name: '剧情', score: story },
    { name: '音乐', score: music },
    { name: '总体', score: overall }
  ];

  return (
    <div className="my-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-dark-800 dark:to-dark-700 rounded-lg border border-gray-200 dark:border-dark-600">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">游戏评分</h3>
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.name} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(category.score / 10) * 100}%` }}
                />
              </div>
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200 w-8">{category.score}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-dark-600">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-gray-800 dark:text-gray-200">综合评分</span>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{overall}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">/10</span>
          </div>
        </div>
      </div>
    </div>
  );
} 