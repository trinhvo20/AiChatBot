import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa';

type Props = {
    rating: number; 
}
const StarRating = ({rating}: Props) => {
    const placeHolders = [1,2,3,4,5];

    return (
        <div className='flex gap-1 text-yellow-500'>
            {placeHolders.map((placeHolder) => (
                placeHolder <= rating ? <FaStar key={placeHolder} /> : <FaRegStar key={placeHolder}/>
            ))}
        </div>
    )
}

export default StarRating