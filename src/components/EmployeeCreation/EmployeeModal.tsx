import Image from 'next/image'
import React, { useState } from 'react'
import { employeeSchema } from '@/utils/schema'
import useValidation from '@/hooks/useValidation'
import NormalInput from '../TaskCreation/NormalInput'
import PhotoUploader from './PhotoUploader'
import DepartmentDropdown from '../TaskCreation/DepartmentDropdown'
import { Department } from '@/interfaces/interfaces'
import Buttons from './Buttons'

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    onEmployeeAdded?: (employee: any) => void
}

export default function EmployeeModal({ setIsOpen, onEmployeeAdded }: Props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [photo, setPhoto] = useState('')
    const [department, setDepartment] = useState<Department | null>(null)
    const [departments, setDepartments] = useState<Department[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const formData = {
        firstName,
        lastName
    };

    const { errors, validateField, validateForm } = useValidation({
        schema: employeeSchema,
        formData
    });


    return (
        <div
            className="bg-white rounded-lg shadow-xl z-10 w-[918px] px-[50px] py-[40px]"
            onClick={(e) => e.stopPropagation()}
        >
            <div className='flex w-full justify-end'>
                <Image className='cursor-pointer' onClick={() => setIsOpen(false)} src={'/cancel.svg'} alt='cancel icon' width={40} height={40} />
            </div>

            <div className='mt-[37px] flex flex-col items-center gap-[45px]'>
                <h1 className='text-[32px] font-medium'>თანამშრომლის დამატება</h1>

                <div className='flex items-center justify-between w-full gap-[45px]'>
                    <div className='w-full'>
                        <NormalInput
                            labelSize={14}
                            label='სახელი'
                            value={firstName}
                            setValue={setFirstName}
                            validateField={validateField}
                            error={errors.firstName}
                            inputName='firstName'
                        />
                    </div>

                    <div className='w-full'>
                        <NormalInput
                            labelSize={14}
                            label='გვარი'
                            value={lastName}
                            setValue={setLastName}
                            validateField={validateField}
                            error={errors.lastName}
                            inputName='lastName'
                        />
                    </div>
                </div>

                <div className='w-full'>
                    <PhotoUploader value={photo} setValue={setPhoto} />
                </div>

                <div className='w-full'>
                    <div className='w-[384px]'>
                        <DepartmentDropdown
                            labelSize={14}
                            displayPlaceholder={false}
                            department={department}
                            setDepartment={setDepartment}
                            departments={departments}
                            setDepartments={setDepartments}
                        />
                    </div>
                </div>

                <div className='w-full mt-7'>
                    <Buttons />
                </div>
            </div>
        </div>
    )
}