import React from 'react'

interface Props {
    status: 'დასაწყები' | 'პროგრესში' | 'მზად ტესტირებისთვის' | 'დასრულებული'
}

export default function TaskStatusBadge({ status }: Props) {
    const statusColors = {
        'დასაწყები': '#F7BC30',
        'პროგრესში': '#FB5607',
        'მზად ტესტირებისთვის': '#FF006E',
        'დასრულებული': '#3A86FF'
    }

    const getColor = () => {
        return statusColors[status]
    }

    return (
        <div style={{ backgroundColor: getColor() }} className='text-white w-full py-[15px] text-[20px] font-medium text-center rounded-[10px]'>{status}</div>
    )
}
