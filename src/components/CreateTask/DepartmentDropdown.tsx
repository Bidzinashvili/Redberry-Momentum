import React, { useEffect } from 'react'
import { Department } from '@/interfaces/interfaces'
import axios from 'axios'

interface Props {
    departments: Department[]
    setDepartments: React.Dispatch<React.SetStateAction<Department[]>>
}

export default function DepartmentDropdown({ departments, setDepartments }: Props) {

    useEffect(() => {
        axios.get('https://momentum.redberryinternship.ge/api/departments')
            .then((res) => setDepartments(res.data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className='flex flex-col'>
            <label>დეპარტამენტი*</label>
            <select name="departament" className='w-[550px] mt-[6px] h-[45px] px-[10px] rounded-[5px] bg-white border-[1px] border-[#DEE2E6] outline-none text-[14px] font-[300] text-[#0D0F10]'>
                {departments.map((department) => (
                    <option key={department.id}>{department.name}</option>
                ))}
            </select>
        </div>
    )
}
