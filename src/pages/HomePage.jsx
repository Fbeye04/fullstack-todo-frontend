import { useState, useEffect } from "react";
import {
  getAllTasks,
  addTask,
  deleteTask,
  updateTask,
  toggleTaskStatus,
  clearCompletedTasks,
} from "../services/taskService";
import Header from "../components/layouts/Header";
import AddTaskForm from "../components/features/Tasks/AddTaskForm";
import TaskFilters from "../components/features/Tasks/TaskFilters";
import SkeletonLoader from "../components/features/Tasks/TaskListSkeleton";
import TaskList from "../components/features/Tasks/TaskList";
import EditTaskModal from "../components/features/Tasks/EditTaskModal";
import ConfirmModal from "../components/UI/ConfirmModal";
import Footer from "../components/layouts/Footer";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAddingTask, setAddingTask] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [savingTaskId, setSavingTaskId] = useState(null);
  const [togglingTaskId, setTogglingTaskId] = useState(null);
  const [deleteAllTaskDone, setDeleteAllTaskDone] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);

        const data = await getAllTasks();
        setTasks(data);
      } catch (error) {
        console.error("There was an error fetching the tasks!", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    if (editingTask) {
      document.body.classList.add("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [editingTask]);

  const handleAddTask = async (newTitle) => {
    setAddingTask(true);
    try {
      const newlyCreatedTask = await addTask(newTitle);
      setTasks((prevTasks) => [...prevTasks, newlyCreatedTask]);
    } catch (error) {
      console.error("There was an error adding the task!", error);
    } finally {
      setAddingTask(false);
    }
  };

  const activeTasksCount = tasks.filter((task) => !task.isDone).length;

  const filteredTasks = tasks.filter((task) => {
    console.log(activeFilter);

    if (activeFilter === "active") {
      return !task.isDone;
    }
    if (activeFilter === "completed") {
      return task.isDone;
    }
    return true; // for all tasks
  });

  const handleDeleteTask = async (taskId) => {
    setDeletingTaskId(taskId);
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("There was an error deleting the task!", error);
    } finally {
      setDeletingTaskId(null);
    }
  };

  const handleToggleTask = async (taskId, newStatus) => {
    setTogglingTaskId(taskId);
    try {
      const updatedTask = await toggleTaskStatus(taskId, newStatus);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error("There was an error updating the task!", error);
    } finally {
      setTogglingTaskId(null);
    }
  };

  const handleOpenEditModal = (taskToEdit) => {
    setEditingTask(taskToEdit);
  };

  const handleUpdateTask = async (taskId, newTitle) => {
    setSavingTaskId(taskId);
    try {
      const updatedTask = await updateTask(taskId, newTitle);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
      setEditingTask(null);
    } catch (error) {
      console.error("There was an error updating the task!", error);
    } finally {
      setSavingTaskId(null);
    }
  };

  const handleOpenConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleClearCompleted = async () => {
    setDeleteAllTaskDone(true);
    try {
      await clearCompletedTasks();
      setTasks((prevTasks) => prevTasks.filter((task) => !task.isDone));
    } catch (error) {
      console.error("There was an error clearing completed tasks!", error);
    } finally {
      setDeleteAllTaskDone(false);
      setIsConfirmModalOpen(false);
    }
  };

  return (
    <div className='relative flex flex-col min-h-screen max-h-screen w-full lg:min-h-[600px] lg:max-h-[60vh] lg:w-[800px] lg:bg-main-background lg:shadow-xl lg:rounded-lg transition-colors duration-300 ease-in-out z-30'>
      <Header />
      <main className='mt-4 lg:mt-10 px-8 md:px-16 flex flex-col flex-1 min-h-0'>
        <AddTaskForm onTaskAdd={handleAddTask} isLoading={isAddingTask} />

        <div className='lg:hidden'>
          <TaskFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        <div className='flex-1 overflow-y-auto pr-1'>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <TaskList
              tasks={filteredTasks}
              onDelete={handleDeleteTask}
              onToggle={handleToggleTask}
              onEdit={handleOpenEditModal}
              isDeleting={deletingTaskId}
              togglingTaskId={togglingTaskId}
            />
          )}
        </div>
      </main>
      <Footer
        itemsLeft={activeTasksCount}
        onOpenConfirmModal={handleOpenConfirmModal}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {editingTask && (
        <EditTaskModal
          taskToEdit={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleUpdateTask}
          isSaving={savingTaskId === editingTask.id}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmModal
          onConfirm={handleClearCompleted}
          onCancel={() => setIsConfirmModalOpen(false)}
          isDeleting={deleteAllTaskDone}
        />
      )}
    </div>
  );
}
