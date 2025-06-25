// 'use client'
// import { useEffect, useState } from "react";
// import { Users, CalendarCheck } from "lucide-react";
// // import Image from "next/image";
// import endpointroute from "@/app/utils/endpointroute";
// import Link from "next/link";
// const Overview = () => {
//   const [reports, SetReports] = useState([]);
//   const [loading,setLoading]=useState(true)
//   const [users, setUsers] = useState([]);
//   useEffect(() => {
//     const fetchAllBookings = async () => {

//       try {
//       setLoading(true)

//       const [reportsRes,usersRes]=await Promise.all(
//         [
//           endpointroute.get("reports"),
//        endpointroute.get('auth/users')
       
//         ]
//       )
//         SetReports(reportsRes.data) 
//         setUsers(usersRes.data.filter((user)=>user.role!=='admin'))
//       } catch (error) {
//         console.log("Error fetching bookings:", error);
//         setLoading(false)
//       }
//       finally{
//         setLoading(false)
//       }
//     };


//     fetchAllBookings();
   
//   }, []);
// // http://localhost:5001/api/reports/user/68547d5e51ccbcea25e8e041
//   const [searchTerm]=useState('')
//  const [newEmail,setNewEmail]=useState("")
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMsg('');

//     if (!fullName.trim() || !email.trim()) {
//       setError('All fields are required.');
//       return;
//     }
// // [09:40, 6/23/2025] Zoromania: http://localhost:5001/api/
// // [09:42, 6/23/2025] Zoromania: {
// //   "newEmail": "yfagbanidiocese@gmail.com"
// // }
//     try {
//       setLoading(true);
//     let res = await endpointroute.post(`user/admin-edit/${id}`, {
//        newEmail
//       });
// console.log(res)
//       setSuccessMsg('✅ Zone created successfully!');
     
//       setNewEmail('');
//     } catch (err) {
//       console.error(err);
//       setError('❌ Failed to create zone. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
// const overviewStats = [
//   {
//     title: "Total Registered Commands",
//     count:loading?"calculating..": users?.length,
//     icon:< Users />,
//   },
//   {
//     title: "Total Reports submitted",
//     count: loading?"calculating..":reports?.length,
//     icon: <CalendarCheck />,
//   },
//   // {
//   //   title: "Total Revenue (Online)",
//   //   count:loading?'loading..': "₦ "+bookings?.reduce((acc,total)=>acc+total.totalPrice,0).toLocaleString("en-US"),
//   //   icon: <Wallet />,
//   // },
// ];
//   const filteredZones= users?.filter((patient) =>
//     patient?.firstName||patient?.fullName?.toLowerCase().includes(searchTerm.trim().toLowerCase())
//   );
  


//    const itemsPerPage=6
  
//     const [currentPage,setCurrentPage]=useState(1)
  
//     const startIndex=(currentPage-1)*itemsPerPage
  
//     const lastIndex=startIndex+itemsPerPage
  
//     const allZones=filteredZones.slice(startIndex,lastIndex)
  
//     const total=Math.min(lastIndex, allZones.length)
 

// // https://verse-one-backend.onrender.com/api/auth/login

 

//   return (
//     <main className="mt-5 lg:mt-0">
    

      
//       <div className="grid grid-cols-1 items-center justify-center sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-6 mb-10">
//   {overviewStats.map((stat, index) => (
//     <div key={index} className="bg-white p-6 rounded-lg shadow-md border flex items-center gap-4">
//       <div className="bg-blue-200 p-3 rounded-full text-blue-500">
//         <span className="w-6 h-6" > {stat.icon}</span>
//       </div>
//       <div>
//         <h4 className="text-sm font-medium text-gray-500">{stat.title}</h4>
//         <p className="text-2xl font-bold text-gray-800">{stat.count}</p>
//       </div>
//     </div>
//   ))}
// </div>


//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//     {/* <h3 className="text-xl font-semibold text-emerald-600">Appointments</h3> */}
//         <h3 className="text-xl font-semibold text-blue-500">Commands</h3>

//       <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//       {allZones.map((zone, index) => (
//         <div
//           key={index}
//           className="bg-white border border-black rounded-xl p-5 shadow-sm flex flex-col justify-between"
//         >
//           <div>
//             <h2 className="text-lg font-bold text-blue-500">{zone.fullName}</h2>
//             {/* <p className="text-sm text-black mt-1">
//               Total Reports: <span className="font-semibold">{zone.reports}</span>
//             </p> */}
//           </div>
//         <Link href={`/admin/reports/${zone?._id}?name=${zone.fullName}`}>  <button className="mt-4 w-fit text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
//             View Details
//           </button></Link>

