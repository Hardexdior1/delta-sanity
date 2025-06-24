'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import endpointroute from '../../../utils/endpointroute'
import Image from 'next/image'
import { useAuth } from '@/app/context/AuthContext'

const DoctorPage = () => {
  const { id } = useParams()
  const [data, setData] = useState({
    reviews: [],
    doctor: [],
    totalReviews: 0
  })
  console.log(data)
  const [loading, setLoading] = useState(true)
  
  
  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 4



//   doctor/:doctorId/records/admin

  useEffect(() => {
    const fetchDoctorRecords = async () => {
      try {
        setLoading(true)
        const response = await endpointroute.get(`/doctor/${id}/records/admin`)
    
        // Sort reviews by date (oldest first)
        const sortedReviews = response.data.review?.sort((a, b) => 
          new Date(a.createdAt) - new Date(b.createdAt)
        ) || []


        setData({
          reviews: sortedReviews,
          doctor: response.data.doctor,
          totalReviews: sortedReviews.length,
          totalAppointments:response.data.appointment.length,
          appointments:response.data.appointment

        })

      } catch (err) {
        toast.error('Failed to load doctor records')
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchDoctorRecords()
  }, [id])

  const { user } = useAuth();

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage
  const currentReviews = data.reviews.slice(indexOfFirstReview, indexOfLastReview)
  const totalPages = Math.ceil(data.totalReviews / reviewsPerPage)

 

  const getStatusButton = (appointmentDate) => {
    const today = new Date();
    const appointmentDateObj = new Date(appointmentDate);
    
    if (appointmentDateObj < today) {
      return (
        <button className="bg-gray-400 text-white px-4 py-2 rounded-lg">
          Past Appointment
        </button>
      );
    } else if (appointmentDateObj.toDateString() === today.toDateString()) {
      return (
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">
          Today&apos;s Appointment
        </button>
      );
    } else {
      return (
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
        Coming Appointment
        </button>
      );
    }
  };

 
  

  

  if (loading) {
    return (
      <div className="container mx-auto py-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#207dff]"></div>
      </div>
    )
  }

  if (!data.doctor) {
    return (
      <div className="container mx-auto py-20">
        <p className="text-center">No doctor data found</p>
      </div>
    )
  }

  return (
    <div className="py-26 md:py-2">
      <ToastContainer />

      <div className="flex items-center gap-2 mb-8">
        <h3 className="text-black font-medium">Hi,</h3>
        <p className="text-[#207dff] font-semibold">
          {user.username.charAt(0).toUpperCase()}
          {user.username.slice(1).toLowerCase()}
        </p>
      </div>
      
<div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
 {data?.doctor?.map((item)=>{
      // <div key={item._id} className="flex flex-col lg:flex-row">
    {/* <div className="w-full lg:w-3/4 relative h-[400px] md:h-[300px]" >
      <Image 
        src={item.image || '/doctor-placeholder.jpg'}
        alt={item.name}
        fill
        className="object-cover w-full"
        priority
      />
    </div> */}


{/* <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8"> */}
  return <div className="flex flex-col md:flex-row" key={0+1}>
    <div className="w-full md:w-1/4 relative h-[400px] md:h-[300px]" >
      <Image 
        src={item.image || '/doctor-placeholder.jpg'}
        alt={item.name}
        fill
        className="object-cover w-full"
        priority
      />
    </div>

    <div className="w-full md:w-2/3 p-6">
      <div className="flex flex-col h-fit">
        <div>
          <h1 className="text-3xl font-bold text-[#207dff] mb-2">{item.name.charAt(0).toUpperCase()}{item.name.substring(1)} </h1>
          <p className="text-xl text-black mb-4">{item.specialty}</p>
          <p className="text-gray-700 mb-6">{item.bio}</p>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="bg-[#207dff]/10 px-4 py-2 rounded-full">
              <span className="font-medium text-[#207dff]">Contact: {item.phone}</span>
            </div>
            <div className="bg-[#207dff]/10 px-4 py-2 rounded-full">
              <span className="font-medium text-[#207dff]">Email: {item.email}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {item.availableDays?.map((day, index) => (
              <span 
                key={index}
                className="bg-[#207dff] text-white px-3 py-1 rounded-full text-sm"
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
{/* </div> */}
    

   
  // </div>
 })}
</div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reviews Section */}
        <div className="lg:col-span-1 h-fit">
  <div className="bg-white rounded-lg shadow-md p-4 h-fit">
    <h2 className="text-2xl font-bold text-[#207dff] mb-6">
      Patient Reviews ({data.totalReviews})
    </h2>

    {currentReviews.length > 0 ? (
      <div className="space-y-6 max-h-[400px] overflow-y-auto w-full">
        {currentReviews.map((review) => {
          return (
            <div key={review._id} className="border-b border-gray-100 pb-6 last:border-0">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-[#207dff] text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
                  {(review.name?.charAt(0) || 'A').toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{review.name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 pl-16">{review.message}</p>
            </div>
          );
        })}
      </div>
    ) : (
      <div className="text-center py-8">
        <p className="text-gray-500">No reviews yet </p>
      </div>
    )}

    {/* Pagination - Only show if more than 5 reviews */}
    {data.totalReviews > reviewsPerPage && (
      <div className="flex justify-center mt-8">
        <nav className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page ? 'bg-[#207dff] text-white' : 'border border-gray-300'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </div>
    )}
  </div>
</div>

        <div className="lg:col-span-1 hidden h-fit">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-2xl font-bold text-[#207dff] mb-6">
              Patient Reviews ({data.totalReviews})
            </h2>
            
            {currentReviews.length > 0 ? (
              <div className="space-y-6 overflow-hidden">
                {currentReviews.map((review)=>{
                  return <div key={review._id} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-[#207dff] text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
                    {(review.name?.charAt(0) || 'A').toUpperCase()}

                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{review.name}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 pl-16">{review.message}</p>
                </div>
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              </div>
            )}

            {/* Pagination - Only show if more than 5 reviews */}
            {data.totalReviews > reviewsPerPage && (
              <div className="flex justify-center mt-8">
                <nav className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-[#207dff] text-white' : 'border border-gray-300'}`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-md p-4 rounded-lg lg:col-span-2">
        <h2 className="text-2xl font-bold text-[#207dff] mb-6">
             Appointments ({data.appointments.length})
            </h2>
 {data.appointments.length>0? <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead className="bg-blue-50">
        <tr>
          <th className="px-4 py-4 text-sm font-semibold text-gray-700 border-b whitespace-nowrap min-w-[150px]">
            Patient Name
          </th>
          <th className="px-4 py-4 text-sm font-semibold text-gray-700 border-b whitespace-nowrap min-w-[200px]">
            Email
          </th>
          <th className="px-4 py-4 text-sm font-semibold text-gray-700 border-b whitespace-nowrap min-w-[150px]">
            Date
          </th>
          <th className="px-4 py-4 text-sm font-semibold text-gray-700 border-b whitespace-nowrap min-w-[200px]">
            Diagnosis
          </th>
          <th className="px-4 py-4 text-sm font-semibold text-gray-700 border-b whitespace-nowrap min-w-[200px]">
           Status
          </th>


        </tr>
      </thead>
      <tbody>
        {data?.appointments?.map((booking) => (
          <tr
            key={booking._id}
            className="border-t hover:bg-blue-50 transition-all"
          >
            <td className="px-4 py-3">{booking.name}</td>
            <td className="px-4 py-3">{booking.email}</td>
            <td className="px-4 py-3">
              {new Date(booking.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </td>
            <td className="px-4 py-3 capitalize">{booking.diagnosis}</td>
            <td className="px-4 py-3 shrink-0 capitalize">{getStatusButton(booking.date)}
            </td>

          </tr>


        ))}
      </tbody>
    </table>
  </div>: <div className="text-center py-8">
        <p className="text-gray-500">No appointments yet </p>
      </div>}
</div>

      </div>
    </div>
  )
}

export default DoctorPage