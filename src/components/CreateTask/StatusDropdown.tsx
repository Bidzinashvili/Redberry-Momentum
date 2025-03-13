import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface StatusOption {
    id: number;
    name: string;
}

export default function StatusDropdown() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<StatusOption | null>(null);
    const [options, setOptions] = useState<StatusOption[]>([]);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const response = await fetch('https://momentum.redberryinternship.ge/api/statuses');

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setOptions(data);

                if (data.length > 0 && !selectedOption) {
                    setSelectedOption(data[0]);
                }

            } catch (err) {
                console.error('Error fetching statuses:', err);
            }
        };

        fetchStatuses();
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

    const handleSelectOption = (option: StatusOption): void => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col">
            <label className="mb-1">სტატუსი*</label>
            <div className="relative" ref={dropdownRef}>
                <div
                    className="flex items-center justify-between mt-[6px] h-[45px] px-[10px] rounded-[5px] bg-white border-[1px] border-[#DEE2E6] outline-none text-[14px] font-[300] text-[#0D0F10] cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-labelledby="status-label"
                >
                    <div className="flex items-center">
                        <span>{selectedOption?.name || 'აირჩიეთ სტატუსი'}</span>
                    </div>
                    <ChevronDown />
                </div>

                {isOpen && (
                    <div
                        className="absolute w-full mt-1 bg-white border border-[#DEE2E6] rounded-[5px] shadow-lg z-10"
                        role="listbox"
                    >
                        {options.map((option) => (
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
                                aria-selected={selectedOption?.id === option.id}
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