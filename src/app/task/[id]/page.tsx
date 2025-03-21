'use client'
import Comments from '@/components/TaskDetails/Comments'
import Details from '@/components/TaskDetails/Details'
import { Comment, Status, Task } from '@/interfaces/interfaces'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'



export default function Page() {
    const { id } = useParams()

    const [task, setTask] = useState<Task | null>(null)
    const [loading, setLoading] = useState(true)
    const [allComments, setAllComments] = useState<Comment[]>([])

    useEffect(() => {
        axios.get(`https://momentum.redberryinternship.ge/api/tasks/${id}`, { headers: { Authorization: 'Bearer 9e68b0cd-e37e-4a1b-a82d-a5e71bcdcf90' } })
            .then((res) => {
                setTask(res.data)
                setLoading(false)
            })
            .catch((err) => setLoading(false))

        axios.get(`https://momentum.redberryinternship.ge/api/tasks/${id}/comments`, { headers: { Authorization: 'Bearer 9e68b0cd-e37e-4a1b-a82d-a5e71bcdcf90' } })
            .then((res) => {
                setAllComments(res.data)
                setLoading(false)
            })
            .catch((err) => setLoading(false))
    }, [id])



    if (loading) {
        return <div className='px-[120px] py-[40px]'>იტვირთება...</div>
    }

    if (!task) {
        return <div className='px-[120px] py-[40px]'>ვერ მოიძებნა თასქი</div>
    }

    return (
        <div className='px-[120px] py-[40px] flex items-start justify-between'>
            <Details task={task} id={id} />
            <Comments allComments={allComments} id={id} />
        </div>
    )
}