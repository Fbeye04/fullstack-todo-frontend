import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import AddTaskForm from "./components/AddTaskForm";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import EditTaskModal from "./components/EditTaskModal";
import ConfirmModal from "./components/ConfirmModal";
import Footer from "./components/Footer";

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((response) => {
      setTasks(response.data);
    });
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
      });
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
    axios
      .delete(`http://localhost:5000/tasks/${taskId}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        console.error("There was an error deleting the task!", error);
      });
  };

  const handleToggleTask = (taskId, newStatus) => {
    axios
      .put(`http://localhost:5000/tasks/${taskId}`, { isDone: newStatus })
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? response.data : task))
        );
      })
      .catch((error) => {
        console.error("There was an error updating the task!", error);
      });
  };

  const handleOpenEditModal = (taskToEdit) => {
    setEditingTask(taskToEdit);
  };

  const handleUpdateTask = (taskId, newTitle) => {
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
      });
  };

  const handleClearCompleted = () => {
    axios
      .delete("http://localhost:5000/tasks/completed")
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => !task.isDone));
      })
      .catch((error) => {
        console.error("There was an error clearing completed tasks!", error);
      });
  };

  const handleOpenConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  return (
    <div className='relative flex flex-col min-h-screen max-h-screen w-full lg:min-h-[600px] lg:max-h-[60vh] lg:w-[800px] lg:bg-main-background lg:shadow-xl lg:rounded-lg transition-colors duration-300 ease-in-out z-30'>
      <Header />
      <main className='mt-4 lg:mt-10 px-8 md:px-16 flex flex-col flex-1 min-h-0'>
        <AddTaskForm onTaskAdd={handleAddTask} />

        <div className='lg:hidden'>
          <TaskFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        <div className='flex-1 overflow-y-auto pr-1'>
          <TaskList
            tasks={filteredTasks}
            onDelete={handleDeleteTask}
            onToggle={handleToggleTask}
            onEdit={handleOpenEditModal}
          />
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
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmModal
          onConfirm={() => {
            handleClearCompleted();
            setIsConfirmModalOpen(false);
          }}
          onCancel={() => setIsConfirmModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