//           <button className="mt-4 w-fit text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
//            Edit Profile
//           </button>
//         </div>
//       ))}
//     </div>
    




   


// </div>



// <div className="flex flex-col items-center justify-center gap-5 mb-5 py-5 md:flex-row">
//   <button
//     onClick={() => {
//       setCurrentPage(currentPage - 1);
//     }}
//     disabled={currentPage === 1}
//     className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
//       currentPage === 1
//         ? 'bg-white text-gray-400 border border-gray-300 cursor-not-allowed'
//         : 'bg-white text-[#207dff] border border-emerald-600 hover:bg-emerald-600 hover:text-white'
//     }`}
//   >
//     Prev
//   </button>

//   <h2 className="text-lg font-semibold text-gray-700">
//         {`Showing ${total} of ${users.length} commands`}


//   </h2>
//   <button
//     onClick={() => {
//       setCurrentPage(currentPage + 1);
//     }}
//     disabled={total === users.length}
//     className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
//       total === users.length
//         ? 'bg-white text-gray-400 border border-gray-300 cursor-not-allowed'
//         : 'bg-white text-emerald-600 border border-emerald-600 hover:bg-emerald-600 hover:text-white'
//     }`}
//   >
//     Next
//   </button>
  
// </div>

// <div>

// </div>


//     </main>
//   );
// };

// export default Overview;

'use client'
import { useEffect, useState } from "react";
import { Users, CalendarCheck } from "lucide-react";
import endpointroute from "@/app/utils/endpointroute";
import Link from "next/link";

const Overview = () => {
  const [reports, SetReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  console.log('omo',selectedUser)
  const [newEmail, setNewEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        setLoading(true);
        const [reportsRes, usersRes] = await Promise.all([
          endpointroute.get("reports"),
          endpointroute.get("auth/users"),
        ]);
        SetReports(reportsRes.data);
        setUsers(usersRes.data.filter((user) => user.role !== "admin"));
      } catch (error) {
        console.log("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllBookings();
  }, []);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!newEmail.trim()) {
      setError("Email is required");
      return;
    }
    try {
      setLoading(true);
      await endpointroute.put(`user/admin-edit/${selectedUser._id}`, {
        newEmail,
      });
      setSuccessMsg("✅ Email updated successfully");
      setShowEditModal(false);
      setNewEmail("");
    } catch (err) {
      console.error(err);
      setError("❌ Failed to update email. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const overviewStats = [
    {
      title: "Total Registered Commands",
      count: loading ? "calculating.." : users?.length,
      icon: <Users />,
    },
    {
      title: "Total Reports submitted",
      count: loading ? "calculating.." : reports?.length,
      icon: <CalendarCheck />,
    },
  ];

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = startIndex + itemsPerPage;
  const filteredZones = users;
  const allZones = filteredZones.slice(startIndex, lastIndex);
  const total = Math.min(lastIndex, filteredZones.length);

  return (
    <main className="mt-5 lg:mt-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-10">
        {overviewStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border flex items-center gap-4">
            <div className="bg-blue-200 p-3 rounded-full text-blue-500">{stat.icon}</div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">{stat.title}</h4>
              <p className="text-2xl font-bold text-gray-800">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-blue-500">Commands</h3>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {allZones.map((zone, index) => (
            <div key={index} className="bg-white border border-black rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-bold text-blue-500">{zone.fullName}</h2>
              <Link href={`/admin/reports/${zone._id}?name=${zone.fullName}`}>
                <button className="mt-4 text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View Details</button>
              </Link>
              <button
                onClick={() => {
                  setSelectedUser(zone);
                  setShowEditModal(true);
                }}
                className="mt-2 text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Edit Profile
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-5 mb-6">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 border rounded-md">
          Prev
        </button>
        <h2 className="text-lg font-semibold">Showing {total} of {users.length} commands</h2>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={total === users.length} className="px-4 py-2 border rounded-md">
          Next
        </button>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Email for {selectedUser.fullName}</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter new email"
                required
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                {loading ? 'Updating...' : 'Update Email'}
              </button>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="ml-2 text-sm text-gray-500 hover:text-black"
              >
                Cancel
              </button>
            </form>
            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
            {successMsg && <p className="text-sm text-green-600 mt-2">{successMsg}</p>}
          </div>
        </div>
      )}
    </main>
  );
};

export default Overview;
