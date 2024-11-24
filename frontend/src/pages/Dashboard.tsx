import RefillStatsBarChart from "@/charts/RefillStatsBarChart";
import RefillStatusesPieChart from "@/charts/RefillStatusesPieChart";
import { useGetRefillRequestStatistics } from "@/hooks/refill-requests-hooks";

const Dashboard = () => {
    const { data, isLoading, isError, error } = useGetRefillRequestStatistics();

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-500 text-lg">Loading dashboard data...</p>
        </div>
      );
    }
  
    if (isError) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-red-500 text-lg">{(error as Error).message}</p>
        </div>
      );
    }

    const { overall, by_medication } = data || { overall: null, by_medication: [] };
    const overallData = overall || {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
    };
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to the dashboard! Below are charts displaying refill statistics.
        </p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <h2 className="text-lg font-bold text-gray-700 mb-2">By Medication</h2>
            <RefillStatsBarChart byMedicationData={by_medication} />
          </div>
          
          <div className="col-span-1">
            <h2 className="text-lg font-bold text-gray-700 mb-2">Overall Statistics</h2>
            <RefillStatusesPieChart overallData={overallData} />
          </div>
        </div>
      </div>
    </div>
    );
  };

export default Dashboard;
