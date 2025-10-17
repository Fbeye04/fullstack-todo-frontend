export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <div
      className={`w-full flex justify-between gap-4  border-2  rounded-lg p-4 lg:p-6 group ${
        task.isDone
          ? "bg-completed-tasks border-completed-tasks-border border-1"
          : "bg-task-background border-task-border"
      }`}>
      <div className='flex items-center gap-4 min-w-0'>
        <input
          type='checkbox'
          checked={task.isDone}
          onChange={() => onToggle(task.id, !task.isDone)}
          className={`size-8 md:size-9 flex-none rounded-lg cursor-pointer ${
            task.isDone ? "opacity-50" : "opacity-100"
          }`}
        />
        <span
          className={`text-2xl md:text-3xl  flex-grow min-w-0 break-words ${
            task.isDone
              ? "line-through text-gray-400"
              : "text-black dark:text-white"
          }`}>
          {task.title}
        </span>
      </div>

      <div className='flex items-center gap-4 lg:gap-6 text-2xl md:text-3xl transition-opacity duration-300 ease-in-out lg:opacity-0 group-hover:opacity-100'>
        <button
          onClick={() => onEdit(task)}
          className={`bg-primer-button lg:bg-transparent  border-2 border-primer-border hover:border-primer-border lg:border-none rounded-lg px-3 md:px-4 py-2 md:py-3 lg:p-0 transition-all duration-300 ease-in-out hover:bg-white   lg:hover:border-transparent group active:scale-95 shadow active:shadow-sm  ${
            task.isDone ? "opacity-50" : "opacity-100"
          }`}>
          <i className='fa-solid fa-pencil text-white lg:text-black hover:text-primer-button'></i>
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className={`bg-secondary-button lg:bg-transparent text-white lg:text-black border-2 border-secondary-border lg:border-none rounded-lg px-3 md:px-4 py-2 md:py-3 lg:p-0 transition-all duration-300 ease-in-out hover:bg-white hover:border-secondary-border hover:text-secondary-button group active:scale-95 shadow active:shadow-sm ${
            task.isDone ? "opacity-50" : "opacity-100"
          }`}>
          <i className='fa-solid fa-trash'></i>
        </button>
      </div>
    </div>
  );
}
