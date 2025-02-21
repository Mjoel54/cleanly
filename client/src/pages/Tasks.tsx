import TaskList from "../components/Tasks/TaskList";
import TaskPageHeader from "../components/Tasks/TaskPageHeader";
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "../utils/api/index";
import { useState, useEffect } from "react";
import { Task } from "../interfaces/Task";

export default function Tasks() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);

  const { loading, error, data } = useQuery(GET_TASKS);

  // Move the tasks filtering logic into a useEffect
  useEffect(() => {
    const tasks = data?.tasks || [];

    if (tasks.length > 0) {
      const completed = tasks.filter((task: Task) => task.isCompleted === true);
      setCompletedTasks(completed);

      const incomplete = tasks.filter(
        (task: Task) => task.isCompleted === false
      );
      setIncompleteTasks(incomplete);
    }
  }, [data]); // Only run when data changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
