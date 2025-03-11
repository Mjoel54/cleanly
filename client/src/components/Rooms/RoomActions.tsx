import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_ROOM, GET_ROOMS } from "../../utils/api/index";
import RenameRoomModal from "./RenameRoomModal";
import successNotification from "../../utils/successNotification";

interface RoomActionsProps {
  roomId: string;
  currentName: string;
}

export default function RoomActions({ roomId, currentName }: RoomActionsProps) {
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

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

  return (
    <>
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
