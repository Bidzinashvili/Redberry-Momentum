import { Task } from '@/interfaces/interfaces'
import Image from 'next/image'
import React from 'react'

interface Props {
    task: Task
}

const departmentDictionary: Record<string, string> = {
    "ლოჯოსტიკის დეპარტამენტი": "ლოჯისტიკა",
    "ადმინისტრაციის დეპარტამენტი": "ადმინ.",
    "ადამიანური რესურსების დეპარტამენტი": "ადამიანური რესურსები",
    "ფინანსების დეპარტამენტი": "ფინანსები",
    "გაყიდვების და მარკეტინგის დეპარტამენტი": "მარკეტინგი",
    "ტექნოლოგიების დეპარტამენტი": "ტექნ.",
    "მედიის დეპარტამენტი": "მედია"
}

const borderColors: Record<string, string> = {
    "დაბალი": "#08A508",
    "საშუალო": "#FFBE0B",
    "მაღალი": "#FA4D4D"
}

export default function TaskCard({ task }: Props) {
    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString("ka-GE", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const generateBadgeColor = () => {
        const colors = ['#FF66A8', '#FFD86D', '#89B6FF', '#FD9A6A'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className='cursor-pointer w-[381px] p-[20px] rounded-[15px] border bg-white' style={{ border: `1px solid ${borderColors[task.priority.name]}` }}>
            {/* Priority, Department and Due Date */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-[10px]'>
                    <div className='w-[86px] h-[26px] rounded-md flex items-center justify-center gap-[4px]' style={{ border: `1px solid ${borderColors[task.priority.name]}` }}>
                        <Image src={task.priority.icon} alt={task.priority.name} width={16} height={16} />
                        <p className='text-[12px] font-medium' style={{ color: `${borderColors[task.priority.name]}` }}>{task.priority.name}</p>
                    </div>
                    <div className='py-[5px] px-[18.5px] rounded-[15px]' style={{ backgroundColor: generateBadgeColor() }}>
                        <p className='text-[12px] text-white'>{departmentDictionary[task.department.name] ?? task.department.name}</p>
                    </div>
                </div>

                <p className='text-[12px] text-[#212529]'>
                    {formatDate(task.due_date)}
                </p>
            </div>

            {/* Title and Description*/}
            <div className='flex flex-col px-[10.5px]'>
                <div className='mt-[28px]'>
                    <h1 className='text-[15px] font-medium text-[#212529]'>{task.name}</h1>
                </div>

                <div className='mt-[12px]'>
                    <p className='text-[14px] text-[#343A40]'>{task.description}</p>
                </div>
            </div>

            <div className='flex items-center justify-between mt-[28px]'>
                <div>
                    <Image className='w-[31px] h-[31px] rounded-[50%]' src={task.employee.avatar} alt='User Avatar' width={31} height={31} />
                </div>
                <div className='flex gap-[2.5px]'>
                    <Image src={'/comment.svg'} alt='User Avatar' width={20} height={18} />
                    <p className='text-[14px] text-[#212529]'>{task.total_comments}</p>
                </div>
            </div>
        </div>
    )
}

