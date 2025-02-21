import React from "react";
import TaskActions from "./TaskActions";

// Define props type
interface CompletedTaskItemProps {
  taskName: string;
  taskID: string;
  room: string;
  children?: React.ReactNode; // This allows passing a TaskActions component
}

// TaskCard Component
const CompletedTaskItem: React.FC<CompletedTaskItemProps> = ({
  taskName,
  taskID,
  room,
}: CompletedTaskItemProps) => {
  return (
    <div className="bg-gray-50 shadow-sm sm:rounded-lg my-5 ring-1 ring-black/5">
      <div className="px-3 py-4 sm:px-6 sm:py-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-1">
          {/* Left section: Task details */}
          <div className="flex flex-col space-y-1">
            <h2 className="text-lg font-semibold text-gray-500 line-through">
              {taskName}
            </h2>
            <p className="text-sm text-gray-500 line-through">{room}</p>
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

export default CompletedTaskItem;
