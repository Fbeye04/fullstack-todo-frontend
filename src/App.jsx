import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import AddTaskForm from "./components/AddTaskForm";
import TaskFilters from "./components/TaskFilters";
import SkeletonLoader from "./components/SkeletonLoader";
import TaskList from "./components/TaskList";
import EditTaskModal from "./components/EditTaskModal";
import ConfirmModal from "./components/ConfirmModal";
import Footer from "./components/Footer";

function App() {
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
    setIsLoading(true);
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      })
      .finally(() => {
        setIsLoading(false);
      }, 5000);
  }, []);

  useEffect(() => {
    if (editingTask) {
      document.body.classList.add("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [editingTask]);

  const handleAddTask = (newTitle) => {
    setAddingTask(true);
    axios
      .post("http://localhost:5000/tasks", {
        title: newTitle,
        isDone: false,
      })
      .then((response) => {
        const newlyCreatedTask = response.data;
        setTasks((prevTasks) => [...prevTasks, newlyCreatedTask]);
      })
      .catch((error) => {
        console.error("There was an error adding the task!", error);
      })
      .finally(() => setAddingTask(false));
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

  const handleDeleteTask = (taskId) => {
    setDeletingTaskId(taskId);
    axios
      .delete(`http://localhost:5000/tasks/${taskId}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        console.error("There was an error deleting the task!", error);
      })
      .finally(() => {
        setDeletingTaskId(null);
      });
  };

  const handleToggleTask = (taskId, newStatus) => {
    setTogglingTaskId(taskId);
    axios
      .put(`http://localhost:5000/tasks/${taskId}`, { isDone: newStatus })
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? response.data : task))
        );
      })
      .catch((error) => {
        console.error("There was an error updating the task!", error);
      })
      .finally(() => {
        setTogglingTaskId(null);
      });
  };

  const handleOpenEditModal = (taskToEdit) => {
    setEditingTask(taskToEdit);
  };

  const handleUpdateTask = (taskId, newTitle) => {
    setSavingTaskId(taskId);
    axios
      .put(`http://localhost:5000/tasks/${taskId}`, { title: newTitle })
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? response.data : task))
        );
        setEditingTask(null);
      })
      .catch((error) => {
        console.error("There was an error updating the task!", error);
      })
      .finally(() => {
        setSavingTaskId(null);
      });
  };

  const handleOpenConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleClearCompleted = () => {
    setDeleteAllTaskDone(true);
    axios
      .delete("http://localhost:5000/tasks/completed")
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => !task.isDone));
      })
      .catch((error) => {
        console.error("There was an error clearing completed tasks!", error);
      })
      .finally(() => {
        setDeleteAllTaskDone(false);
        setIsConfirmModalOpen(false);
      });
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

export default App;
