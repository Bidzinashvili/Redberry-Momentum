import { Task } from '@/interfaces/interfaces';
import React from 'react';
import TaskCard from './TaskCard';
import TaskStatusBadge from './TaskStatusBadge';

interface Props {
    tasks: Task[];
}

export default function TaskGrid({ tasks }: Props) {
    const statusArr = ['დასაწყები', 'პროგრესში', 'მზად ტესტირებისთვის', 'დასრულებული'] as const;

    return (
        <div className='flex items-start justify-between mt-[80px]'>
            {statusArr.map((status) => (
                <div key={status} className='w-[381px]'>
                    <TaskStatusBadge status={status} />
                    <div className='mt-[30px] flex flex-col gap-[30px]'>
                        {tasks.filter(task => task.status.name === status).map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}