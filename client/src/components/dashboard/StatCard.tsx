import React from 'react';

type StatCard = {
  label: string;
  value: string;
  subtext?: string;
};

/**
 * StatCard
 * @returns
 */

const StatCard: React.FC<StatCard> = ({ label, value, subtext }) => {
  return (
    <div className="rounded-md p-6 bg-white flex flex-col justify-center items-center">
      <p className="w-[70%] text-center leading-tight">{label}</p>
      <p className="text-6xl font-bold text-slate-500">{value}</p>
      {subtext && <p className="text-slate-500 text-xs">{subtext}</p>}
    </div>
  );
};

export default StatCard;
