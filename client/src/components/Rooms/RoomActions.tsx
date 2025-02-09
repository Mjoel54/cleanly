import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_ROOM, GET_ROOMS } from "../../utils/api/index";
import NewDropdown from "./NewDropdown";
import DeleteRoomModal from "./DeleteRoomModal";
import SuccessNotification from "../Notifications/SuccessNotification";

interface RoomActionsProps {
  roomId: string;
  onRename: () => void;
}

export default function RoomActions({ roomId, onRename }: RoomActionsProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [deleteRoom, { loading: isDeleting }] = useMutation(DELETE_ROOM, {
    variables: { deleteRoomId: roomId },
    refetchQueries: [{ query: GET_ROOMS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setIsDeleteModalOpen(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    },
  });

  const handleDuplicate = () => {
    // Implement duplicate functionality
    console.log("Duplicate room:", roomId);
  };

  return (
    <>
      <NewDropdown
        onDelete={() => setIsDeleteModalOpen(true)}
        onRename={onRename}
        onDuplicate={handleDuplicate}
      />

      <DeleteRoomModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => deleteRoom()}
        isDeleting={isDeleting}
      />

      <SuccessNotification
        show={showNotification}
        onClose={() => setShowNotification(false)}
        title="Room deleted successfully"
      />
    </>
  );
}
