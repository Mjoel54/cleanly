import TaskItem from "./TaskItem";
import CompletedTaskItem from "./CompletedTaskItem";
import { TaskResponse } from "../../interfaces/Task";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks } from "../../redux/actions/taskActions";
import { RootState, AppDispatch } from "../../redux/store";

// FilteredTasks component handles the filtering logic
function FilteredTasks({ tasks }: { tasks: TaskResponse[] }) {
  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

  return (
    <div>
      {incompleteTasks.map((task: TaskResponse) => (
        <TaskItem
          key={task._id}
          taskName={task.name}
          taskID={task._id}
          room={task.room.name}
          dueDate={task.dueDate}
        />
      ))}
      {completedTasks.length > 0 ? (
        <>
          {incompleteTasks.length > 0 ? (
            <hr className="border-t border-gray-300 mt-6" />
          ) : null}
          {completedTasks.length > 0 ? (
            <h2 className="text-lg font-semibold text-gray-600 my-4 ml-1">
              Completed
            </h2>
          ) : null}

          {completedTasks.map((task: TaskResponse) => (
            <CompletedTaskItem
              key={task._id}
              taskName={task.name}
              taskID={task._id}
              room={task.room.name}
            />
          ))}
        </>
      ) : null}
    </div>
  );
}

export default function TaskList() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: tasks,
    status,
    error,
  } = useSelector((state: RootState) => state.reducer.tasks);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <FilteredTasks tasks={tasks} />;
}
