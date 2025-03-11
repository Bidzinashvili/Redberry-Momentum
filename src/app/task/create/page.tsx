'use client'
import { useState } from 'react'
import { Department, Employee } from '@/interfaces/interfaces'
import DepartmentDropdown from '@/components/DepartmentDropdown'
import EmployeeDropdown from '@/components/EmployeeDropdown'
import PriorityDropdown from '@/components/PriorityDropdown'
import StatusDropdown from '@/components/StatusDropdown'
import DeadlineSelector from '@/components/DeadlineSelector'
import SubmitButton from '@/components/SubmitButton'

export default function page() {
    const [departments, setDepartments] = useState<Department[]>([])
    const [employees, setEmployees] = useState<Employee[]>([])



    return (
        <div className='mx-[120px] mt-[40px]'>
            <h1 className='text-[34px] font-[600] text-[#212529] mb-[25px]'>შექმენი ახალი დავალება</h1>
            <div className='bg-[#FBF9FFA6] border-[#DDD2FF] border-[0.3px] rounded-[4px] py-[65px] px-[55px]'>

                {/* Name and Department */}
                <div className='flex gap-[161px]'>

                    <div className='flex flex-col'>
                        <label>სათაური*</label>
                        <input className='w-[550px] mt-[6px] h-[45px] px-[10px] rounded-[5px] bg-white border-[1px] border-[#DEE2E6] outline-none' type="text" />
                        <p className='text-[10px] font-[350] text-[#6C757D] mt-[4px]'>მინიმუმ 2 სიმბოლო</p>
                        <p className='text-[10px] font-[350] text-[#6C757D] mt-[2px]'>მაქსიმუმ 255 სიმბოლო</p>
                    </div>

                    <DepartmentDropdown departments={departments} setDepartments={setDepartments} />

                </div>

                {/* Description and Employees */}
                <div className='flex gap-[161px] mt-[57px]'>
                    <div className='flex flex-col'>
                        <label>აღწერა</label>
                        <textarea className='resize-none mt-[6px] h-[133px] w-[550px] p-[10px] rounded-[5px] bg-white border-[1px] border-[#DEE2E6] outline-none'></textarea>
                        <p className='text-[10px] font-[350] text-[#6C757D] mt-[4px]'>მინიმუმ 2 სიმბოლო</p>
                        <p className='text-[10px] font-[350] text-[#6C757D] mt-[2px]'>მაქსიმუმ 255 სიმბოლო</p>
                    </div>

                    <EmployeeDropdown employees={employees} setEmployees={setEmployees} />
                </div>

                {/* Priority, Status and Deadline */}
                <div className='flex gap-[161px] mt-[57px]'>
                    <div className='flex gap-[32px] w-[550px]'>
                        <div className='flex-1'>
                            <PriorityDropdown />
                        </div>
                        <div className='flex-1'>
                            <StatusDropdown />
                        </div>
                    </div>
                    <div className='w-[318px]'>
                        <DeadlineSelector />
                    </div>
                </div>

                {/* Submit Button */}
                <div className='flex w-[1261px] mt-[145px] justify-end'>
                    <SubmitButton />
                </div>
            </div >
        </div>
    )
}
