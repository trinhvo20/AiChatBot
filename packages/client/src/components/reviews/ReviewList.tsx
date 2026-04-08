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
    const { data: reviewData, isLoading, error } = useQuery<GetReviewsResponse>({
        queryKey: ['reviews', productId],
        queryFn: () => fetchReviews(),
    })
    
    // useMutation = to post data
    const { 
        mutate: handleSummarize, 
        isPending: isSummarizing, 
        error: summaryError, 
        data: summarizeResponse 
    } = useMutation<GetSummaryResponse>({
        mutationFn: () => summarizeReviews(),

    })

    const currentSummary = reviewData?.summary || summarizeResponse?.summary;

    const fetchReviews = async () => {
        const response = await axios.get<GetReviewsResponse>(`/api/products/${productId}/reviews`);
        return response.data;
    }
    
    const summarizeReviews = async () => {
        const response = await axios.post<GetSummaryResponse>(`/api/products/${productId}/reviews/summarize`);
        return response.data;
    }

    if (!reviewData?.reviews.length) {
        return null;
    }

    if (isLoading) {
        return (
            <div className='flex flex-col gap-5'>
                {[1,2,3].map((index) => (
                    <ReviewSkeleton key={index} />
                ))}
            </div>
        )
    }

    if (error) {
        return <div className='text-red-500'>Could not load reviews: {error.message}</div>
    }

    return (
        <div>
            <div className='mb-5'>
                {currentSummary ? (
                    <p>{currentSummary}</p>
                ): (
                    <div>
                        <Button onClick={() => handleSummarize()} className='cursor-pointer' disabled={isSummarizing}>
                            <HiSparkles/>
                            Summary
                        </Button>
                        {isSummarizing && 
                            <div className='py-3'><ReviewSkeleton /></div>
                        }
                    </div>
                )}
                {summaryError && <p className='text-red-500'>{summaryError.message}</p>}
            </div>

            <div className='flex flex-col gap-5'>
                {reviewData?.reviews.map((review) => (
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