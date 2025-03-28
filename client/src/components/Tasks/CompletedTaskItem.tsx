import React from "react";
import TaskItemDropdown from "./TaskItemDropdown";

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
    <div className="bg-gray-50 shadow-sm rounded-lg my-5 ring-1 ring-black/5">
      <div className="px-6 py-4">
        <div className="flex flex-row justify-between items-center">
          {/* Left section: Task details */}
          <div className="flex flex-col space-y-1">
            <h2 className="text-lg font-semibold text-gray-500 line-through truncate">
              {taskName}
            </h2>
            <p className="text-sm text-gray-500 line-through truncate">
              {room}
            </p>
          </div>

          {/* Task Actions (Right Side) */}
          <div>
            <TaskItemDropdown taskId={taskID} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedTaskItem;
