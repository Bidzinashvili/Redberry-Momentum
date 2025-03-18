import Image from 'next/image'
import React, { useState } from 'react'
import { employeeSchema } from '@/utils/schema'
import useValidation from '@/hooks/useValidation'
import NormalInput from '../TaskCreation/NormalInput'
import PhotoUploader from './PhotoUploader'
import DepartmentDropdown from '../TaskCreation/DepartmentDropdown'
import { Department } from '@/interfaces/interfaces'
import Buttons from './Buttons'
import axios from 'axios'

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EmployeeModal({ setIsOpen }: Props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [photo, setPhoto] = useState('')
    const [department, setDepartment] = useState<Department | null>(null)
    const [departments, setDepartments] = useState<Department[]>([])

    const formData = {
        firstName,
        lastName,
        photo,
        department
    };

    const { errors, validateField, validateForm } = useValidation({
        schema: employeeSchema,
        formData
    });

    const handleSubmit = async () => {
        if (!department) return;

        if (validateForm()) {
            try {
                const formData = new FormData();
                formData.append('name', firstName);
                formData.append('surname', lastName);
                formData.append('department_id', String(department.id));

                if (photo && photo.startsWith('data:image')) {
                    const blob = await fetch(photo).then((res) => res.blob());
                    formData.append('avatar', blob, 'avatar.jpg');
                } else if (photo) {
                    formData.append('avatar', photo);
                }

                const response = await axios.post(
                    'https://momentum.redberryinternship.ge/api/employees',
                    formData,
                    {
                        headers: {
                            Authorization: 'Bearer 9e68b0cd-e37e-4a1b-a82d-a5e71bcdcf90',
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );

                console.log('Success:', response.data);
                setIsOpen(false);
            } catch (err: any) {
                console.error('Error:', err.response?.data || err.message);
            }
        }
    };

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
                    <PhotoUploader
                        value={photo}
                        setValue={setPhoto}
                        validateField={validateField}
                        error={errors.photo}
                    />
                </div>

                <div className='w-full'>
                    <div className='w-[384px]'>
                        <DepartmentDropdown
                            labelSize={14}
                            displayPlaceholder={false}
                            department={department}
                            setDepartment={(value) => {
                                setDepartment(value);
                                validateField('department', value);
                            }}
                            departments={departments}
                            setDepartments={setDepartments}
                            error={errors.department}
                        />
                    </div>
                </div>

                <div className='w-full mt-7'>
                    <Buttons onSubmit={handleSubmit} />
                </div>
            </div>
        </div>
    )
}