import TaskItem from "./TaskItem";
import CompletedTaskItem from "./CompletedTaskItem";

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
          // dueDate={dayjs.unix(task.dueDate).format("DD/MM/YYYY")}
          dueDate={task.dueDate}
        />
      ))}
      {completedTasks.length > 0 ? (
        <>
          {incompleteTasks.length > 0 ? (
            <hr className="border-t border-gray-300 mt-6" />
          ) : (
            <> </>
          )}
          {completedTasks.length > 0 ? (
            <h2 className="text-lg font-semibold text-gray-600 my-4 ml-1">
              Completed
            </h2>
          ) : (
            <></>
          )}

          {completedTasks.map((task: TaskResponse) => (
            <CompletedTaskItem
              key={task._id}
              taskName={task.name}
              taskID={task._id}
              room={task.room.name}
              // dueDate={dayjs.unix(task.dueDate).format("DD/MM/YYYY")}
            />
          ))}
        </>
      ) : (
        <> </>
      )}
    </div>
  );
}
