import Image from 'next/image'
import React from 'react'
import StatusDropdown from './StatusDropdown'
import { Calendar, User } from 'lucide-react'
import { Status, Task } from '@/interfaces/interfaces';
import axios from 'axios';
import { ParamValue } from 'next/dist/server/request/params';

const departmentDictionary: Record<string, string> = {
    "ლოჯოსტიკის დეპარტამენტი": "ლოჯისტიკა",
    "ადმინისტრაციის დეპარტამენტი": "ადმინ.",
    "ადამიანური რესურსების დეპარტამენტი": "ადმ. რეს.",
    "ფინანსების დეპარტამენტი": "ფინანსები",
    "გაყიდვების და მარკეტინგის დეპარტამენტი": "მარკეტინგი",
    "ტექნოლოგიების დეპარტამენტი": "ტექნ.",
    "მედიის დეპარტამენტი": "მედია"
};

const borderColors: Record<string, string> = {
    "დაბალი": "#08A508",
    "საშუალო": "#FFBE0B",
    "მაღალი": "#FA4D4D"
};

interface Props {
    task: Task
    id: ParamValue;
}




export default function Details({ task, id }: Props) {

    const handleStatusChange = (status: Status) => {
        axios.put(`https://momentum.redberryinternship.ge/api/tasks/${id}`,
            { status_id: status.id },
            { headers: { Authorization: 'Bearer 9e68b0cd-e37e-4a1b-a82d-a5e71bcdcf90' } })
            .then(res => console.log(res.data))
            .catch((err) => console.log(err))

    }

    const formatDate = (dateString: string) => {
        const daysOfWeek = ["კვ", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];
        const date = new Date(dateString);
        const dayOfWeek = daysOfWeek[date.getDay()];
        const formattedDate = `${dayOfWeek} - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
    };

    return (
        <div>
            <div className='flex gap-[18px]'>
                <div className='flex border-[0.5px] px-[5px] py-[4px] gap-2 items-center rounded-[3px]' style={{ borderColor: borderColors[task.priority.name] }}>
                    <Image className='w-[18px] h-[20px]' src={task.priority.icon} alt='Priority Icon' width={18} height={20} />
                    <p className='font-medium' style={{ color: borderColors[task.priority.name] }}>{task.priority.name}</p>
                </div>

                <div>
                    <div className='py-[5px] px-[10px] rounded-[15px]' style={{ backgroundColor: borderColors[task.priority.name] }}>
                        <p className='text-white'>
                            {departmentDictionary[task.department.name] ?? task.department.name}
                        </p>
                    </div>
                </div>
            </div>

            <h1 className='text-[34px] font-semibold text-[#212529] mt-[13.5px] max-w-[715px]'>{task.name}</h1>

            <p className='mt-[26px] text-[18px] text-black max-w-[715px]'>{task.description}</p>

            <div className='mt-[63px]'>
                <h3 className='text-[24px] '>დავალების დეტალები</h3>

                <div className='flex items-end mt-[15px] gap-[70px]'>
                    <div className='flex items-center gap-[6px] w-[164px]'>
                        <Image src={'/pie-chart.svg'} alt='pie chart icon' width={19} height={19} />
                        <p>სტატუსი</p>
                    </div>
                    <StatusDropdown defaultStatus={task.status} onChange={handleStatusChange} />
                </div>

                <div className='flex items-end mt-[28px] gap-[70px]'>
                    <div className='flex items-center gap-[6px] w-[164px]'>
                        <User width={19} height={19} />
                        <p>თანამშრომელი</p>
                    </div>
                    <div className='flex items-end gap-[12px]'>
                        <Image className='rounded-[50%] w-[32px] h-[32px]' src={task.employee.avatar} alt='User Avatar' width={32} height={32} />
                        <div>
                            <p className='text-[11px] font-light text-[#474747]'>{task.department.name}</p>
                            <p className='text-[14px] text-[#0D0F10] '>{task.employee.name} {task.employee.surname}</p>
                        </div>
                    </div>
                </div>

                <div className='flex items-end mt-[40px] gap-[70px]'>
                    <div className='flex items-center gap-[6px] w-[164px]'>
                        <Calendar width={17} height={17} />
                        <p>დავალების ვადა</p>
                    </div>
                    <p className='text-[14px] text-[#0D0F10] '>{formatDate(task.due_date)}</p>
                </div>
            </div>
        </div>
    )
}
