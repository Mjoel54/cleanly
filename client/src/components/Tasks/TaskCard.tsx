import React from "react";
import TaskActions from "./TaskActions";
import dueInFormatting from "../../utils/dueInFormatting";

// Define props type
interface TaskCardProps {
  taskName: string;
  dueDate: number;
  taskID: string;
  room: string;
  children?: React.ReactNode; // This allows passing a TaskActions component
}

// TaskCard Component
const TaskCard: React.FC<TaskCardProps> = ({
  taskName,
  dueDate,
  taskID,
  room,
}: TaskCardProps) => {
  return (
    <div className="bg-white shadow-sm sm:rounded-lg my-5">
      <div className="px-3 py-4 sm:px-6 sm:py-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-1">
          {/* Left section: Task details */}
          <div className="flex flex-col space-y-1">
            <h2 className="text-lg font-semibold text-gray-800">{taskName}</h2>
            <p className="text-sm text-gray-500">{room}</p>
            {dueInFormatting(dueDate)}
          </div>

          {/* Task Actions (Right Side) */}
          <div>
            <TaskActions taskId={taskID} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
