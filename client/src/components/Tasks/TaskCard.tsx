import React from "react";
import TaskActions from "./TaskActions";

// Define props type
interface TaskCardProps {
  taskName: string;
  dueDate: string;
  taskID: string;
  children?: React.ReactNode; // This allows passing a TaskActions component
}

// TaskCard Component
const TaskCard: React.FC<TaskCardProps> = ({
  taskName,
  dueDate,
  taskID,
}: TaskCardProps) => {
  return (
    <div className="bg-white shadow-sm sm:rounded-lg my-5">
      <div className="px-3 py-4 sm:p-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
          {/* Left section: Task details */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800">{taskName}</h2>
            <p className="text-sm text-gray-500">Kitchen</p>
            <p className="text-sm text-gray-500">Due: {dueDate}</p>
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
