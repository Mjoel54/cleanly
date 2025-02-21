import TaskItem from "./TaskItem";

// import types
import { TaskResponse } from "../../interfaces/Task";

interface TaskListProps {
  completedTasks: TaskResponse[];
  incompleteTasks: TaskResponse[];
}

export default function TaskList({
  completedTasks,
  incompleteTasks,
}: TaskListProps) {
  return (
    <div>
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
      {completedTasks.length > 0 ? (
        <>
          <hr className="border-t border-gray-300 mt-6" />
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
        </>
      ) : (
        ""
      )}
    </div>
  );
}
