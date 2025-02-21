import TaskItem from "./TaskItem";

// import types
import { TaskResponse } from "../../interfaces/Task";

export default function TaskList({ completedTasks, incompleteTasks }) {
  return (
    <div>
      <p>Incomplete Tasks:</p>
      {incompleteTasks.map((task: TaskResponse) => (
        <TaskItem
          key={task._id}
          taskName={task.name}
          taskID={task._id}
          room={task.room.name}
          status={task.status}
          // dueDate={dayjs.unix(task.dueDate).format("DD/MM/YYYY")}
          dueDate={task.dueDate}
        />
      ))}
      <hr />
      <p>Completed Tasks:</p>
      {completedTasks.map((task: TaskResponse) => (
        <TaskItem
          key={task._id}
          taskName={task.name}
          taskID={task._id}
          room={task.room.name}
          status={task.status}
          // dueDate={dayjs.unix(task.dueDate).format("DD/MM/YYYY")}
          dueDate={task.dueDate}
        />
      ))}
    </div>
  );
}
