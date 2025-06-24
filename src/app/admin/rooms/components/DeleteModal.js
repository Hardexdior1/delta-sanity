export default function DeleteModal({ title, onConfirm, onCancel,deleting }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-black rounded"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            {deleting?"Deleting..":"Yes, Delete"}
            
          </button>
        </div>
      </div>
    </div>
  );
}