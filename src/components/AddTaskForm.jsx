import { useState } from "react";

export default function AddTaskForm({ onTaskAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onTaskAdd(title);

    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full mt-4 lg:mb-4 px-4 md:px-6 bg-task-background flex items-center justify-between rounded-lg border-2 border-task-border transition-all duration-300 ease-in-out focus-within:shadow-lg focus-within:border-gray-400 dark:focus-within:border-blue-950 focus-within:-translate-y-1'>
      <input
        type='text'
        id='task'
        name='task'
        placeholder='Add your notes'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='w-full bg-task-background text-dark dark:text-white pr-4 py-4 md:py-6 text-2xl md:text-3xl rounded-lg active:outline-none focus:outline-none placeholder:text-gray-600 dark:placeholder:text-[#E4E5F1]'
      />
      <button className='bg-black dark:bg-white border-2 border-transparent rounded-lg px-2 py-1 md:px-3 md:py-2 transition-all duration-300 ease-in-out hover:bg-white dark:hover:bg-black hover:border-black dark:hover:border-white group active:scale-95 shadow active:shadow-sm'>
        <i className='fa-solid fa-plus text-white dark:text-black active:text-black text-2xl md:text-3xl group-hover:text-black dark:group-hover:text-white '></i>
      </button>
    </form>
  );
}
