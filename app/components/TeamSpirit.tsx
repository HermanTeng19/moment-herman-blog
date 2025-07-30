'use client';

interface MemberProps {
  name: string;
  contribution: string;
}

export default function TeamSpirit({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
      <h3 className="text-lg font-semibold mb-4 text-green-800">团队精神</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
}

export function Member({ name, contribution }: MemberProps) {
  return (
    <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-gray-800">{name}</div>
          <div className="text-xs text-gray-500">{contribution}</div>
        </div>
      </div>
    </div>
  );
} 