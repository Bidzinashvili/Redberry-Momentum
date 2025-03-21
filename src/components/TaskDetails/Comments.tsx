"use client"

import { useState } from "react"
import CommentsTextArea from "./CommentsTextArea"
import CommentsGrid from "./CommentsGrid"
import { Comment } from "@/interfaces/interfaces"
import axios from "axios"
import { ParamValue } from "next/dist/server/request/params"

interface Props {
    allComments: Comment[]
    id: ParamValue;
}

export default function Comments({ allComments, id }: Props) {
    const [comment, setComment] = useState("")

    const handleSubmit = () => {
        axios.post(
            `https://momentum.redberryinternship.ge/api/tasks/${id}/comments`,
            { text: comment },
            {
                headers: {
                    Authorization: "Bearer 9e68b0cd-e37e-4a1b-a82d-a5e71bcdcf90",
                },
            }
        ).catch(err => console.log(err))

        setComment('')
    }

    const handleReply = (parentCommentId: number, replyText: string) => {
        axios.post(
            `https://momentum.redberryinternship.ge/api/tasks/${id}/comments`,
            { text: replyText, parent_id: parentCommentId },
            {
                headers: {
                    Authorization: "Bearer 9e68b0cd-e37e-4a1b-a82d-a5e71bcdcf90",
                },
            }
        ).catch(err => console.log(err))
    }


    return (
        <div className="w-[741px] bg-[rgba(248,243,254,0.65)] border-[0.3px] border-[#DDD2FF] rounded-[10px] px-[45px] py-[40px]">
            <CommentsTextArea comment={comment} setComment={setComment} handleSubmit={handleSubmit} />
            <CommentsGrid allComments={allComments} onReplySubmit={handleReply} />
        </div>
    )
}

