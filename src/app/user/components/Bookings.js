
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
// import Link from 'next/link'
import { MdClose } from "react-icons/md";
import { useAuth } from '@/app/context/AuthContext';

const Bookings = ({ allBookings, isLoading, error }) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [expandedImg, setExpandedImg] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 6;

  useEffect(() => {
    const results = allBookings?.filter((booking) =>
      booking.place.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookings(results || []);
    setCurrentPage(1);
  }, [searchTerm, allBookings]);

  const handlePrint = () => window.print();


  const startIndex = (currentPage - 1) * reportsPerPage;
  const endIndex = startIndex + reportsPerPage;
  const paginatedReports = filteredBookings?.slice(startIndex, endIndex);
  const totalReports = filteredBookings?.length || 0;
  const totalPages = Math.ceil(totalReports / reportsPerPage);

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-blue-600">Your Reports</h2>
        <input
          type="text"
          placeholder="Search by place..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded text-sm w-64"
        />
      </div>

      {/* Modal View */}
      {showModal && book && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white max-h-[90vh] overflow-y-auto p-6 rounded-lg w-11/12 xl:w-3/5 shadow-xl relative print-area">
            <div className="flex justify-between items-center">
              <h4 className="text-blue-600 font-bold text-lg">Submitted by {user?.fullName}</h4>
              <div className="flex gap-4">
                <button onClick={handlePrint} className="no-print px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm">Print</button>
                <button onClick={() => setShowModal(false)}><MdClose size={24} className="no-print text-gray-600 hover:text-black" /></button>
              </div>
            </div>

            <h4 className="text-black mb-2 font-semibold text-lg">
              Date: {new Date(book.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </h4>

            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="md:col-span-2">
                  <label className="block font-medium mb-1">Place</label>
                  <input type="text" value={book.place} disabled className="w-full p-1.5 text-sm bg-gray-100 border border-transparent rounded-md text-gray-700" />
                </div>
                {["AGO", "PMS", "DPK", "CrudeOil", "arrestedSuspects", "irsCount", "ovenCount", "tankCount", "woodenBoatCount"].map((field) => (
                  <div key={field}>
                    <label className="block font-medium mb-1">{field.replace(/([A-Z])/g, ' $1')}</label>
                    <input type="text" value={book[field]} disabled className="w-full p-1.5 text-sm bg-gray-100 border border-transparent rounded-md text-gray-700" />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block font-medium mb-1">Remark</label>
                  <textarea rows={6} value={book.remark} disabled className="w-full p-1.5 text-sm bg-gray-100 border border-transparent rounded-md text-gray-700" />
                </div>
                <div className="md:col-span-2 img-zone">
                  <label className="block font-medium mb-2">Images</label>
                  {book.images && book.images.length > 0 ? (
                    <div className="flex gap-4 flex-wrap">
                      {book.images.map((img) => (
                        <div key={img} className="relative cursor-pointer" onClick={() => setExpandedImg(img)}>
                          <img src={img} alt="Report Image" className="rounded max-h-[100px]" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No image attached</p>
                  )}
                </div>
              </div>
            </form>

            {expandedImg && (
              <div className="fixed img-zone inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                <div className="relative">
                  <button onClick={() => setExpandedImg(null)} className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1">
                    <MdClose size={20} />
                  </button>
                  <img src={expandedImg} alt="Expanded View" className="max-h-[80vh] max-w-full rounded-lg" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col animate-pulse border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="flex flex-col gap-3 py-4 px-4">
                <div className="h-6 bg-gray-300 w-5/6"></div>
                <div className="h-4 bg-gray-200 w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-600 font-semibold text-lg">{error}</div>
      ) : totalReports === 0 ? (
        <p className="text-center text-gray-500 py-6">No reports found for &quot;{searchTerm}&quot;</p>
      ) : (
        <>
          <div className="text-sm text-gray-700 mb-3">Showing {Math.min(endIndex, totalReports)} of {totalReports} reports</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedReports.map((booking) => (
              <div key={booking._id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                {booking?.images?.[0] ? (
                  <Image src={booking.images[0]} alt="report image" width={600} height={400} className="w-full h-48 object-cover" />
                ) : (
                  <Image src="https://images.unsplash.com/photo-1570129477492-45c003edd2be" alt="No images attached" width={600} height={400} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <h2 className="text-lg font-bold text-black mb-1 capitalize">{booking.place || 'N/A'}</h2>
                  <p className="text-sm text-gray-600 mb-2">Submitted:   {new Date(booking.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}</p>
                  <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700" onClick={() => {
                    setShowModal(true)
                    setBook(booking)
                  }}>View Details</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center text-sm">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>Prev</button>
            <span className="text-black">Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage >= totalPages} className={`px-4 py-2 rounded ${currentPage >= totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Bookings;
