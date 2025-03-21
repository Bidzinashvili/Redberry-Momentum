import { Comment } from '@/interfaces/interfaces'
import Image from 'next/image'
import React, { useState } from 'react'

interface Props {
    allComments: Comment[]
    onReplySubmit?: (parentCommentId: number, replyText: string) => void
}

export default function CommentsGrid({ allComments, onReplySubmit }: Props) {
    const [replyingTo, setReplyingTo] = useState<number | null>(null)
    const [replyText, setReplyText] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleReplyClick = (commentId: number) => {
        if (replyingTo === commentId) {
            setReplyingTo(null)
        } else {
            setReplyingTo(commentId)
            setReplyText('')
        }
    }

    const handleSubmit = async (commentId: number) => {
        if (!replyText.trim() || !onReplySubmit) return

        try {
            setIsSubmitting(true)
            onReplySubmit(commentId, replyText)
            setReplyText('')
            setReplyingTo(null)
        } catch (error) {
            console.error('Failed to submit reply:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='mt-16'>
            <p className='text-xl mb-10'>კომენტარები <span className='bg-[#8338EC] text-white px-3 py-0.5 text-sm rounded-full ml-2'>{allComments.length}</span></p>

            <div className='flex flex-col gap-9'>
                {allComments.map((comment) => (
                    <div key={comment.id}>
                        <div className='flex'>
                            <img
                                src={comment.author_avatar}
                                alt='Author Avatar'
                                width={38}
                                height={38}
                                className='w-[38px] h-[38px] rounded-full'
                            />
                            <div className='ml-3'>
                                <h2 className='text-lg'>{comment.author_nickname}</h2>
                                <p className='max-w-lg font-light'>{comment.text}</p>

                                <div
                                    className='flex items-center mt-2.5 gap-1.5 cursor-pointer'
                                    onClick={() => handleReplyClick(comment.id)}
                                >
                                    <Image src='/reply.svg' alt='Reply Icon' width={16} height={16} />
                                    <p className='font-light text-xs text-[#8338EC]'>უპასუხე</p>
                                </div>

                                {replyingTo === comment.id && (
                                    <div className='mt-4 flex flex-col'>
                                        <textarea
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder='დაწერე კომენტარი...'
                                            className='resize-none outline-none p-2 border border-gray-300 rounded-md w-full min-h-[80px] max-w-lg'
                                        />
                                        <div className='flex gap-2 mt-2 self-end'>
                                            <button
                                                className='px-3 py-1 text-sm bg-gray-200 rounded-md cursor-pointer'
                                                onClick={() => setReplyingTo(null)}
                                            >
                                                გაუქმება
                                            </button>
                                            <button
                                                className='cursor-pointer px-3 py-1 text-sm bg-[#8338EC] text-white rounded-md disabled:opacity-50'
                                                onClick={() => handleSubmit(comment.id)}
                                                disabled={!replyText.trim() || isSubmitting}
                                            >
                                                {isSubmitting ? 'იგზავნება...' : 'გაგზავნა'}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {comment.sub_comments?.map(sub => (
                                    <div key={sub.id} className='flex mt-5'>
                                        <img
                                            src={sub.author_avatar}
                                            alt='Author Avatar'
                                            width={38}
                                            height={38}
                                            className='w-[38px] h-[38px] rounded-full'
                                        />
                                        <div className='ml-3'>
                                            <h2 className='text-lg'>{sub.author_nickname}</h2>
                                            <p className='max-w-lg font-light'>{sub.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}