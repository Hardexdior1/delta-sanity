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

  const [loading, setLoading] = useState(false);
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"]; // Added avif as per create room component

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e) => {
    const value = e.target.value === "true";
    setFormData({ ...formData, isAvailable: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPG, PNG, WebP, or AVIF files are allowed.");
        return false;
      }
      return true;
    });
    setFormData((prev) => ({
      ...prev,
      newImages: [...prev.newImages, ...validFiles],
    }));
  };

  const removeExistingImage = (imgUrl) => {
    setFormData((prev) => ({
      ...prev,
      existingImageUrls: prev.existingImageUrls.filter((img) => img !== imgUrl),
    }));
  };

  const removeNewImage = (fileToRemove) => {
    setFormData((prev) => ({
      ...prev,
      newImages: prev.newImages.filter((file) => file !== fileToRemove),
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedRoomData = new FormData();
    updatedRoomData.append("name", formData.name);
    updatedRoomData.append("pricePerNight", formData.pricePerNight);
    updatedRoomData.append("roomNumber", formData.roomNumber);
    updatedRoomData.append("maxNumberOfAdults", formData.maxNumberOfAdults);
    updatedRoomData.append("typeOfBed", formData.typeOfBed);
    updatedRoomData.append("description", formData.description);
    updatedRoomData.append("isAvailable", formData.isAvailable);

    // Append all features
    formData.features.forEach((feat) => updatedRoomData.append("features", feat));

    // Append existing image URLs that are still selected
    formData.existingImageUrls.forEach((imgUrl) => updatedRoomData.append("existingImageUrls", imgUrl));

    // Append all *new* image files under the "images" field, matching the create room logic
    formData.newImages.forEach((file) => updatedRoomData.append("images", file));

    try {
      const res = await endpointroute.patch(`rooms/${room._id}`, updatedRoomData);
      toast.success(res.data.message || "Room updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating room:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Something went wrong. Unable to update room.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <ToastContainer />
      <div className="bg-white max-h-[90vh] overflow-y-auto p-6 rounded-lg w-11/12 xl:w-3/5 shadow-xl relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-emerald-600">Edit Room</h2>
          <button onClick={onClose}>
            <MdClose size={24} className="text-gray-600 hover:text-black" />
          </button>
        </div>

        <form onSubmit={handleEditSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Room Name */}
            <div>
              <label className="block font-medium mb-1">Room Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Room Number */}
            <div>
              <label className="block font-medium mb-1">Room Number</label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Price Per Night */}
            <div>
              <label className="block font-medium mb-1">Price Per Night</label>
              <input
                type="number"
                name="pricePerNight"
                value={formData.pricePerNight}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Max Adults */}
            <div>
              <label className="block font-medium mb-1">Max Number of Adults</label>
              <input
                type="number"
                name="maxNumberOfAdults"
                value={formData.maxNumberOfAdults}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Type of Bed */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Type of Bed</label>
              <input
                type="text"
                name="typeOfBed"
                value={formData.typeOfBed}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Description</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md"
              ></textarea>
            </div>

            {/* Availability */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Availability</label>
              <select
                name="isAvailable"
                value={formData.isAvailable}
                onChange={handleSelectChange}
                className="w-full p-2 border rounded-md"
              >
                <option value={true}>Available</option>
                <option value={false}>Not Available</option>
              </select>
            </div>

            {/* Features */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-2">Features</label>
              <div className="flex flex-wrap gap-4">
                {[ "Wi-Fi", "Breakfast", "AC", "Wine", "Swimming Pool Access", "Club Access", "Laundry", "Gym", "TV", "Room Service"].map((feature) => (
                    <label key={feature} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="accent-emerald-600"
                        checked={formData.features.includes(feature)}
                        onChange={() => {
                          setFormData((prev) => ({
                            ...prev,
                            features: prev.features.includes(feature)
                              ? prev.features.filter((f) => f !== feature)
                              : [...prev.features, feature],
                          }));
                        }}
                      />
                      {feature}
                    </label>
                  ))}
              </div>
            </div>

            {/* Existing Images */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-2">Existing Images</label>
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

            {/* New Images */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-2">Add New Images</label>
              <input type="file" multiple accept="image/*" onChange={handleFileChange} />
              <div className="flex gap-4 mt-2 flex-wrap">
                {formData.newImages.map((file, i) => (
                  <div key={i} className="relative">
                    <Image src={URL.createObjectURL(file)} alt="New Image" width={100} height={100} className="rounded max-h-[100px]" />
                    <button
                      type="button"
                      onClick={() => removeNewImage(file)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <MdDelete size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed opacity-70"
                  : "bg-emerald-600 hover:bg-emerald-500"
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHotelModal;