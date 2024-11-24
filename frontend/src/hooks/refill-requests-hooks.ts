import { createRefillRequest, getRefillRequestStatistics } from "@/api/refill-requests";
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query"
import { RefillRequestForm } from "@/api/refill-requests";
import { AxiosError } from "axios";



export const useCreateRefillRequest = (): UseMutationResult<unknown, AxiosError, RefillRequestForm, unknown>=> {
    return useMutation({
        mutationFn:(request:RefillRequestForm) => createRefillRequest(request),
        onSuccess:(data) => {
            console.log('Request submitted successfully',data)
        },
        onError: (error) => {
            console.error('Request could not be completed',error)
        }
    })
}

export const useGetRefillRequestStatistics = () => {
    return useQuery({
        queryKey: ["refill-request-statistics"], 
        queryFn: getRefillRequestStatistics
      });
}

