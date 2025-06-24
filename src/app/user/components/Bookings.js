
'use client'

import { useState } from 'react'
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';

const Bookings = ({allBookings,isLoading,error}) => {
 

  // Filter bookings based on check-in/check-out dates and status
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day for comparison

 
  // Helper function to format dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Helper function to determine and render status badge



  const currentBookings = allBookings.slice(0,3)
  const [showModal, setShowModal] = useState(false);
 const closeModal = () => {
    setShowModal(false); // Close modal
  };
  const [book,setBook]=useState(null)
  console.log(book)
  // totalNights
  return (
   <div className=" bg-white shadow-lg rounded-lg lg:p-2">

{showModal&&<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-3xl relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-600"
          onClick={closeModal}
        >
          <FaTimes size={20} />
        </button>

        {/* Modal Content */}
        <h2 className="text-2xl font-semibold text-black mb-4">{book?.roomId?.name||"N/A"}</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Room Type</h3>
              <p className="text-sm text-gray-600">{book?.roomId?.typeOfBed||"N/A"}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Price per Night</h3>
              <p className="text-sm text-gray-600">₦{book?.roomId?.pricePerNight||"N/A"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Check-in</h3>
              <p className="text-sm text-gray-600">{formatDate(book?.createdAt)}</p>
            </div>
            
          </div>

          {/* <div>
        
          </div> */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <h3 className="text-lg font-medium text-gray-800">Total Price</h3>
            <p className="text-sm text-gray-600">₦{book?.totalPrice?.toLocaleString("en-US")}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Guests</h3>
              <p className="text-sm text-gray-600">{book?.maxNumberOfAdults||"N/A"}</p>
            </div>
          </div>

        

          <div>
            <h3 className="text-lg font-medium text-gray-800">Payment Method</h3>
            <p className="text-sm text-gray-600">{book?.paymentStatus}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800">Room Features</h3>
            <ul className="text-sm text-gray-600">
              {book?.roomId?.features?.map((feature, index) => (
                <li key={index}>- {feature}</li>
              ))||"N/A"}
            </ul>
          </div>
            <button
          className="bg-blue-500 text-white text-gray-600 px-4 py-1 rounded-md font-semibold"
          onClick={(()=>{window.print(formatDate(book?.createdAt))})}
         
        >
          print
        </button>
</div>
</div>

</div>}

    
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6 justify-between px-2">
        <button
          className={`py-3 border-blue-700 text-blue-700 font-semibold text-sm border-b-2 transition-all md:text-base `}
        >
                  Last 3  Submitted reports

        </button>
        <Link href='/user/reports'> <button
          className={`py-3 border-blue-700 text-blue-700 font-semibold text-sm border-b-2 transition-all md:text-base `}
        >
                  View all

        </button></Link>
       
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => ( // Render 6 skeleton cards
            <div
              key={index}
              className="flex flex-col animate-pulse border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
              <div className="flex flex-col gap-3 py-4 px-4">
                <div className="h-6 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                <div className="h-10 bg-gray-300 rounded-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-600 font-semibold text-lg">
          {error}
        </div>
      ) : currentBookings.length > 0 && (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentBookings?.sort((a, b) => new Date(a.checkOut) - new Date(b.checkIn)).map((booking) => (
            <div key={booking._id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
              {/* Using room image if available, otherwise a placeholder */}
              {booking.roomId?.images && booking.roomId.images.length > 0 ? (
                <Image
                  src={booking.roomId.images[0] || "/placeholder.svg"} // Use the first image
                  alt={booking.roomId.name || 'Room image'}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />

              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  {/* No Image Available */}
                   <Image
                  src={"https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWwlMjByb29tc3xlbnwwfHwwfHx8MA%3D%3D"} // Use the first image
                  alt={ 'Room image'}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                </div>
              )}

            
              <div className="p-4 bg-white shadow-md rounded-xl">
  <h2 className="text-lg font-bold text-black mb-1">{booking.roomId?.name||"N/A"}</h2>
  <div className="text-sm text-gray-600 my-2 space-y-1">
    <p>Submitted on: {formatDate(booking.
updatedAt)}</p>
  </div>

  <button
    className="mt-4 w-full bg-blue-700 text-white py-2 rounded-lg text-sm hover:bg-blue-800"
    onClick={() => 
    {
        setShowModal(true)
      setBook(booking)
    }
    }
  >
    View Details
  </button>
</div>

            </div>
          ))}
        </div>
      ) 
      
      
      }
    </div>
  );
};

export default Bookings;