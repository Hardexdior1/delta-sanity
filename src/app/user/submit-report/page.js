// "use client"
// import { useState } from "react"
// import endpointroute from '../../utils/endpointroute'
// import { X } from "lucide-react"
// import { ToastContainer, toast } from "react-toastify"
// import Image from "next/image"

// export default function CreateReport() {
//   const [reportData, setReportData] = useState({
//     ago: "",
//     pms: "",
//     dpk: "",
//     crudeOil: "",
//     ovenCount: "",
//     tankCount: "",
//     woodenBoatCount: "",
//     arrestedSuspects: "",
//     remark: ""
//   })
//   const [images, setImages] = useState([])
//   const [imagePreviews, setImagePreviews] = useState([])
//   const [upload, setUpload] = useState(false)

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setReportData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files)
//     const validTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"]
//     const filteredFiles = files.filter(file => validTypes.includes(file.type))
//     setImages(prev => [...prev, ...filteredFiles])
//     const newPreviews = filteredFiles.map(file => URL.createObjectURL(file))
//     setImagePreviews(prev => [...prev, ...newPreviews])
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setUpload(true)
//     const formData = new FormData()
//     Object.entries(reportData).forEach(([key, value]) => {
//       formData.append(key, value)
//     })
//     images.forEach(img => formData.append("images", img))

//     try {
//       await endpointroute.post("reports", formData)
//       setUpload(false)
//       toast.success("Report created successfully!")
//     } catch (error) {
//       console.error("Error creating report:", error)
//       setUpload(false)
//       toast.error(error?.data?.message || "Error creating report. Please try again")
//     }
//   }

//   const removeImage = (indexToRemove) => {
//     setImages(prev => prev.filter((_, idx) => idx !== indexToRemove))
//     setImagePreviews(prev => prev.filter((_, idx) => idx !== indexToRemove))
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4 text-black">
//       <ToastContainer />
//       <h1 className="text-2xl font-bold mb-4 text-blue-600">Create a Report</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1 font-medium">AGO</label>
//             <input type="text" name="ago" onChange={handleInputChange} placeholder="e.g. 10 litres" className="p-2 border rounded w-full" required />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">PMS</label>
//             <input type="text" name="pms" onChange={handleInputChange} placeholder="e.g. 5 litres" className="p-2 border rounded w-full" required />
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1 font-medium">DPK</label>
//             <input type="text" name="dpk" onChange={handleInputChange} placeholder="e.g. 2 litres" className="p-2 border rounded w-full" required />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Crude Oil</label>
//             <input type="text" name="crudeOil" onChange={handleInputChange} placeholder="e.g. 15 litres" className="p-2 border rounded w-full" required />
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1 font-medium">Oven Count</label>
//             <input type="number" name="ovenCount" onChange={handleInputChange} placeholder="e.g. 2" className="p-2 border rounded w-full" required />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Tank Count</label>
//             <input type="number" name="tankCount" onChange={handleInputChange} placeholder="e.g. 1" className="p-2 border rounded w-full" required />
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1 font-medium">Wooden Boat Count</label>
//             <input type="number" name="woodenBoatCount" onChange={handleInputChange} placeholder="e.g. 3" className="p-2 border rounded w-full" required />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Arrested Suspects</label>
//             <input type="number" name="arrestedSuspects" onChange={handleInputChange} placeholder="e.g. 4" className="p-2 border rounded w-full" required />
//           </div>
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Remark</label>
//           <textarea name="remark" onChange={handleInputChange} placeholder="Enter remarks or findings..." className="p-2 border rounded w-full" required />
//         </div>

//         <div className="mt-4">
//           <label className="block mb-2 font-semibold">Upload Images</label>
//           <input
//             type="file"
//             multiple
//             accept="image/png, image/jpeg, image/webp, image/avif"
//             onChange={handleImageChange}
//             className="p-2 border w-full"
//           />
//           <div className="flex gap-4 mt-3 flex-wrap">
//             {imagePreviews.map((src, idx) => (
//               <div key={idx} className="relative group w-24 h-24">
//                 <Image src={src} alt={`Preview ${idx}`} className="w-full h-full object-cover rounded" width={200} height={200} />
//                 <button
//                   type="button"
//                   onClick={() => removeImage(idx)}
//                   className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full group-hover:opacity-100 transition"
//                   title="Remove image"
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={upload}
//           className={`mt-6 px-6 py-2 rounded transition text-white ${upload ? "bg-blue-600 opacity-50 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
//         >
//           {upload ? "Creating..." : "Create Report"}
//         </button>
//       </form>
//     </div>
//   )
// }

