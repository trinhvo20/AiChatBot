import axios from 'axios';
import React, { useEffect, useState } from 'react'
import StarRating from './StarRating';
import Skeleton from 'react-loading-skeleton'

type Props = {
    productId: number;
}
type Review = {
    id: number;
    author: string;
    content: string;
    rating: number;
    createdAt: string;
}
type GetReviewsResponse = {
    reviews: Review[];
    summary: string | null;
}

const ReviewList = ({productId }: Props) => {
    const [reviewData, setReviewData] = useState<GetReviewsResponse>();
    const [isLoading, setIsLoading] = useState(false);

    const fetchReviews = async () => {
        setIsLoading(true);
        const response = await axios.get<GetReviewsResponse>(`/api/products/${productId}/reviews`);
        setReviewData(response.data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchReviews();
    }, [])

    if (isLoading) {
        return (
            <div className='flex flex-col gap-5'>
                {[1,2,3].map((index) => (
                    <div key={index}>
                        <Skeleton width={150} />
                        <Skeleton width={100} />
                        <Skeleton count={2} />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-5'>
            {reviewData?.reviews.map((review) => (
                <div key={review.id}>
                    <div className='font-semibold'>{review.author}</div>
                    <div><StarRating rating={review.rating} /></div>
                    <p className='py-2'>{review.content}</p>
                </div>
            ))}
        </div>
    )
}

export default ReviewList