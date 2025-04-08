import React from 'react';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  percentage: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon: Icon, color, percentage }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between">
        <div className={`w-12 h-12 ${color} bg-opacity-10 rounded-full flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div className="flex items-center space-x-1">
          <span className={`text-sm ${percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {Math.abs(percentage)}%
          </span>
          {percentage >= 0 ? (
            <TrendingUp className="w-4 h-4 text-green-600" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-600" />
          )}
        </div>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default DashboardCard;