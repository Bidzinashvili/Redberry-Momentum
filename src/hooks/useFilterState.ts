import { useState } from 'react'
import { FilterItem, FilterType } from '@/components/TaskDashboard/types/types'
import { initialDepartments, initialPriorities, initialEmployees } from '@/components/TaskDashboard/data/initialData'

export function useFilterState() {
    const [openDropdown, setOpenDropdown] = useState<FilterType>(null)

    const [departments, setDepartments] = useState<FilterItem[]>(initialDepartments)
    const [priorities, setPriorities] = useState<FilterItem[]>(initialPriorities)
    const [employees, setEmployees] = useState<FilterItem[]>(initialEmployees)

    const toggleDropdown = (dropdown: FilterType) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown)
    }

    const toggleFilter = (id: number, type: FilterType) => {
        if (!type) return

        const updateState = (items: FilterItem[], setter: React.Dispatch<React.SetStateAction<FilterItem[]>>) => {
            setter(items.map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            ))
        }

        switch (type) {
            case 'department':
                updateState(departments, setDepartments)
                break
            case 'priority':
                updateState(priorities, setPriorities)
                break
            case 'employee':
                // Single-select behavior for employees
                setEmployees(employees.map(employee =>
                    employee.id === id ? { ...employee, checked: true } : { ...employee, checked: false }
                ))
                break
        }
    }

    const applyFilters = () => {
        setOpenDropdown(null)

        console.log("Selected departments:", departments.filter(d => d.checked))
        console.log("Selected priorities:", priorities.filter(p => p.checked))
        console.log("Selected employee:", employees.find(e => e.checked))
    }

    return {
        openDropdown,
        departments,
        priorities,
        employees,
        toggleDropdown,
        toggleFilter,
        applyFilters
    }
}