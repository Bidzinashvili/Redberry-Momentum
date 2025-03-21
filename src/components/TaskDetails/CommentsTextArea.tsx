import React from 'react'

interface Props {
    comment: string;
    setComment: React.Dispatch<React.SetStateAction<string>>
    handleSubmit: () => void
}

export default function CommentsTextArea({ comment, setComment, handleSubmit }: Props) {
    return (
        <div className="relative w-full bg-white rounded-[10px] border border-[#E6E6E6] px-[20px] py-[18px]">
            <textarea
                className="w-full h-[135px] resize-none outline-none text-[#666] placeholder:text-[#ACACAC]"
                placeholder="დაწერე კომენტარი"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <div className="absolute bottom-[15px] right-[20px]">
                <button
                    className="bg-[#8338EC] text-white rounded-[20px] px-[18.5px] py-2 cursor-pointer"
                    onClick={handleSubmit}
                >
                    დააკომენტარე
                </button>
            </div>
        </div>
    )
}
