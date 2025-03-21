import React from 'react';
import TaskGrid from '@/components/TaskDashboard/TaskGrid';
import TaskFilter from '@/components/TaskDashboard/TaskFilter';
import TaskPage from '@/components/TaskDashboard/TaskPage';

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
  const tasks = await getTasks();

  return (
    <TaskPage tasks={tasks} />
  );
}
