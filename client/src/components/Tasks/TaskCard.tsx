import React from "react";

// Define props type
interface TaskCardProps {
  taskName: string;
  roomName: string;
  dueDate: string;
  children?: React.ReactNode; // This allows passing a TaskActions component
}

// TaskCard Component
const TaskCard: React.FC<TaskCardProps> = ({
  taskName,
  roomName,
  dueDate,
  children,
}) => {
  return (
    <div className="bg-white shadow-sm sm:rounded-lg my-5">
      <div className="px-3 py-4 sm:p-6">
        {/* Task Details */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800">{taskName}</h2>
          <p className="text-sm text-gray-500">{roomName}</p>
          <p className="text-sm text-gray-500">Due: {dueDate}</p>
        </div>

        {/* Task Actions (Right Side) */}
        <div className="flex items-center space-x-2">{children}</div>
      </div>
    </div>
  );
};

export default TaskCard;
