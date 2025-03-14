'use client'
import { useEffect, useState } from 'react'
import { schema } from '@/utils/schema'
import { Department, Employee, Priority } from '@/interfaces/interfaces'
import DepartmentDropdown from '@/components/CreateTask/DepartmentDropdown'
import EmployeeDropdown from '@/components/CreateTask/EmployeeDropdown'
import PriorityDropdown from '@/components/CreateTask/PriorityDropdown'
import StatusDropdown from '@/components/CreateTask/StatusDropdown'
import DeadlineSelector from '@/components/CreateTask/DeadlineSelector'
import SubmitButton from '@/components/CreateTask/SubmitButton'
import NameInput from '@/components/CreateTask/NameInput'
import useValidation from '@/hooks/useValidation'
import DescriptionInput from '@/components/CreateTask/DescriptionInput'

export default function page() {
    const [departments, setDepartments] = useState<Department[]>([])
    const [employees, setEmployees] = useState<Employee[]>([])

    const [name, setName] = useState('')
    const [selectedPriority, setSelectedPriority] = useState<Priority | null>(null)
    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState<Department | null>(null)
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

    const { errors, validateField } = useValidation({ schema, formData: { name, description } });

    return (
        <div className='mx-[120px] mt-[40px]'>
            <h1 className='text-[34px] font-[600] text-[#212529] mb-[25px]'>შექმენი ახალი დავალება</h1>
            <div className='bg-[#FBF9FFA6] border-[#DDD2FF] border-[0.3px] rounded-[4px] py-[65px] px-[55px]'>

                {/* Name and Department */}
                <div className='flex gap-[161px]'>

                    <NameInput name={name} setName={setName} validateField={validateField} error={errors.name} />

                    <DepartmentDropdown department={department} setDepartment={setDepartment} departments={departments} setDepartments={setDepartments} />

                </div>

                {/* Description and Employees */}
                <div className='flex gap-[161px] mt-[57px]'>
                    <DescriptionInput
                        description={description}
                        setDescription={setDescription}
                        validateField={validateField}
                        error={errors.description}
                    />
                    <EmployeeDropdown selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} department={department} employees={employees} setEmployees={setEmployees} />
                </div>

                {/* Priority, Status and Deadline */}
                <div className='flex gap-[161px] mt-[57px]'>
                    <div className='flex gap-[32px] w-[550px]'>
                        <div className='flex-1'>
                            <PriorityDropdown selectedPriority={selectedPriority} setSelectedPriority={setSelectedPriority} />
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
