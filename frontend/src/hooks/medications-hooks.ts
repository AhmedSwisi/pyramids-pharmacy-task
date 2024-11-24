import { getMedications } from "@/api/medications";
import { useQuery } from "@tanstack/react-query";

export const useGetMedications = () => {
    return useQuery({
        queryKey: ["medications"], 
        queryFn: getMedications,
      });
}