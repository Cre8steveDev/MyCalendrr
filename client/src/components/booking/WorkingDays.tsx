/**
 * Renders working days
 * @returns JSX
 */

import React from 'react';

type TWorkingDays = {
  days: string[];
};

const WorkingDays: React.FC<TWorkingDays> = ({ days }) => {
  return (
    <div className="p-1 mt-3 text-xs">
      <p>I'm Available for the following days:</p>

      <div className="flex flex-wrap gap-2 mt-2">
        {days.map((day) => (
          <article
            key={day}
            className="px-2 py-1 bg-orange-200 text-slate-800 rounded-md cursor-default hover:bg-opacity-50"
          >
            {day}
          </article>
        ))}
      </div>
    </div>
  );
};

export default WorkingDays;
