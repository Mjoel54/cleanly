import TaskList from "../components/Tasks/TaskList";
import TaskPageHeader from "../components/Tasks/TaskPageHeader";
import { useState, useEffect } from "react";
import { Task } from "../interfaces/Task";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks } from "../redux/TaskDataSlice"; // Update the path
import { RootState, AppDispatch } from "../redux/store"; // Make sure to import your store types

export default function Tasks() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: tasks,
    loading,
    error,
  } = useSelector((state: RootState) => state.tasks);

  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [incompleteTasks, setIncompleteTasks] = useState<Task[]>([]);

  // Fetch tasks when component mounts
  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  // Filter tasks when they change
  useEffect(() => {
    if (tasks.length > 0) {
      const completed = tasks.filter((task: Task) => task.isCompleted === true);
      setCompletedTasks(completed);

      const incomplete = tasks.filter(
        (task: Task) => task.isCompleted === false
      );
      setIncompleteTasks(incomplete);
    }
  }, [tasks]); // Only run when tasks change

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="px-16 py-12">
        <TaskPageHeader />
        <TaskList
          completedTasks={completedTasks}
          incompleteTasks={incompleteTasks}
        />
      </div>
    </>
  );
}
