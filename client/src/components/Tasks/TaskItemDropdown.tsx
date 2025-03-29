import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { deleteTask, updateTask } from "../../redux/actions/taskActions";
import DeleteTaskModal from "./DeleteTaskModal";
import UpdateTaskForm from "./UpdateTaskForm";
import successNotification from "../../utils/successNotification";
import DropdownMenu, {
  ButtonItem,
  redButtonStyling,
} from "../General/DropdownMenu";
import {
  TrashIcon,
  PencilIcon,
  EllipsisVerticalIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Task } from "../../interfaces/Task";

interface TaskItemDropdownProps {
  taskId: string;
  task: Task;
}

export default function TaskItemDropdown({
  taskId,
  task,
}: TaskItemDropdownProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteTask = async () => {
    try {
      await dispatch(deleteTask(taskId));
      setIsDeleteModalOpen(false);
      successNotification("Task deleted");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCompleteTask = async () => {
    try {
      await dispatch(
        updateTask({
          taskId,
          input: {
            isCompleted: true,
          },
        })
      );
      successNotification("Task completed");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleIncompleteTask = async () => {
    try {
      await dispatch(
        updateTask({
          taskId,
          input: {
            isCompleted: false,
          },
        })
      );
      successNotification("Task marked as incomplete");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const menuItems: ButtonItem[] = [
    ...(task.isCompleted
      ? [
          {
            name: "Mark as incomplete",
            action: handleIncompleteTask,
            icon: <XMarkIcon className="h-4 w-4" />,
          },
        ]
      : [
          {
            name: "Mark as done",
            action: handleCompleteTask,
            icon: <CheckIcon className="h-4 w-4" />,
          },
        ]),
    {
      name: "Edit",
      action: () => setIsUpdateModalOpen(true),
      icon: <PencilIcon className="h-4 w-4" />,
    },
    {
      name: "Delete",
      action: () => setIsDeleteModalOpen(true),
      icon: <TrashIcon className="h-4 w-4" />,
      className: redButtonStyling,
    },
  ];

  return (
    <>
      <DropdownMenu
        buttonIcon={<EllipsisVerticalIcon className="h-4 w-4" />}
        menuItems={menuItems}
      />

      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteTask}
        isDeleting={false}
      />

      <UpdateTaskForm
        task={task}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      />
    </>
  );
}
