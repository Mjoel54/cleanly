import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_ROOM, UPDATE_ROOM, GET_ROOMS } from "../../utils/api/index";
import NewDropdown from "./NewDropdown";
import DeleteRoomModal from "./DeleteRoomModal";
import RenameRoomModal from "./RenameRoomModal";
import SuccessNotification from "../Notifications/SuccessNotification";

interface RoomActionsProps {
  roomId: string;
  currentName: string;
}

export default function RoomActions({ roomId, currentName }: RoomActionsProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

  // Notification state
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

  // Delete mutation
  const [deleteRoom, { loading: isDeleting }] = useMutation(DELETE_ROOM, {
    variables: { deleteRoomId: roomId },
    refetchQueries: [{ query: GET_ROOMS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setIsDeleteModalOpen(false);
      showNotification("Room deleted successfully");
    },
  });

  // Update mutation
  const [updateRoom, { loading: isUpdating }] = useMutation(UPDATE_ROOM, {
    refetchQueries: [{ query: GET_ROOMS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setIsRenameModalOpen(false);
      showNotification("Room updated successfully");
    },
  });

  const showNotification = (message: string) => {
    setNotification({ show: true, message });
    setTimeout(() => {
      setNotification({ show: false, message: "" });
    }, 3000);
  };

  const handleUpdateRoom = (newName: string) => {
    if (newName.trim() && newName !== currentName) {
      updateRoom({
        variables: {
          updateRoomId: roomId,
          name: newName,
        },
      });
    }
  };

  const handleDuplicate = () => {
    // Implement duplicate functionality
    console.log("Duplicate room:", roomId);
  };

  return (
    <>
      <NewDropdown
        onDelete={() => setIsDeleteModalOpen(true)}
        onRename={() => setIsRenameModalOpen(true)}
        onDuplicate={handleDuplicate}
      />

      <DeleteRoomModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => deleteRoom()}
        isDeleting={isDeleting}
      />

      <RenameRoomModal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        onSubmit={handleUpdateRoom}
        currentName={currentName}
        isSubmitting={isUpdating}
      />

      <SuccessNotification
        show={notification.show}
        onClose={() => setNotification({ show: false, message: "" })}
        title={notification.message}
      />
    </>
  );
}