"use client"
import { useState } from "react"
import endpointroute from '../../utils/endpointroute'
import { X } from "lucide-react"
import { ToastContainer, toast } from "react-toastify"
import Image from "next/image"

export default function CreateReport() {
  const [reportData, setReportData] = useState({
    ago: "",
    pms: "",
    dpk: "",
    crudeOil: "",
    ovenCount: "",
    tankCount: "",
    woodenBoatCount: "",
    arrestedSuspects: "",
    remark: ""
  })
  const [images, setImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [upload, setUpload] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setReportData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"]
    const filteredFiles = files.filter(file => validTypes.includes(file.type))
    setImages(prev => [...prev, ...filteredFiles])
    const newPreviews = filteredFiles.map(file => URL.createObjectURL(file))
    setImagePreviews(prev => [...prev, ...newPreviews])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpload(true)

    const modifiedData = {
      ...reportData,
      ago: reportData.ago ? `${reportData.ago} litres` : "",
      pms: reportData.pms ? `${reportData.pms} litres` : "",
      dpk: reportData.dpk ? `${reportData.dpk} litres` : "",
      crudeOil: reportData.crudeOil ? `${reportData.crudeOil} litres` : ""
    }

    console.log("Data to be sent:", modifiedData)

    const formData = new FormData()
    Object.entries(modifiedData).forEach(([key, value]) => {
      formData.append(key, value)
    })
    images.forEach(img => formData.append("images", img))

    try {
      await endpointroute.post("reports", formData)
      setUpload(false)
      toast.success("Report created successfully!")
    } catch (error) {
      console.log("Error creating report:", error)
      setUpload(false)
      toast.error(error?.data?.message || "Error creating report. Please try again")
    }
  }

  const removeImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, idx) => idx !== indexToRemove))
    setImagePreviews(prev => prev.filter((_, idx) => idx !== indexToRemove))
  }

  return (
    <div className="max-w-4xl mx-auto p-4 text-black">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Submit a Report</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['ago', 'pms', 'dpk', 'crudeOil'].map((key) => (
            <div key={key}>
              <label className="block mb-1 font-medium">{key.toUpperCase()}</label>
              <div className="flex items-center">
                <input
                  type="number"
                  name={key}
                  value={reportData[key]}
                  onChange={handleInputChange}
                  placeholder={`e.g. 10`}
                  className="p-2 border rounded w-full"
                  required
                />
                <span className="ml-2">litres</span>
              </div>
            </div>
          ))}

          <div>
            <label className="block mb-1 font-medium">Oven Count</label>
            <input type="number" name="ovenCount" onChange={handleInputChange} placeholder="e.g. 2" className="p-2 border rounded w-full" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Tank Count</label>
            <input type="number" name="tankCount" onChange={handleInputChange} placeholder="e.g. 1" className="p-2 border rounded w-full" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Wooden Boat Count</label>
            <input type="number" name="woodenBoatCount" onChange={handleInputChange} placeholder="e.g. 3" className="p-2 border rounded w-full" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Arrested Suspects</label>
            <input type="number" name="arrestedSuspects" onChange={handleInputChange} placeholder="e.g. 4" className="p-2 border rounded w-full" required />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Remark</label>
          <textarea name="remark" onChange={handleInputChange} placeholder="Enter remarks or findings..." className="p-2 border rounded w-full" required />
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
                  className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full group-hover:opacity-100 transition"
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
          className={`mt-6 px-6 py-2 rounded transition text-white ${upload ? "bg-blue-600 opacity-50 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {upload ? "Creating..." : "Create Report"}
        </button>
      </form>
    </div>
  )
}
