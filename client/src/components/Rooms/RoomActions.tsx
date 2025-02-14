import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  DELETE_ROOM,
  UPDATE_ROOM,
  GET_ROOMS,
  GET_TASKS,
} from "../../utils/api/index";
import RoomActionsDropdown from "./RoomActionsDropdown";
import DeleteRoomModal from "./DeleteRoomModal";
import RenameRoomModal from "./RenameRoomModal";
import successNotification from "../../utils/successNotification";

interface RoomActionsProps {
  roomId: string;
  currentName: string;
}

export default function RoomActions({ roomId, currentName }: RoomActionsProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

  // Delete mutation
  const [deleteRoom, { loading: isDeleting }] = useMutation(DELETE_ROOM, {
    variables: { deleteRoomId: roomId },
    refetchQueries: [{ query: GET_ROOMS }, { query: GET_TASKS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setIsDeleteModalOpen(false);
      successNotification("Room deleted");
    },
  });

  // Update mutation
  const [updateRoom, { loading: isUpdating }] = useMutation(UPDATE_ROOM, {
    refetchQueries: [{ query: GET_ROOMS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setIsRenameModalOpen(false);
      successNotification("Room updated");
    },
  });

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
      <RoomActionsDropdown
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
    </>
  );
}
