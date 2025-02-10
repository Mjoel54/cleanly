import { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_ROOM, GET_ROOMS } from "../../utils/api/index";
import SuccessNotification from "../Notifications/SuccessNotification";

export interface EditableRoomNameProps {
  roomName: string;
  roomId: string;
}

const EditableRoomName = ({ roomName, roomId }: EditableRoomNameProps) => {
  const [showNotification, setShowNotification] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(roomName);
  const inputRef = useRef(null);

  const [updateRoom] = useMutation(UPDATE_ROOM, {
    refetchQueries: [{ query: GET_ROOMS }], // ✅ Automatically refresh RoomTable
    awaitRefetchQueries: true, // ✅ Ensures fresh data before continuing
    onCompleted: () => {
      setShowNotification(true);
      // Auto-hide after 3 seconds
      setTimeout(() => setShowNotification(false), 3000);
    },
  });

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editedName !== roomName) {
      updateRoom({ updateRoomId: roomId, name: editedName });
    }
  };

  // {  "updateRoomId": "67a66d9e265f23eeeefb15dd",
  //   "name": "KITCHEN_UPDATED_TEST"
  // }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputRef.current?.blur();
    }
    if (e.key === "Escape") {
      setEditedName(roomName);
      setIsEditing(false);
    }
  };

  return (
    <>
      <div className="min-w-[150px]">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        ) : (
          <h3
            className="font-semibold cursor-pointer hover:bg-gray-50 px-1 py-0.5 rounded -mx-1"
            onDoubleClick={handleDoubleClick}
          >
            {roomName}
          </h3>
        )}
      </div>
      <SuccessNotification
        show={showNotification}
        onClose={() => setShowNotification(false)}
        title="Room added!"
      />
    </>
  );
};

export default EditableRoomName;
