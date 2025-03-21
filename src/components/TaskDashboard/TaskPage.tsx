'use client'
import { Task } from '@/interfaces/interfaces'
import React, { useEffect, useState } from 'react'
import TaskGrid from './TaskGrid'
import TaskFilter from './TaskFilter'

interface Props {
    tasks: Task[]
}

export default function TaskPage({ tasks }: Props) {
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks)


    return (
        <div className="px-[120px] pt-[40px]">
            <h1 className="text-[34px] font-semibold text-[#212529]">დავალებების გვერდი</h1>
            <div className='w-[688px]'>
                <TaskFilter />
            </div>
            <div>
                <TaskGrid tasks={filteredTasks} />
            </div>
        </div>
    )
}
