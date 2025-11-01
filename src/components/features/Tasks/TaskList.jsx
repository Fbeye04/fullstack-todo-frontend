import TaskItem from "./TaskItem";
import { AnimatePresence } from "framer-motion";

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  isDeleting,
  togglingTaskId,
}) {
  return (
    <div className='my-4 flex flex-col gap-6'>
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            isDeleting={isDeleting === task.id}
            isToggling={togglingTaskId === task.id}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
