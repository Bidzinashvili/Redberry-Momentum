'use client'
import { useEffect, useState } from 'react'
import { taskSchema } from '@/utils/schema'
import { Department, Employee, Priority, Status } from '@/interfaces/interfaces'
import DepartmentDropdown from '@/components/TaskCreation/DepartmentDropdown'
import EmployeeDropdown from '@/components/TaskCreation/EmployeeDropdown'
import PriorityDropdown from '@/components/TaskCreation/PriorityDropdown'
import StatusDropdown from '@/components/TaskCreation/StatusDropdown'
import DeadlineSelector from '@/components/TaskCreation/DeadlineSelector'
import SubmitButton from '@/components/TaskCreation/SubmitButton'
import useValidation from '@/hooks/useValidation'
import DescriptionInput from '@/components/TaskCreation/DescriptionInput'
import NormalInput from '@/components/TaskCreation/NormalInput'

export default function page() {
    const [departments, setDepartments] = useState<Department[]>([])
    const [employees, setEmployees] = useState<Employee[]>([])

    const [name, setName] = useState('')
    const [selectedPriority, setSelectedPriority] = useState<Priority | null>(null)
    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState<Department | null>(null)
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
    const [deadline, setDeadline] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

    const formData = {
        name,
        description,
        deadline
    };

    const { errors, validateField, validateForm } = useValidation({
        schema: taskSchema,
        formData
    });

    return (
        <div className='mx-[120px] mt-[40px]'>
            <h1 className='text-[34px] font-[600] text-[#212529] mb-[25px]'>შექმენი ახალი დავალება</h1>
            <div className='bg-[#FBF9FFA6] border-[#DDD2FF] border-[0.3px] rounded-[4px] py-[65px] px-[55px]'>

                {/* Name and Department */}
                <div className='flex gap-[161px]'>
                    <div className='w-[550px]'>
                        <NormalInput
                            labelSize={16}
                            label='სათაური'
                            value={name}
                            inputName='name'
                            setValue={setName}
                            validateField={validateField}
                            error={errors.name}
                            storageKey='taskName'
                        />
                    </div>
                    <div className='w-[550px]'>
                        <DepartmentDropdown
                            displayPlaceholder={true}
                            labelSize={16}
                            department={department}
                            setDepartment={setDepartment}
                            departments={departments}
                            setDepartments={setDepartments}
                            storageKey='selectedDepartment'
                        />
                    </div>
                </div>

                {/* Description and Employees */}
                <div className='flex gap-[161px] mt-[57px]'>
                    <DescriptionInput
                        description={description}
                        setDescription={setDescription}
                        validateField={validateField}
                        error={errors.description}
                    />
                    <EmployeeDropdown
                        selectedEmployee={selectedEmployee}
                        setSelectedEmployee={setSelectedEmployee}
                        department={department}
                        employees={employees}
                        setEmployees={setEmployees}
                    />
                </div>

                {/* Priority, Status and Deadline */}
                <div className='flex gap-[161px] mt-[57px]'>
                    <div className='flex gap-[32px] w-[550px]'>
                        <div className='flex-1'>
                            <PriorityDropdown
                                selectedPriority={selectedPriority}
                                setSelectedPriority={setSelectedPriority}
                            />
                        </div>
                        <div className='flex-1'>
                            <StatusDropdown
                                selectedStatus={selectedStatus}
                                setSelectedStatus={setSelectedStatus}
                            />
                        </div>
                    </div>
                    <div className='w-[318px]'>
                        <DeadlineSelector
                            value={deadline}
                            validateField={validateField}
                            error={errors.deadline}
                            setDeadline={setDeadline}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className='flex w-[1261px] mt-[145px] justify-end'>
                    <SubmitButton
                        name={name}
                        description={description}
                        due_date={deadline}
                        priority_id={selectedPriority?.id || null}
                        employee_id={selectedEmployee?.id || null}
                        status_id={selectedStatus?.id || null}
                        validateForm={validateForm}
                    />
                </div>
            </div>
        </div>
    )
}
