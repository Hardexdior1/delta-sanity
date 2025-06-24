// EditHotelModal.js
import { useState } from "react";
import { MdClose, MdDelete } from "react-icons/md";
import endpointroute from "@/app/utils/endpointroute";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditHotelModal = ({ room, onClose }) => {
  const [formData, setFormData] = useState({
    name: room.name || "",
    pricePerNight: room.pricePerNight || "",
    roomNumber: room.roomNumber || "",
    maxNumberOfAdults: room.maxNumberOfAdults || "",
    typeOfBed: room.typeOfBed || "",
    description: room.description || "",
    features: room.features || [],
    existingImageUrls: room.images || [], // Renamed for clarity: these are URLs
    newImages: [], // These are File objects
    isAvailable: room.isAvailable,
  });

 



  const removeExistingImage = (imgUrl) => {
    setFormData((prev) => ({
      ...prev,
      existingImageUrls: prev.existingImageUrls.filter((img) => img !== imgUrl),
    }));
  };



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <ToastContainer />
      <div className="bg-white max-h-[90vh] overflow-y-auto p-6 rounded-lg w-11/12 xl:w-3/5 shadow-xl relative">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose}>
            <MdClose size={24} className="text-gray-600 hover:text-black" />
          </button>
        </div>

        <form >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Room Name */}
            <div>
              <label className="block font-medium mb-1">Room Name</label>
              <input
                type="text"
                name="name"
                readOnly
                value={formData.name}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Room Number */}
            <div>
              <label className="block font-medium mb-1">Room Number</label>
              <input
                type="text"
                                readOnly

                name="roomNumber"
                value={formData.roomNumber}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Price Per Night */}
            <div>
              <label className="block font-medium mb-1">Price Per Night</label>
              <input
                type="number"
                                readOnly

                name="pricePerNight"
                value={formData.pricePerNight}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Max Adults */}
            <div>
              <label className="block font-medium mb-1">Max Number of Adults</label>
              <input
                type="number"
                                readOnly

                name="maxNumberOfAdults"
                value={formData.maxNumberOfAdults}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Type of Bed */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Type of Bed</label>
              <input
                type="text"
                                readOnly

                name="typeOfBed"
                value={formData.typeOfBed}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Description</label>
              <textarea
                name="description"
                rows={4}
                                readOnly

                value={formData.description}
                className="w-full p-2 border rounded-md"
              ></textarea>
            </div>

           

           

            <div className="md:col-span-2">
              <label className="block font-medium mb-2"> Images</label>
              <div className="flex gap-4 flex-wrap">
                {formData.existingImageUrls.map((img) => (
                  <div key={img} className="relative">
                    <Image src={img} alt="Room Image" width={100} height={100} className="rounded max-h-[100px]" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(img)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <MdDelete size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          
          </div>

         
        </form>
      </div>
    </div>
  );
};

export default EditHotelModal;