
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import endpointroute from '../../utils/endpointroute';
import EditRoomModal from "./components/Modal"; 
// import ConfirmDeleteModal from "./components/DeleteModal"; 
import { ToastContainer,toast } from "react-toastify";
export default function RoomsList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const res = await endpointroute.get("rooms");
        setRooms(res.data);
        console.log(res.data)
      } catch (err) {
        console.log("Error fetching rooms:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);
const [id,setId]=useState()
  const handleEditClick = (room) => {
    setSelectedRoom(room);
    setId(room.id)
    setIsEditModalOpen(true);
  };

  

 
   const itemsPerPage=6
  
    const [currentPage,setCurrentPage]=useState(1)
  
    const startIndex=(currentPage-1)*itemsPerPage
  
    const lastIndex=startIndex+itemsPerPage
  
    const allRooms=rooms.slice(startIndex,lastIndex)
  
    const total=Math.min(lastIndex,rooms.length)
 const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return (
    <main className="">
      <h3 className="text-xl font-semibold text-blue-600 mb-4">All Reports</h3>
<ToastContainer />
      {loading ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         
   { Array(3).fill(0).map((_, index) => (
      <div key={index} className="bg-white p-4 rounded-lg shadow-lg border animate-pulse">
        <div className="w-full h-40 bg-gray-300 rounded-md mb-4 md:h-50"></div>
        <div className="h-6 bg-gray-300 rounded-md w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded-md w-full mb-3"></div>
        <div className="flex items-center justify-between mt-4">
          <div className="h-6 bg-gray-300 rounded-md w-24"></div>
          <div className="bg-gray-300 text-white px-4 py-2 rounded-md w-20 h-10"></div>
        </div>
      </div>
    ))}
    
        </div> 
      : (
       <div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allRooms.map(room => (
            <div key={room._id} className="bg-white rounded-lg shadow-md p-4 h-fit">
             
                {room.images && room.images[0] ? (
                <Image
                  src={room.images[0]}
                  alt={room.name}
                  width={400} // Keep width for consistent sizing if `next/image` requires it
                  height={500} // Keep height for consistent sizing if `next/image` requires it
                  className="w-full  object-cover rounded-md mb-2 max-h-[300px]"
                />
              ) : (
                <div
                  className="w-full mb-2 h-[300px] rounded-md  bg-gray-200 flex items-center justify-center text-gray-500" // Added bg-gray-200 for visual placeholder
                  style={{ lineHeight: 0 }} // Optional: Helps with text vertical alignment in some cases
                >
                  No Image Available
                </div>
              )}
              <h5 className="font-bold text-lg md:text-sm">submitted on { formatDate(room.createdAt) }</h5>
              <p className="text-sm text-gray-600">{room.description.length>100?`${room.description.substring(0,100)||'No description'}...`:room.description||'No description'}</p>
              <div className=" mt-4">
                <button
                  className="py-3 bg-blue-700 text-white rounded w-full font-semibold text-sm border-b-2 transition-all md:text-base"
                  onClick={() => handleEditClick(room)}
                >
                 View Details
                </button>
               
              </div>
            </div>
          ))}
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
        : 'bg-white text-[#207dff] border border-[#207dff] hover:bg-[#207dff] hover:text-white'
    }`}
  >
    Prev
  </button>

  <h2 className="text-lg font-semibold text-gray-700">
    {/* {`Showing ${total} of ${appointments.length} appointments`} */}
        {`Showing ${total} of ${rooms.length} rooms`}


  </h2>
  <button
    onClick={() => {
      setCurrentPage(currentPage + 1);
    }}
    disabled={total === rooms.length}
    className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
      total === rooms.length
        ? 'bg-white text-gray-400 border border-gray-300 cursor-not-allowed'
        : 'bg-white text-[#207dff] border border-[#207dff] hover:bg-[#207dff] hover:text-white'
    }`}
  >
    Next
  </button>
</div>
       </div>
      )}










      {isEditModalOpen && selectedRoom && (
        <EditRoomModal
          room={selectedRoom}
          id={id}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

     
    </main>
  );
}


