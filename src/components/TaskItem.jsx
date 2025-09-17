export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className='w-full flex justify-between bg-white border-2 border-black rounded-lg p-4 lg:p-6 group'>
      <div className='flex items-center gap-4'>
        <input
          type='checkbox'
          checked={task.isDone}
          onChange={() => onToggle(task.id, !task.isDone)}
          className='size-8 md:size-9'
        />
        <span
          className={`text-2xl md:text-3xl ${
            task.isDone ? "line-through text-gray-400" : ""
          }`}>
          {task.title}
        </span>
      </div>

      <div className='flex gap-4 lg:gap-6 text-2xl md:text-3xl transition-opacity duration-300 ease-in-out lg:opacity-0 group-hover:opacity-100'>
        <button className='bg-primer-button lg:bg-transparent text-white lg:text-black border-2 border-primer-border lg:border-none rounded-lg px-3 md:px-4 py-2 md:py-3 lg:p-0 transition-all duration-300 ease-in-out hover:bg-white hover:border-primer-border hover:text-primer-button group active:scale-95 shadow active:shadow-sm'>
          <i className='fa-solid fa-pencil'></i>
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className='bg-secondary-button lg:bg-transparent text-white lg:text-black border-2 border-secondary-border lg:border-none rounded-lg px-3 md:px-4 py-2 md:py-3 lg:p-0 transition-all duration-300 ease-in-out hover:bg-white hover:border-secondary-border hover:text-secondary-button group active:scale-95 shadow active:shadow-sm'>
          <i className='fa-solid fa-trash'></i>
        </button>
      </div>
    </div>
  );
}
