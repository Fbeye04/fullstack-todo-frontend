import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  return (
    <div className='my-4 flex flex-col gap-6'>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
