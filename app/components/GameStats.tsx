'use client';

interface StatProps {
  label: string;
  value: string;
}

export default function GameStats({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-dark-800 dark:to-dark-700 rounded-lg border border-purple-200 dark:border-purple-700">
      <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-300">游戏统计</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
}

export function Stat({ label, value }: StatProps) {
  return (
    <div className="text-center p-3 bg-white dark:bg-dark-700 rounded-lg border border-gray-200 dark:border-dark-600 shadow-sm">
      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
} 