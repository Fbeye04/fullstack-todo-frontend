export default function ConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className='z-30 fixed inset-0 bg-gray-50 bg-opacity-50'>
      <div className='bg-white border-2 border-black rounded-lg min-w-[300px] md:min-w-[500px] p-6 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h2 className='text-center text-2xl font-semibold'>Confirm Action</h2>
        <p className='mt-4 text-xl text-gray-800'>
          Are you sure you want to proceed? All completed tasks will be
          permanently deleted
        </p>

        <div className='flex gap-4 mt-4 text-xl'>
          <button
            onClick={onConfirm}
            className='bg-primer-button rounded-lg border border-primer-border text-white px-3 py-1 hover:bg-white hover:text-primer-button hover:border-primer-border transition-all duration-300 ease-in-out shadow active:scale-95 active:shadow-sm'>
            Yes
          </button>
          <button onClick={onCancel} className='text-gray-500 hover:text-black'>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
