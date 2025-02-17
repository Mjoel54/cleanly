import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TASK, GET_TASKS, GET_ROOMS } from "../../utils/api/index";
// import TaskActionsDropdown from "./TaskActionsDropdown";
import DeleteTaskModal from "./DeleteTaskModal";
import successNotification from "../../utils/successNotification";
import DropdownMenu, {
  ButtonItem,
  redButtonStyling,
} from "../General/DropdownMenu";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

interface TaskActionsProps {
  taskId: string;
}

export default function TaskActions({ taskId }: TaskActionsProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Delete mutation
  const [deleteTask, { loading: isDeleting }] = useMutation(DELETE_TASK, {
    variables: { taskId: taskId },
    refetchQueries: [{ query: GET_TASKS }, { query: GET_ROOMS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setIsDeleteModalOpen(false);
      successNotification("Task deleted");
    },
  });

  const menuItems: ButtonItem[] = [
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
        onConfirm={() => deleteTask()}
        isDeleting={isDeleting}
      />
    </>
  );
}
