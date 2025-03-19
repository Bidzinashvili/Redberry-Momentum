import { useState, useEffect } from 'react'
import axios from 'axios'
import { FilterItem, FilterType } from '@/components/TaskDashboard/types/types'

const API_URLS = {
    departments: 'https://momentum.redberryinternship.ge/api/departments',
    employees: 'https://momentum.redberryinternship.ge/api/employees',
    priorities: 'https://momentum.redberryinternship.ge/api/priorities'
}

const AUTH_TOKEN = '9e68b0cd-e37e-4a1b-a82d-a5e71bcdcf90'

export function useFilterState() {
    const [openDropdown, setOpenDropdown] = useState<FilterType>(null)

    const [departments, setDepartments] = useState<FilterItem[]>([])
    const [priorities, setPriorities] = useState<FilterItem[]>([])
    const [employees, setEmployees] = useState<FilterItem[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            setError(null)

            try {
                const deptRequest = axios.get(API_URLS.departments)

                const empRequest = axios.get(API_URLS.employees, {
                    headers: {
                        Authorization: `Bearer ${AUTH_TOKEN}`
                    }
                })

                const prioRequest = axios.get(API_URLS.priorities)

                const [deptResponse, empResponse, prioResponse] = await Promise.all([
                    deptRequest,
                    empRequest,
                    prioRequest
                ])

                setDepartments(deptResponse.data.map((dept: any) => ({
                    id: dept.id,
                    name: dept.name,
                    checked: false
                })))

                setEmployees(empResponse.data.map((emp: any) => ({
                    id: emp.id,
                    name: `${emp.name} ${emp.surname}`,
                    avatar: emp.avatar || emp.profile_image || emp.image || null,
                    checked: false
                })))

                setPriorities(prioResponse.data.map((prio: any) => ({
                    id: prio.id,
                    name: prio.name,
                    checked: false
                })))
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(`API Error: ${err.response?.status} - ${err.message}`)
                } else {
                    setError('An unknown error occurred')
                }
                console.error('Error fetching filter data:', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

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
        isLoading,
        error,
        toggleDropdown,
        toggleFilter,
        applyFilters
    }
}