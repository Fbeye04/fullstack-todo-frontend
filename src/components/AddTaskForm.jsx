export default function AddTaskForm() {
  return (
    <form className='w-full mt-4 px-4 md:px-6 bg-white flex items-center justify-between rounded-lg border-2 border-black transition-all duration-300 ease-in-out focus-within:shadow-lg focus-within:border-gray-400 focus-within:-translate-y-1'>
      <input
        type='text'
        id='task'
        name='task'
        placeholder='Add your notes'
        className='w-full pr-4 py-6 md:py-6 text-2xl md:text-3xl rounded-lg active:outline-none focus:outline-none'
      />
      <button className='bg-black border-2 border-transparent rounded-lg px-3 py-2 transition-all duration-300 ease-in-out hover:bg-white hover:border-black group active:scale-95 shadow-md active:shadow'>
        <i className='fa-solid fa-plus text-white active:text-black text-2xl md:text-3xl group-hover:text-black '></i>
      </button>
    </form>
  );
}
