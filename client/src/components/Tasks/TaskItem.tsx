import React from "react";
import dueInFormatting from "../../utils/dueInFormatting";
import TaskItemDropdown from "./TaskItemDropdown";
import { Task } from "../../interfaces/Task";
// import DeleteTaskModal from "./DeleteTaskModal";

interface TaskItemProps {
  task: Task;
  children?: React.ReactNode;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }: TaskItemProps) => {
  return (
    <div className="bg-white shadow-sm rounded-lg my-5 ring-1 ring-black/5">
      <div className="px-6 py-4">
        <div className="flex flex-row justify-between items-center">
          {/* Left section: Task details */}
          <div className="flex flex-col space-y-1">
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {task.name}
            </h2>
            <p className="text-sm text-gray-500 truncate">{task.room.name}</p>
            {dueInFormatting(task.dueDate)}
          </div>

          {/* Task Actions (Right Side) */}
          <div>
            <TaskItemDropdown taskId={task._id} task={task} />
          </div>
        </div>
      </div>
      {/* <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => deleteTask()}
        isDeleting={isDeleting}
      /> */}
    </div>
  );
};

export default TaskItem;
