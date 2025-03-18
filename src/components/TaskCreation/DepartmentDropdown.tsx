import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { Department } from '@/interfaces/interfaces';
import axios from 'axios';

interface Props {
    departments: Department[];
    setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
    department: Department | null;
    setDepartment: (value: Department | null) => void;
    labelSize: 16 | 14;
    displayPlaceholder: boolean;
    storageKey?: string;
    validateField?: (name: string, value: any) => void;
    error?: string;
}

export default function DepartmentDropdown({
    department,
    setDepartments,
    setDepartment,
    departments,
    displayPlaceholder,
    labelSize,
    storageKey,
    validateField,
    error
}: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const setDepartmentWithValidation = useCallback(
        (value: Department | null) => {
            setDepartment(value);
            validateField?.('department', value);
        },
        [setDepartment, validateField]
    );

    useEffect(() => {
        axios.get('https://momentum.redberryinternship.ge/api/departments')
            .then((res) => {
                setDepartments(res.data);

                if (storageKey) {
                    const savedDepartmentName = localStorage.getItem(storageKey);
                    if (savedDepartmentName) {
                        const foundDepartment = res.data.find((dept: Department) => dept.name === savedDepartmentName);
                        if (foundDepartment) {
                            setDepartmentWithValidation(foundDepartment);
                        }
                    }
                }
            })
            .catch((err) => console.log(err));
    }, [storageKey, setDepartments, setDepartmentWithValidation]);

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
        setDepartmentWithValidation(option);
        if (storageKey) {
            localStorage.setItem(storageKey, option.name);
        }
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col">
            <label className={`mb-1 text-[${labelSize}px]`}>დეპარტამენტი*</label>
            <div className="relative" ref={dropdownRef}>
                <div
                    className={`flex items-center justify-between mt-[6px] h-[45px] px-[10px] rounded-[5px] bg-white border-[1px] ${error ? 'border-red-500' : 'border-[#DEE2E6]'
                        } outline-none text-[14px] font-[300] text-[#0D0F10] cursor-pointer w-full`}
                    onClick={() => setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-labelledby="department-label"
                >
                    <div className="flex items-center">
                        <span>
                            {department?.name ? department.name : displayPlaceholder ? 'აირჩიეთ დეპარტამენტი' : ''}
                        </span>
                    </div>
                    <ChevronDown />
                </div>

                {isOpen && (
                    <div
                        className="absolute w-full mt-1 bg-white border border-[#DEE2E6] rounded-[5px] shadow-lg z-10 max-h-[200px] overflow-y-auto"
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
            {error && (
                <span className="text-red-500 text-[12px] mt-1">{error}</span>
            )}
        </div>
    );
}