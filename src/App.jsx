import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import AddTaskForm from "./components/AddTaskForm";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);

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

  return (
    <div className='relative container mx-auto lg:bg-main-background lg:flex lg:flex-col lg:w-[800px] py-10 px-8 md:py-12 md:px-10 lg:shadow-xl lg:rounded-lg transition-colors duration-300 ease-in-out z-30'>
      <Header />
      <main className='mt-14 lg:mt-10'>
        <AddTaskForm onTaskAdd={handleAddTask} />
        <TaskFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <TaskList
          tasks={filteredTasks}
          onDelete={handleDeleteTask}
          onToggle={handleToggleTask}
        />
      </main>
    </div>
  );
}

export default App;
