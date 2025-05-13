import React from 'react';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useMountedTheme } from '@/hooks/use-mounted-theme';

const BarChartDashboard = ({budgetList}) => {
  const { isDark, darkThemeColors } = useMountedTheme();
  
  const formatData = (data) => {
    if (!data || data.length === 0) return [];
    
    return data.map(item => ({
      name: item.name.length > 10 ? item.name.substring(0, 10) + '...' : item.name,
      fullName: item.name,
      // Use 0 as default for null values
      totalSpend: item.totalSpend || 0,
      amount: item.amount,
      // Calculate remaining budget
      remaining: item.amount - (item.totalSpend || 0)
    }));
  };
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className={`p-3 rounded-lg shadow-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border'}`}>
          <p className="font-medium mb-1">{data.fullName || label}</p>
          <p className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            Budget: ${data.amount}
          </p>
          <p className={`text-sm ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
            Spent: ${data.totalSpend}
          </p>
          <p className={`text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
            Remaining: ${data.remaining}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-5 pt-2">
      {budgetList && budgetList.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={formatData(budgetList)} 
            margin={{top: 20, right: 30, left: 0, bottom: 20}}
            barGap={0}
            barCategoryGap="20%"
          >
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ opacity: 0.2 }} />
            <Legend 
              wrapperStyle={{ paddingTop: 10 }}
              formatter={(value) => {
                return <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  {value === 'totalSpend' ? 'Spent' : value === 'amount' ? 'Budget' : value}
                </span>
              }}
            />
            <Bar 
              dataKey="totalSpend" 
              name="Spent"
              radius={[4, 4, 0, 0]}
              fill={isDark ? '#8b5cf6' : '#4f46e5'}
              fillOpacity={0.9}
            />
            <Bar 
              dataKey="amount" 
              name="Budget"
              radius={[4, 4, 0, 0]}
              fill={isDark ? '#c4b5fd' : '#a5b4fc'} 
              fillOpacity={0.7}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className={`h-[300px] flex items-center justify-center ${
          isDark ? 'bg-gray-800/30' : 'bg-slate-50'
        } rounded-lg`}>
          <div className="text-center">
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>No budget data to display</p>
            <p className="text-sm mt-2">Create budgets to see your financial activity</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarChartDashboard;
