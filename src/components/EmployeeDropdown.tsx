import React, { useEffect } from 'react'
import { Employee } from '@/interfaces/interfaces'
import axios from 'axios'

interface Props {
    employees: Employee[]
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>
}

export default function EmployeeDropdown({ employees, setEmployees }: Props) {

    useEffect(() => {
        axios.get('https://momentum.redberryinternship.ge/api/employees', { headers: { Authorization: `Bearer 9e68b0cd-e37e-4a1b-a82d-a5e71bcdcf90` } })
            .then((res) => setEmployees(res.data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className='flex flex-col'>
            <label className={`${employees.length === 0 && 'text-[#ADB5BD]'}`}>პასუხისმგებელი თანამშრომელი*</label>
            <select name="departament" className='w-[550px] mt-[6px] h-[45px] px-[10px] rounded-[5px] bg-white border-[1px] border-[#DEE2E6] outline-none text-[14px] font-[300] text-[#0D0F10]'>
                {employees.map((department) => (
                    <option key={department.id}>{department.name}</option>
                ))}
            </select>
        </div>
    )
}
