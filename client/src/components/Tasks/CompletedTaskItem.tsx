import React from "react";
import TaskItemDropdown from "./TaskItemDropdown";
import { Task } from "../../interfaces/Task";

// Define props type
interface CompletedTaskItemProps {
  task: Task;
  children?: React.ReactNode; // This allows passing a TaskActions component
}

// TaskCard Component
const CompletedTaskItem: React.FC<CompletedTaskItemProps> = ({
  task,
}: CompletedTaskItemProps) => {
  return (
    <div className="bg-gray-50 shadow-sm rounded-lg my-5 ring-1 ring-black/5">
      <div className="px-6 py-4">
        <div className="flex flex-row justify-between items-center">
          {/* Left section: Task details */}
          <div className="flex flex-col space-y-1">
            <h2 className="text-lg font-semibold text-gray-500 line-through truncate">
              {task.name}
            </h2>
            <p className="text-sm text-gray-500 line-through truncate">
              {task.room.name}
            </p>
          </div>

          {/* Task Actions (Right Side) */}
          <div>
            <TaskItemDropdown taskId={task._id} task={task} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedTaskItem;
