'use client'
import { Task } from '@/interfaces/interfaces'
import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import TaskGrid from './TaskGrid'
import TaskFilter from './TaskFilter'
import { X } from 'lucide-react'

interface Props {
    tasks: Task[]
}

interface FilterItem {
    type: 'departments' | 'priorities' | 'employees'
    id: number
    label: string
}

export default function TaskPage({ tasks }: Props) {
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks)
    const [activeFilters, setActiveFilters] = useState<FilterItem[]>([])
    const searchParams = useSearchParams()
    const router = useRouter()

    // Filter tasks based on search parameters
    useEffect(() => {
        filterTasksBySearchParams()
        updateActiveFilters()
    }, [searchParams, tasks])

    const filterTasksBySearchParams = () => {
        if (searchParams.size === 0) {
            return setFilteredTasks(tasks)
        }

        const departmentIds = searchParams.get('departments')?.split(',').map(Number) || []
        const priorityIds = searchParams.get('priorities')?.split(',').map(Number) || []
        const employeeIds = searchParams.get('employees')?.split(',').map(Number) || []

        const filtered = tasks.filter(task => {
            const matchesDepartment = departmentIds.length === 0 || departmentIds.includes(task.department.id)
            const matchesPriority = priorityIds.length === 0 || priorityIds.includes(task.priority.id)
            const matchesEmployee = employeeIds.length === 0 || employeeIds.includes(task.employee.id)

            return matchesDepartment && matchesPriority && matchesEmployee
        })

        setFilteredTasks(filtered)
    }

    const updateActiveFilters = () => {
        const newActiveFilters: FilterItem[] = []

        // Add department filters
        const departmentIds = searchParams.get('departments')?.split(',').map(Number) || []
        departmentIds.forEach(id => {
            const department = tasks.find(task => task.department.id === id)?.department
            if (department) {
                newActiveFilters.push({
                    type: 'departments',
                    id: department.id,
                    label: department.name
                })
            }
        })

        // Add priority filters
        const priorityIds = searchParams.get('priorities')?.split(',').map(Number) || []
        priorityIds.forEach(id => {
            const priority = tasks.find(task => task.priority.id === id)?.priority
            if (priority) {
                newActiveFilters.push({
                    type: 'priorities',
                    id: priority.id,
                    label: priority.name
                })
            }
        })

        // Add employee filters
        const employeeIds = searchParams.get('employees')?.split(',').map(Number) || []
        employeeIds.forEach(id => {
            const employee = tasks.find(task => task.employee.id === id)?.employee
            if (employee) {
                newActiveFilters.push({
                    type: 'employees',
                    id: employee.id,
                    label: `${employee.name} ${employee.surname}`
                })
            }
        })

        setActiveFilters(newActiveFilters)
    }

    const removeFilter = (filterToRemove: FilterItem) => {
        const params = new URLSearchParams(searchParams.toString())
        const currentIds = params.get(filterToRemove.type)?.split(',').map(Number) || []

        // Remove the selected filter ID
        const updatedIds = currentIds.filter(id => id !== filterToRemove.id)

        if (updatedIds.length > 0) {
            params.set(filterToRemove.type, updatedIds.join(','))
        } else {
            params.delete(filterToRemove.type)
        }

        router.push(`?${params.toString()}`, { scroll: false })
    }

    const clearAllFilters = () => {
        router.push('/', { scroll: false })
    }

    return (
        <div className="px-[120px] pt-[40px]">
            <h1 className="text-[34px] font-semibold text-[#212529]">დავალებების გვერდი</h1>
            <div className='w-[688px]'>
                <TaskFilter />

                {activeFilters.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        {activeFilters.map((filter) => (
                            <div
                                key={`${filter.type}-${filter.id}`}
                                className="flex items-center bg-white text-[#343A40] border border-[#CED4DA] font-light rounded-[43px] px-[10px] py-[6px] text-sm"
                            >
                                <span>{filter.label}</span>
                                <button
                                    onClick={() => removeFilter(filter)}
                                    className="ml-[7.5px] text-[#343A40]"
                                >
                                    <X className='w-[14px] h-[14px] cursor-pointer' />
                                </button>
                            </div>
                        ))}

                        <button
                            onClick={clearAllFilters}
                            className="ml-2 text-[#343A40] text-[14px] font-light cursor-pointer"
                        >
                            გასუფთავება
                        </button>
                    </div>
                )}
            </div>
            <div>
                <TaskGrid tasks={filteredTasks} />
            </div>
        </div>
    )
}