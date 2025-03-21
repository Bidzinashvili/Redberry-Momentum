import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';

interface DatePickerProps {
    value?: string;
    error?: string;
    validateField?: (name: string, value: any) => void;
    setDeadline: React.Dispatch<React.SetStateAction<string>>;
}

export default function DeadlineSelector({ value, error, validateField, setDeadline }: DatePickerProps) {
    const getTomorrowDate = (): string => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const getInitialDate = (): string => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('deadline') || value || getTomorrowDate();
        }
        return value || getTomorrowDate();
    };

    // Track the current date value internally
    const [currentDate, setCurrentDate] = useState<string>(getInitialDate());
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const datePickerRef = useRef<HTMLDivElement | null>(null);

    // Sync with external value when it changes
    useEffect(() => {
        if (value) {
            setCurrentDate(value);
        }
    }, [value]);

    // Initialize deadline if it's not set
    useEffect(() => {
        if (!value) {
            const initialDate = getInitialDate();
            setDeadline(initialDate);
            setCurrentDate(initialDate);
        }
    }, [value, setDeadline]);

    useEffect(() => {
        if (typeof window !== 'undefined' && currentDate) {
            localStorage.setItem('deadline', currentDate);
        }
    }, [currentDate]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const today = new Date();
    const minDate = today.toISOString().split('T')[0];

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setCurrentDate(newDate);
        setDeadline(newDate);

        if (validateField) {
            validateField('deadline', newDate);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent): void => {
        if (event.key === 'Enter' || event.key === ' ') {
            setIsOpen(!isOpen);
        } else if (event.key === 'Escape') {
            setIsOpen(false);
        }
    };

    const formatDisplayDate = (dateStr: string): string => {
        if (!dateStr) return '';

        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;

            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();

            return `${day}/${month}/${year}`;
        } catch (e) {
            return dateStr;
        }
    };

    const displayValue = formatDisplayDate(currentDate);

    return (
        <div className="flex flex-col" ref={datePickerRef}>
            <label className="mb-1">დედლაინი*</label>
            <div
                className={`relative flex items-center mt-[6px] h-[45px] px-[10px] rounded-[5px] bg-white border-[1px] ${error ? 'border-red-500' : 'border-[#DEE2E6]'} outline-none text-[14px] font-[300] text-[#0D0F10] cursor-pointer`}
                onClick={() => setIsOpen(true)}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
            >
                <Image width={16} height={16} src={'/calendar.svg'} alt='calendar icon' className='mr-[5px]' />
                <input
                    type="text"
                    value={displayValue}
                    onChange={() => { }}
                    placeholder="DD/MM/YYYY"
                    className="w-full h-full outline-none border-none text-gray-500 placeholder-gray-400 bg-transparent"
                    onFocus={() => setIsOpen(true)}
                    aria-label="Deadline date"
                    readOnly
                />
            </div>

            {isOpen && (
                <div className="absolute mt-1 bg-white border border-[#DEE2E6] rounded-[5px] shadow-lg z-10">
                    <input
                        type="date"
                        className="p-2"
                        value={currentDate} // Using currentDate instead of value
                        min={minDate}
                        onChange={handleDateChange}
                        onBlur={() => setIsOpen(false)}
                    />
                </div>
            )}

            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
}