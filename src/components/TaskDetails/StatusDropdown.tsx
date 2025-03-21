'use client'

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Status } from "@/interfaces/interfaces";
import axios from "axios";

interface StatusDropdownProps {
    onChange?: (value: Status) => void;
    className?: string;
    defaultStatus: Status;
}

export default function StatusDropdown({
    defaultStatus,
    onChange,
    className,
}: StatusDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Status>(defaultStatus);
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState<Status[] | null>(null);

    const handleSelect = (option: Status) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange?.(option);
    };

    useEffect(() => {
        axios.get('https://momentum.redberryinternship.ge/api/statuses')
            .then((res) => {
                setOptions(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>იტვირთება...</div>;
    }

    if (!options) {
        return <div>სტატუსები არ მოიძებნა</div>;
    }

    return (
        <div className="relative w-[259px]">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-[14px] text-left text-base focus:outline-none focus:ring-2 focus:ring-gray-200 ${className || ""} cursor-pointer`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="font-light text-[14px]">{selectedOption.name}</span>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
                    <ul className="py-1" role="listbox" aria-labelledby="dropdown-button">
                        {options.map((option) => (
                            <li
                                key={option.id}
                                role="option"
                                aria-selected={selectedOption.id === option.id}
                                onClick={() => handleSelect(option)}
                                className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${selectedOption.id === option.id ? "bg-gray-50" : ""}`}
                            >
                                {option.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
