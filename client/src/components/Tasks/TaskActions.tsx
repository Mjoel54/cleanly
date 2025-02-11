import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TASK, GET_TASKS } from "../../utils/api/index";
import TaskActionsDropdown from "./TaskActionsDropdown";
import DeleteTaskModal from "./DeleteTaskModal";
import SuccessNotification from "../Notifications/SuccessNotification";

interface TaskActionsProps {
  taskId: string;
}

export default function TaskActions({ taskId }: TaskActionsProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Notification state
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

  // Delete mutation
  const [deleteTask, { loading: isDeleting }] = useMutation(DELETE_TASK, {
    variables: { taskId: taskId },
    refetchQueries: [{ query: GET_TASKS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setIsDeleteModalOpen(false);
      showNotification("Room deleted");
    },
  });

  const showNotification = (message: string) => {
    setNotification({ show: true, message });
    setTimeout(() => {
      setNotification({ show: false, message: "" });
    }, 3000);
  };

  return (
    <>
      <TaskActionsDropdown
        onDelete={() => setIsDeleteModalOpen(true)}
        onEdit={{}} // onEdit={() => setIsRenameModalOpen(true)}
      />

      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => deleteTask()}
        isDeleting={isDeleting}
      />

      {/* <RenameRoomModal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        onSubmit={handleUpdateRoom}
        currentName={currentName}
        isSubmitting={isUpdating}
      /> */}

      <SuccessNotification
        show={notification.show}
        onClose={() => setNotification({ show: false, message: "" })}
        title={notification.message}
      />
    </>
  );
}
