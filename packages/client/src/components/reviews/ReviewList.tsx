import axios from 'axios';
import React, { useEffect, useState } from 'react'
import StarRating from './StarRating';
import Skeleton from 'react-loading-skeleton'
import { useQuery } from '@tanstack/react-query';

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

    const { data: reviewData, isLoading, error } = useQuery<GetReviewsResponse>({
        queryKey: ['reviews', productId],
        queryFn: () => fetchReviews(),
    })

    const fetchReviews = async () => {
        const response = await axios.get<GetReviewsResponse>(`/api/products/${productId}/reviews`);
        return response.data;
    }

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

    if (error) {
        return <div className='text-red-500'>Could not load reviews: {error.message}</div>
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