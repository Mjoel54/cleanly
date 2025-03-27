import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { deleteTask } from "../../redux/actions/taskActions";
import DeleteTaskModal from "./DeleteTaskModal";
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
} from "@heroicons/react/24/outline";

interface TaskItemDropdownProps {
  taskId: string;
}

export default function TaskItemDropdown({ taskId }: TaskItemDropdownProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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

  const handleCompleteTask = () => {
    // TODO: Implement complete task action
    console.log("Complete task");
  };

  const menuItems: ButtonItem[] = [
    {
      name: "Mark as done",
      action: handleCompleteTask,
      icon: <CheckIcon className="h-4 w-4" />,
    },
    {
      name: "Edit",
      action: () => console.log("Edit task"),
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
    </>
  );
}
