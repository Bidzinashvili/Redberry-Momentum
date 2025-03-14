import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Department } from '@/interfaces/interfaces';
import axios from 'axios';

interface Props {
    departments: Department[]
    setDepartments: React.Dispatch<React.SetStateAction<Department[]>>
    department: Department | null;
    setDepartment: React.Dispatch<React.SetStateAction<Department | null>>
}

export default function DepartmentDropdown({ department, setDepartment, departments, setDepartments }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        console.log(department);
    }, [department]);

    useEffect(() => {
        axios.get('https://momentum.redberryinternship.ge/api/departments')
            .then((res) => setDepartments(res.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent): void => {
        if (event.key === 'Enter' || event.key === ' ') {
            setIsOpen(!isOpen);
        } else if (event.key === 'Escape') {
            setIsOpen(false);
        }
    };

    const handleSelectOption = (option: Department): void => {
        setDepartment(option);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col">
            <label className="mb-1">დეპარტამენტი*</label>
            <div className="relative" ref={dropdownRef}>
                <div
                    className="flex items-center justify-between mt-[6px] h-[45px] px-[10px] rounded-[5px] bg-white border-[1px] border-[#DEE2E6] outline-none text-[14px] font-[300] text-[#0D0F10] cursor-pointer w-[550px]"
                    onClick={() => setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-labelledby="department-label"
                >
                    <div className="flex items-center">
                        <span>{department?.name || 'აირჩიეთ დეპარტამენტი'}</span>
                    </div>
                    <ChevronDown />
                </div>

                {isOpen && (
                    <div
                        className="absolute w-full mt-1 bg-white border border-[#DEE2E6] rounded-[5px] shadow-lg z-10"
                        role="listbox"
                    >
                        {departments.map((option) => (
                            <div
                                key={option.id}
                                className="flex items-center px-[10px] py-3 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelectOption(option)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleSelectOption(option);
                                    }
                                }}
                                role="option"
                                aria-selected={department?.id === option.id}
                                tabIndex={0}
                            >
                                <span>{option.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}