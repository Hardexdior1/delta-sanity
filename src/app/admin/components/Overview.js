'use client'
import { useEffect, useState } from "react";
import { Users, CalendarCheck } from "lucide-react";
// import Image from "next/image";
import endpointroute from "@/app/utils/endpointroute";
import Link from "next/link";
const Overview = () => {
  const [reports, SetReports] = useState([]);
  const [loading,setLoading]=useState(true)
  const [users, setUsers] = useState([]);
console.log(users)
console.log('booking',reports)
  useEffect(() => {
    const fetchAllBookings = async () => {

      try {
      setLoading(true)

      const [reportsRes,usersRes]=await Promise.all(
        [
          endpointroute.get("reports"),
       endpointroute.get('auth/users')
       
        ]
      )
        SetReports(reportsRes.data) 
        setUsers(usersRes.data.filter((user)=>user.role!=='admin'))
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
 
  
const overviewStats = [
  {
    title: "Total Registered Commands",
    count:loading?"calculating..": users?.length,
    icon:< Users />,
  },
  {
    title: "Total Reports submitted",
    count: loading?"calculating..":reports?.length,
    icon: <CalendarCheck />,
  },
  // {
  //   title: "Total Revenue (Online)",
  //   count:loading?'loading..': "₦ "+bookings?.reduce((acc,total)=>acc+total.totalPrice,0).toLocaleString("en-US"),
  //   icon: <Wallet />,
  // },
];
  const filteredZones= users?.filter((patient) =>
    patient?.firstName||patient?.fullName?.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );
  


   const itemsPerPage=6
  
    const [currentPage,setCurrentPage]=useState(1)
  
    const startIndex=(currentPage-1)*itemsPerPage
  
    const lastIndex=startIndex+itemsPerPage
  
    const allZones=filteredZones.slice(startIndex,lastIndex)
  
    const total=Math.min(lastIndex, allZones.length)
 

// https://verse-one-backend.onrender.com/api/auth/login

 

  return (
    <main className="mt-5 lg:mt-0">
    

      
      <div className="grid grid-cols-1 items-center justify-center sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-6 mb-10">
  {overviewStats.map((stat, index) => (
    <div key={index} className="bg-white p-6 rounded-lg shadow-md border flex items-center gap-4">
      <div className="bg-blue-200 p-3 rounded-full text-blue-500">
        <span className="w-6 h-6" > {stat.icon}</span>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-500">{stat.title}</h4>
        <p className="text-2xl font-bold text-gray-800">{stat.count}</p>
      </div>
    </div>
  ))}
</div>


      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
    {/* <h3 className="text-xl font-semibold text-emerald-600">Appointments</h3> */}
        <h3 className="text-xl font-semibold text-blue-500">Commands</h3>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {users.map((zone, index) => (
        <div
          key={index}
          className="bg-white border border-black rounded-xl p-5 shadow-sm flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-bold text-blue-500">{zone.fullName}</h2>
            <p className="text-sm text-black mt-1">
              Total Reports: <span className="font-semibold">{zone.reports}</span>
            </p>
          </div>
        <Link href={`/admin/reports/${zone?._id}?name=${zone.fullName}`}>  <button className="mt-4 w-fit text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            View Details
          </button></Link>
        </div>
      ))}
    </div>
    




   


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
        {`Showing ${total} of ${users.length} bookings`}


  </h2>
  <button
    onClick={() => {
      setCurrentPage(currentPage + 1);
    }}
    disabled={total === users.length}
    className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
      total === users.length
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

export default Overview;
