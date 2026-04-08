import axios from 'axios';
import React, { useEffect, useState } from 'react'
import StarRating from './StarRating';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { HiSparkles } from 'react-icons/hi2';
import ReviewSkeleton from './ReviewSkeleton';

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
type GetSummaryResponse = {
    summary: string;
}


const ReviewList = ({productId }: Props) => {
    
    // useQuery = to get data
    const reviewQuery = useQuery<GetReviewsResponse>({
        queryKey: ['reviews', productId],
        queryFn: () => fetchReviews(),
    })
    
    // useMutation = to post data
    const summaryMutation = useMutation<GetSummaryResponse>({
        mutationFn: () => summarizeReviews(),

    })

    const currentSummary = reviewQuery.data?.summary || summaryMutation.data?.summary;

    const fetchReviews = async () => {
        const response = await axios.get<GetReviewsResponse>(`/api/products/${productId}/reviews`);
        return response.data;
    }
    
    const summarizeReviews = async () => {
        const response = await axios.post<GetSummaryResponse>(`/api/products/${productId}/reviews/summarize`);
        return response.data;
    }

    if (!reviewQuery.data?.reviews.length) {
        return null;
    }

    if (reviewQuery.isLoading) {
        return (
            <div className='flex flex-col gap-5'>
                {[1,2,3].map((index) => (
                    <ReviewSkeleton key={index} />
                ))}
            </div>
        )
    }

    if (reviewQuery.isError) {
        return <div className='text-red-500'>Could not load reviews: {reviewQuery.error.message}</div>
    }

    return (
        <div>
            <div className='mb-5'>
                {currentSummary ? (
                    <p>{currentSummary}</p>
                ): (
                    <div>
                        <Button onClick={() => summaryMutation.mutate()} className='cursor-pointer' disabled={summaryMutation.isPending}>
                            <HiSparkles/>
                            Summary
                        </Button>
                        {summaryMutation.isPending && 
                            <div className='py-3'><ReviewSkeleton /></div>
                        }
                    </div>
                )}
                {summaryMutation.isError && <p className='text-red-500'>{summaryMutation.error.message}</p>}
            </div>

            <div className='flex flex-col gap-5'>
                {reviewQuery.data?.reviews.map((review) => (
                    <div key={review.id}>
                        <div className='font-semibold'>{review.author}</div>
                        <div><StarRating rating={review.rating} /></div>
                        <p className='py-2'>{review.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReviewList