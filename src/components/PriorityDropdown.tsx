import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

interface PriorityType {
    id: number;
    name: string;
    icon: string;
}

export default function PriorityDropdown() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [priorities, setPriorities] = useState<PriorityType[]>([]);
    const [selectedPriority, setSelectedPriority] = useState<PriorityType | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchPriorities = async () => {
            try {
                const response = await fetch('https://momentum.redberryinternship.ge/api/priorities');

                if (!response.ok) {
                    throw new Error('Failed to fetch priorities');
                }

                const data = await response.json();
                setPriorities(data);

                const highPriority = data.find((priority: PriorityType) => priority.name === 'მაღალი');
                if (highPriority) {
                    setSelectedPriority(highPriority);
                } else if (data.length > 0) {
                    setSelectedPriority(data[0]);
                }

            } catch (err) {
                console.error('Error fetching priorities:', err);
            }
        };

        fetchPriorities();
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

    const handleSelectOption = (priority: PriorityType): void => {
        setSelectedPriority(priority);
        setIsOpen(false);
    };

    if (!selectedPriority) {
        return (
            <div className="flex flex-col">
                <label className="mb-1">პრიორიტეტი*</label>
                <div className="flex items-center justify-between mt-[6px] h-[45px] px-[10px] rounded-[5px] bg-white border-[1px] border-[#DEE2E6] outline-none">
                    <span className="text-[14px] font-[300] text-red-500">{'Failed to load priorities'}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <label className="mb-1">პრიორიტეტი*</label>
            <div className="relative" ref={dropdownRef}>
                <div
                    className="flex items-center justify-between mt-[6px] h-[45px] px-[10px] rounded-[5px] bg-white border-[1px] border-[#DEE2E6] outline-none text-[14px] font-[300] text-[#0D0F10] cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-labelledby="priority-label"
                >
                    <div className="flex items-center">
                        <Image
                            src={selectedPriority.icon}
                            alt="priority-icon"
                            width={16}
                            height={16}
                        />
                        <span className="ml-2">{selectedPriority.name}</span>
                    </div>
                    <ChevronDown />
                </div>

                {isOpen && (
                    <div
                        className="absolute w-full mt-1 bg-white border border-[#DEE2E6] rounded-[5px] shadow-lg z-10"
                        role="listbox"
                    >
                        {priorities.map((priority) => (
                            <div
                                key={priority.id}
                                className="flex items-center px-[10px] py-3 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelectOption(priority)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleSelectOption(priority);
                                    }
                                }}
                                role="option"
                                aria-selected={selectedPriority.id === priority.id}
                                tabIndex={0}
                            >
                                <Image
                                    src={priority.icon}
                                    alt={`${priority.name}-icon`}
                                    width={16}
                                    height={16}
                                />
                                <span className="ml-2">{priority.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}