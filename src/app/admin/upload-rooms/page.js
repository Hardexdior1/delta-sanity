"use client"
import { useState } from "react"
import endpointroute from '../../utils/endpointroute'
import { X } from "lucide-react" 
import { ToastContainer,toast } from "react-toastify"
import Image from "next/image"
export default function CreateRoom() {
  const featuresList = [
  "Wi-Fi",
  "Breakfast",
  "AC",
  "Wine",
  "Swimming Pool Access",
  "Club Access",
  "Laundry",
  "Gym",
  "TV",
  "Room Service"
]
  const [roomData, setRoomData] = useState({
    name: "",
    description: "",
    typeOfBed: "",
    pricePerNight: "",
    maxNumberOfAdults: "",
    roomNumber: "",
    features: [],
    isAvailable: true
  })
  const [images, setImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
const [upload,setUpload]=useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRoomData(prev => ({ ...prev, [name]: value }))
  }

  const handleFeatureToggle = (feature) => {
    setRoomData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

 const handleImageChange = (e) => {
  const files = Array.from(e.target.files)
  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"]

  const filteredFiles = files.filter(file => validTypes.includes(file.type))

  // Append to existing images instead of replacing
  setImages(prev => [...prev, ...filteredFiles])

  const newPreviews = filteredFiles.map(file => URL.createObjectURL(file))
  setImagePreviews(prev => [...prev, ...newPreviews])
}


  const handleSubmit = async (e) => {
    console.log('hello')
          setUpload(true)

    e.preventDefault()
    const formData = new FormData()
    Object.entries(roomData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => formData.append(key, v))
      } else {
        formData.append(key, value)
      }
    })
    images.forEach(img => formData.append("images", img))

    try {
       await endpointroute.post("rooms", formData)
      setUpload(false)
      toast.success("Room created successfully!")
    } catch (error) {
      console.error("Error creating room:", error)
            setUpload(false)

      toast.error(error.data.message||"error creating room please try again")

    }
  }
  const removeImage = (indexToRemove) => {
  setImages(prev => prev.filter((_, idx) => idx !== indexToRemove))
  setImagePreviews(prev => prev.filter((_, idx) => idx !== indexToRemove))
}

  return (
    <div className="max-w-4xl mx-auto p-4 text-black">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-emerald-600">Create a Room</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" name="name" onChange={handleInputChange} placeholder="Room Name" className="p-2 border rounded w-full" required />
          <input type="text" name="roomNumber" onChange={handleInputChange} placeholder="Room Number" className="p-2 border rounded w-full" required />
        </div>

        <textarea name="description" onChange={handleInputChange} placeholder="Room Description" className="p-2 border rounded w-full" required />

        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" name="typeOfBed" onChange={handleInputChange} placeholder="Type of Bed" className="p-2 border rounded w-full" required />
          <input type="number" name="pricePerNight" onChange={handleInputChange} placeholder="Price per Night" className="p-2 border rounded w-full" required />
        </div>

        <input type="number" name="maxNumberOfAdults" onChange={handleInputChange} placeholder="Max Number of Adults" className="p-2 border rounded w-full" required />

        <div className="mt-4">
          <p className="mb-2 font-semibold">Select Features</p>
          <div className="grid md:grid-cols-3 gap-2">
            {featuresList.map((feature, idx) => (
              <label key={idx} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => handleFeatureToggle(feature)}
                  checked={roomData.features.includes(feature)}
                />
                <span>{feature}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-2 font-semibold">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/png, image/jpeg, image/webp, image/avif"
            onChange={handleImageChange}
            className="p-2 border w-full"
          />
          <div className="flex gap-4 mt-3 flex-wrap">
            {imagePreviews.map((src, idx) => (
               <div key={idx} className="relative group w-24 h-24">
      <Image src={src} alt={`Preview ${idx}`} className="w-full h-full object-cover rounded" width={200} height={200} />
      <button
        type="button"
        onClick={() => removeImage(idx)}
        className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full  group-hover:opacity-100 transition"
        title="Remove image"
      >
        <X size={16} />
      </button>
    </div>
            ))}
          </div>
        </div>

       <button
  type="submit"
  disabled={upload}
  className={`mt-6 px-6 py-2 rounded transition text-white 
    ${upload ? "bg-emerald-600 opacity-50 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"}`}
>
  {upload ? "Uploading Room..." : "Upload Room"}
</button>

      </form>
    </div>
  )
}
