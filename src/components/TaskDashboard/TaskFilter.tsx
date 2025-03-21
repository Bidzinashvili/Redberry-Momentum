"use client"

import FilterButton from "./FilterButton"
import FilterDropdown from "./FilterDropdown"
import { useFilter } from "@/hooks/useFilter";

export default function TaskFilter() {
    const {
        dropdownOpen,
        setDropdownOpen,
        items,
        handleSelect,
        applyFilters
    } = useFilter();

    return (
        <div className="mt-[52px] relative">
            <div className="border border-[#DEE2E6] bg-white rounded-[10px] flex justify-between items-center">
                <FilterButton
                    label="დეპარტამენტი"
                    dropdownOpen={dropdownOpen}
                    setDropdownOpen={setDropdownOpen}
                />

                <FilterButton
                    label="პრიორიტეტი"
                    dropdownOpen={dropdownOpen}
                    setDropdownOpen={setDropdownOpen}
                />

                <FilterButton
                    label="თანამშრომელი"
                    dropdownOpen={dropdownOpen}
                    setDropdownOpen={setDropdownOpen}
                />
            </div>

            {dropdownOpen && (
                <FilterDropdown
                    items={items}
                    filterType={dropdownOpen}
                    handleSelect={handleSelect}
                    applyFilters={applyFilters}
                />
            )}
        </div>
    )
}