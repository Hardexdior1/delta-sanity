'use client'
import { useEffect, useState } from "react";
import { Users, CalendarCheck } from "lucide-react";
// import Image from "next/image";
import Link from "next/link";
import endpointroute from "@/app/utils/endpointroute";
const Page= () => {
  const [reports, SetReports] = useState([]);
  const [loading,setLoading]=useState(true)

console.log('booking',reports)
  useEffect(() => {
    const fetchAllBookings = async () => {

      try {
      setLoading(true)

      const [reportsRes]=await Promise.all(
        [
          endpointroute.get("reports"),
       
        ]
      )
        SetReports(reportsRes.data) 
      } catch (error) {
        console.log("Error fetching bookings:", error);
        setLoading(false)
      }
      finally{
        setLoading(false)
      }
    };


    fetchAllBookings();
   
  }, []);
// http://localhost:5001/api/reports/user/68547d5e51ccbcea25e8e041
  const [searchTerm,setSearchTerm]=useState('')
 
  

  const filteredZones= reports
//   .filter((patient) =>
//     patient?.firstName||patient?.fullName?.toLowerCase().includes(searchTerm.trim().toLowerCase())
//   );
  


   const itemsPerPage=6
  
    const [currentPage,setCurrentPage]=useState(1)
  
    const startIndex=(currentPage-1)*itemsPerPage
  
    const lastIndex=startIndex+itemsPerPage
  
    const allZones=filteredZones.slice(startIndex,lastIndex)
  
    const total=Math.min(lastIndex, allZones.length)
 

// https://verse-one-backend.onrender.com/api/auth/login

 

  return (
    <main className="mt-5 lg:mt-0">
    



      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
    {/* <h3 className="text-xl font-semibold text-emerald-600">Appointments</h3> */}
        <h3 className="text-xl font-semibold text-blue-500">ALl reports submitted {reports?.length}</h3>
    




   


</div>



<div className="flex flex-col items-center justify-center gap-5 mb-5 py-5 md:flex-row">
  <button
    onClick={() => {
      setCurrentPage(currentPage - 1);
    }}
    disabled={currentPage === 1}
    className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
      currentPage === 1
        ? 'bg-white text-gray-400 border border-gray-300 cursor-not-allowed'
        : 'bg-white text-[#207dff] border border-emerald-600 hover:bg-emerald-600 hover:text-white'
    }`}
  >
    Prev
  </button>

  <h2 className="text-lg font-semibold text-gray-700">
        {`Showing ${total} of ${reports.length} reports`}


  </h2>
  <button
    onClick={() => {
      setCurrentPage(currentPage + 1);
    }}
    disabled={total === reports.length}
    className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
      total === reports.length
        ? 'bg-white text-gray-400 border border-gray-300 cursor-not-allowed'
        : 'bg-white text-emerald-600 border border-emerald-600 hover:bg-emerald-600 hover:text-white'
    }`}
  >
    Next
  </button>
  
</div>

<div>

</div>


    </main>
  );
};

export default Page;
