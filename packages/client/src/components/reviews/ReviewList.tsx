import axios from 'axios';
import React, { useEffect, useState } from 'react'
import StarRating from './StarRating';
import Skeleton from 'react-loading-skeleton'
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { HiSparkles } from 'react-icons/hi2';
import ReviewSkeleton from './ReviewSkeleton';
import { set } from 'react-hook-form';

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
    const [summary, setSummary] = useState('');
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [summaryError, setSummaryError] = useState('');
    
    const { data: reviewData, isLoading, error } = useQuery<GetReviewsResponse>({
        queryKey: ['reviews', productId],
        queryFn: () => fetchReviews(),
    })
    
    const currentSummary = reviewData?.summary || summary;

    const fetchReviews = async () => {
        const response = await axios.get<GetReviewsResponse>(`/api/products/${productId}/reviews`);
        return response.data;
    }
    
    const handleSummrize = async () => {
        try {
            setIsSummarizing(true);
            setSummaryError('');
            const response = await axios.post<GetSummaryResponse>(`/api/products/${productId}/reviews/summarize`);
            setSummary(response.data.summary);
        } catch (error) {
            setSummaryError("Could not summarize reviews");
        }
        finally {
            setIsSummarizing(false);
        }
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
                        <Button onClick={handleSummrize} className='cursor-pointer' disabled={isSummarizing}>
                            <HiSparkles/>
                            Summary
                        </Button>
                        {isSummarizing && 
                            <div className='py-3'><ReviewSkeleton /></div>
                        }
                    </div>
                )}
                {summaryError && <p className='text-red-500'>{summaryError}</p>}
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