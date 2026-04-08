import axios from "axios";

export type Review = {
    id: number;
    author: string;
    content: string;
    rating: number;
    createdAt: string;
}
export type GetReviewsResponse = {
    reviews: Review[];
    summary: string | null;
}
export type GetSummaryResponse = {
    summary: string;
}

export const reviewApi = {
    async fetchReviews (productId: number) {
        const response = await axios.get<GetReviewsResponse>(`/api/products/${productId}/reviews`);
        return response.data;
    },
    
    async summarizeReviews(productId: number) {
        const response = await axios.post<GetSummaryResponse>(`/api/products/${productId}/reviews/summarize`);
        return response.data;
    }
}
