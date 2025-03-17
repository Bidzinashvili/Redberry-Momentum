import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'

interface Props {
    name: string;
    description: string;
    due_date: string;
    status_id: number | null;
    employee_id: number | null;
    priority_id: number | null;
}

export default function SubmitButton({ name, description, due_date, status_id, employee_id, priority_id }: Props) {
    const router = useRouter()

    const handleSubmit = () => {
        if (!status_id || !employee_id || !priority_id) return

        axios.post('https://momentum.redberryinternship.ge/api/tasks',
            {
                name,
                description,
                due_date,
                status_id,
                employee_id,
                priority_id
            },
            {
                headers: { Authorization: 'Bearer 9e68b0cd-e37e-4a1b-a82d-a5e71bcdcf90' }
            })
            .then((res) => {
                localStorage.clear()
                router.push('/')
            })
            .catch((err) => console.log(err))

    }

    return (
        <button className='bg-[#8338EC] text-white rounded-[5px] py-[10px] px-[20px] cursor-pointer' onClick={handleSubmit}>
            დავალების შექმნა
        </button>
    )
}
