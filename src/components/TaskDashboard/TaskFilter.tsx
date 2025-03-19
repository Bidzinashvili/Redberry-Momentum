"use client"

import { useFilterState } from "@/hooks/useFilterState"
import FilterButton from "./FilterButton"
import FilterDropdown from "./FilterDropdown"
import { FilterType } from "./types/types"

export default function TaskFilter() {
    const {
        openDropdown,
        departments,
        priorities,
        employees,
        toggleDropdown,
        toggleFilter,
        applyFilters
    } = useFilterState()

    const getFilterItems = (type: FilterType) => {
        switch (type) {
            case 'department': return departments
            case 'priority': return priorities
            case 'employee': return employees
            default: return []
        }
    }

    return (
        <div className="mt-[52px] relative">
            <div className="border border-[#DEE2E6] bg-white rounded-[10px] flex justify-between items-center">
                <FilterButton
                    label="დეპარტამენტი"
                    isActive={openDropdown === 'department'}
                    onClick={() => toggleDropdown('department')}
                />

                <FilterButton
                    label="პრიორიტეტი"
                    isActive={openDropdown === 'priority'}
                    onClick={() => toggleDropdown('priority')}
                />

                <FilterButton
                    label="თანამშრომელი"
                    isActive={openDropdown === 'employee'}
                    onClick={() => toggleDropdown('employee')}
                />
            </div>

            {openDropdown && (
                <FilterDropdown
                    items={getFilterItems(openDropdown)}
                    filterType={openDropdown}
                    toggleFilter={toggleFilter}
                    applyFilters={applyFilters}
                />
            )}
        </div>
    )
}