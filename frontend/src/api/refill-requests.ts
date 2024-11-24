import axios from "axios";
import { axiosRouter } from "./auth";

export interface RefillRequestForm {
    medication:number
}

export interface OverallRefillStatistics {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
}

export interface MedicationRefillStatistics {
    medication_name: string;
    total: number;
    pending: number;
    approved: number;
    rejected: number;
}

export interface RefillRequestStatisticsResponse {
    overall: OverallRefillStatistics;
    by_medication: MedicationRefillStatistics[];
}

export const createRefillRequest = async (request:RefillRequestForm) => {
    try {
        const response = await axiosRouter.post('refill-requests/',request,{
            withCredentials: true, // Include cookies in the request
          })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message);
            throw error; 
        } else {
            console.error("Unknown error:", error);
            throw new Error("An unexpected error occurred");
        }
    }
}

export const getRefillRequestStatistics = async ():Promise<RefillRequestStatisticsResponse> => {
    try {
        const response = await axiosRouter.get('refill-requests/statistics/')
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message);
            throw error; 
        } else {
            console.error("Unknown error:", error);
            throw new Error("An unexpected error occurred");
        }
    }
}