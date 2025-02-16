import { useQuery } from "@apollo/client";

// import helper functions
import { GET_TASKS } from "../../utils/api/index";

import TaskCard from "./TaskCard";

// import types
import { TaskResponse } from "../../interfaces/Task";

export default function TasksList() {
  const { loading, error, data } = useQuery(GET_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const tasks = data?.tasks || [];
  console.log(tasks);

  return (
    <div>
      {tasks.map((task: TaskResponse) => (
        <TaskCard
          key={task._id}
          taskName={task.name}
          taskID={task._id}
          // roomName={task.room.name}
          // dueDate={dayjs.unix(task.dueDate).format("DD/MM/YYYY")}
          dueDate={task.dueDate}
        />
      ))}
    </div>
  );
}
