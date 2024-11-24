import axios from "axios";
import { axiosRouter } from "./auth";

interface Medications {
    id:number
    name:string
    description:string
    manufacturer_id:number
    manufacturer_name:string
}

export const getMedications = async ():Promise<Medications[]> => {
    try {
        const response = await axiosRouter.get('medications/')
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