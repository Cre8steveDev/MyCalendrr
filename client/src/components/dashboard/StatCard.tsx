import React from 'react';

type StatCard = {
  label: string;
  value: string | number;
  subtext?: string;
  className?: string;
};

/**
 * StatCard
 * @returns
 */

const StatCard: React.FC<StatCard> = ({ label, value, subtext, className }) => {
  return (
    <div
      className={`rounded-md p-3 sm:p-6 flex flex-col justify-center items-center ${className} w-[45%] sm:w-auto`}
    >
      <p className="w-[90%] text-center leading-tight text-xs sm:text-base">
        {label}
      </p>
      <p className="text-3xl sm:text-5xl font-bold">{value}</p>
      {subtext && <p className="text-xs font-bold">{subtext}</p>}
    </div>
  );
};

export default StatCard;
