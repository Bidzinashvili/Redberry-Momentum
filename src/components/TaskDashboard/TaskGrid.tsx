import { Task } from '@/interfaces/interfaces'
import React from 'react'
import TaskCard from './TaskCard'

interface Props {
    tasks: Task[]
}

export default function TaskGrid({ tasks }: Props) {
    return (
        <div>
            <TaskCard task={tasks[8]} />
        </div>
    )
}
