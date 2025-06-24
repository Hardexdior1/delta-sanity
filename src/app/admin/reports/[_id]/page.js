'use client';

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import endpointroute from "@/app/utils/endpointroute";
import { MdClose } from "react-icons/md";

const Page = () => {
  const route = usePathname();
  const splittedRoute = route.split('/')[3];
  const searchParams = useSearchParams();
 const name = searchParams.get('name')
  const [loading, setLoading] = useState(false);
  const [reports, setReport] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState(null);
  const [expandedImg, setExpandedImg] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const res = await endpointroute.get(`reports/user/${splittedRoute}`);
        setReport(res.data);
        setNotFound(false);
      } catch (error) {
        if (error?.response?.status === 404) {
          setNotFound(true);
        } else {
          console.log("Error fetching report:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [splittedRoute]);

  const handlePrint = () => window.print();

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold text-black mb-4"> All Reports From {name } Zone </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : notFound ? (
        <div className="text-center py-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
            No report found for this user.
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Please check again later or select a different zone.
          </p>
        </div>
      ) : reports ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report, index) => (
       <div
  key={index}
  className="bg-white border border-black rounded-xl shadow-sm p-4 max-w-xl transition hover:shadow-md duration-200 space-y-3"
>
  <div className="flex flex-col gap-2">
    <h2 className="text-base font-semibold text-black">
      Place: {report.place.charAt(0).toUpperCase() + report.place.slice(1)}
    </h2>
    <p className="text-sm text-blue-500">
      {new Date(report.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}
    </p>
  </div>

  <div className="grid grid-cols-2 gap-2 text-sm text-black">
    <p><span className="font-medium">AGO:</span> {report.AGO}</p>
    <p><span className="font-medium">PMS:</span> {report.PMS}</p>
    <p><span className="font-medium">DPK:</span> {report.DPK}</p>
    <p><span className="font-medium">Crude Oil:</span> {report.CrudeOil}</p>
  </div>

  <div className="pt-3">
    <button
      onClick={() => {
        setShowModal(true);
        setView(report);
      }}
      className="text-sm px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
    >
      View Full Details
    </button>
  </div>
</div>


          ))}
        </div>
      ) : null}

      {showModal && view && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white max-h-[90vh] overflow-y-auto p-6 rounded-lg w-11/12 xl:w-3/5 shadow-xl relative print-area">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-blue-600 font-bold text-lg">
                Submitted on {new Date(view.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={handlePrint}
                  className="no-print px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                >
                  Print
                </button>
                <button onClick={() => setShowModal(false)}>
                  <MdClose size={24} className="no-print text-gray-600 hover:text-black" />
                </button>
              </div>
            </div>

            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="md:col-span-2">
                  <label className="block font-medium mb-1">Place</label>
                  <input
                    type="text"
                    value={view.place}
                    disabled
                    className="w-full p-1.5 text-sm bg-gray-100 border border-transparent rounded-md text-gray-700"
                  />
                </div>

                {["AGO", "PMS", "DPK", "CrudeOil", "arrestedSuspects", "irsCount", "ovenCount", "tankCount", "woodenBoatCount"].map((field) => (
                  <div key={field}>
                    <label className="block font-medium mb-1">{field.replace(/([A-Z])/g, ' $1')}</label>
                    <input
                      type="text"
                      value={view[field]}
                      disabled
                      className="w-full p-1.5 text-sm bg-gray-100 border border-transparent rounded-md text-gray-700"
                    />
                  </div>
                ))}

                <div className="md:col-span-2">
                  <label className="block font-medium mb-1">Remark</label>
                   <textarea
                   rows={4}
                      type="text"
                      value={view.remark}
                      disabled
                      className="w-full p-1.5 text-sm bg-gray-100 border border-transparent rounded-md text-gray-700"
                    />
                 
                </div>

                <div className="md:col-span-2">
                  <label className="block font-medium mb-2">Images</label>
                  {view.images && view.images.length > 0 ? (
                    <div className="flex gap-4 flex-wrap">
                      {view.images.map((img) => (
                        <div
                          key={img}
                          className="relative cursor-pointer"
                          onClick={() => setExpandedImg(img)}
                        >
                          <img
                            src={img}
                            alt="Report Image"
                            className="rounded max-h-[100px]"
                          />
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
              <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                <div className="relative">
                  <button
                    onClick={() => setExpandedImg(null)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                  >
                    <MdClose size={20} />
                  </button>
                  <img
                    src={expandedImg}
                    alt="Expanded View"
                    className="max-h-[80vh] max-w-full rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;
