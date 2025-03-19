import React from 'react';
import TaskGrid from '@/components/TaskDashboard/TaskGrid';
import TaskFilter from '@/components/TaskDashboard/TaskFilter';

async function getTasks() {
  const res = await fetch("https://momentum.redberryinternship.ge/api/tasks", {
    headers: {
      Authorization: `Bearer 9e68b0cd-e37e-4a1b-a82d-a5e71bcdcf90`,
    },
    cache: 'no-store',
  });

  return res.json();
}

export default async function Page() {
  const Tasks = await getTasks();

  return (
    <div className="px-[120px] pt-[40px]">
      <h1 className="text-[34px] font-semibold text-[#212529]">დავალებების გვერდი</h1>
      <div className='w-[688px]'>
        <TaskFilter />
      </div>
      <div>
        <TaskGrid tasks={Tasks} />
      </div>
    </div>
  );
}
