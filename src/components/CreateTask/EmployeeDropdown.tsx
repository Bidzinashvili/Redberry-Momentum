import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Department, Employee } from '@/interfaces/interfaces';
import axios from 'axios';

interface Props {
    employees: Employee[]
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>
    department: Department | null;
    selectedEmployee: Employee | null;
    setSelectedEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
}

export default function EmployeeDropdown({ department, employees, setEmployees, selectedEmployee, setSelectedEmployee }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const getEmployees = async () => {
            if (department === null) {
                return;
            }

            try {
                const response = await axios.get('https://momentum.redberryinternship.ge/api/employees', {
                    headers: { Authorization: `Bearer 9e68b0cd-e37e-4a1b-a82d-a5e71bcdcf90` }
                });

                const filteredEmployees = response.data.filter((employee: Employee) =>
                    employee.department.id === department.id
                );

                setEmployees(filteredEmployees);

                const storedEmployeeId = localStorage.getItem('employee');

                if (storedEmployeeId) {
                    const storedEmployee = filteredEmployees.find((emp: Employee) => emp.id.toString() === storedEmployeeId);

                    if (storedEmployee) {
                        setSelectedEmployee(storedEmployee);
                        return;
                    }
                }

                if (filteredEmployees.length > 0) {
                    setSelectedEmployee(filteredEmployees[0]);
                } else {
                    setSelectedEmployee(null);
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        getEmployees();
    }, [department, setEmployees, setSelectedEmployee]);

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

    const handleSelectOption = (employee: Employee): void => {
        setSelectedEmployee(employee);
        localStorage.setItem('employee', employee.id.toString());
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col">
            <label className={`mb-1 ${employees.length === 0 ? 'text-[#ADB5BD]' : ''}`}>
                პასუხისმგებელი თანამშრომელი*
            </label>
            <div className="relative" ref={dropdownRef}>
                <div
                    className="flex items-center justify-between mt-[6px] h-[45px] px-[10px] rounded-[5px] bg-white border-[1px] border-[#DEE2E6] outline-none text-[14px] font-[300] text-[#0D0F10] cursor-pointer w-[550px]"
                    onClick={() => employees.length > 0 && setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    tabIndex={employees.length > 0 ? 0 : -1}
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-labelledby="employee-label"
                >
                    <div className="flex items-center">
                        {selectedEmployee && (
                            <>
                                <img
                                    src={selectedEmployee.avatar}
                                    alt={`${selectedEmployee.name} ${selectedEmployee.surname}`}
                                    className="w-[30px] h-[30px] rounded-full mr-2"
                                />
                                <span className='font-light'>
                                    {`${selectedEmployee.name} ${selectedEmployee.surname}`}
                                </span>
                            </>
                        )}
                    </div>
                    <ChevronDown />
                </div>

                {isOpen && employees.length > 0 && (
                    <div
                        className="absolute w-full mt-1 bg-white border border-[#DEE2E6] rounded-[5px] shadow-lg z-10"
                        role="listbox"
                    >
                        {employees.map((employee) => (
                            <div
                                key={employee.id}
                                className="flex items-center px-[10px] py-3 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelectOption(employee)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleSelectOption(employee);
                                    }
                                }}
                                role="option"
                                aria-selected={selectedEmployee?.id === employee.id}
                                tabIndex={0}
                            >
                                <img
                                    src={employee.avatar}
                                    alt={`${employee.name} ${employee.surname}`}
                                    className="w-[30px] h-[30px] rounded-full mr-2"
                                />
                                <span>{employee.name} {employee.surname}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
