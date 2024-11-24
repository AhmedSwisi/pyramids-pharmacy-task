import { useGetMedications } from "@/hooks/medications-hooks";
import { useCreateRefillRequest } from "@/hooks/refill-requests-hooks";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetMedications();
  const createRefillRequest = useCreateRefillRequest();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading medications...</p>
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

  const handleRequest = (medicationId: number) => {
    createRefillRequest.mutate(
      { medication: medicationId }, 
      {
        onSuccess: () => {
          alert("Refill request submitted successfully!");
        },
        onError: (error) => {
          const errorMessage = (error )?.response?.data || "An error occurred!";
          alert(errorMessage);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">Medications List</h1>
        {data?.length ? (
          <ul className="space-y-6">
            {data.map((medication) => (
              <li
                key={medication.id}
                className="border rounded-lg p-4 bg-gray-50 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-700">
                  {medication.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {medication.description}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Manufacturer: {medication.manufacturer_name}
                </p>
                <button
                  onClick={() => handleRequest(medication.id)}
                  disabled={createRefillRequest.isPending}
                  className={`px-4 py-2 rounded-md text-white font-medium ${
                    createRefillRequest.isPending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {createRefillRequest.isPending ? "Submitting..." : "Request Refill"}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No medications available.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
