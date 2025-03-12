import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import DeleteRoomModal from "./DeleteRoomModal";
import RenameRoomModal from "./RenameRoomModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { deleteRoom, updateRoom } from "../../redux/actions/roomActions";
import SuccessNotification from "../../utils/successNotification";

interface RoomItemMenuProps {
  roomId: string;
  currentName: string; // Add this prop to receive the current room name
}

export default function RoomItemMenu({
  roomId,
  currentName,
}: RoomItemMenuProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  // Get loading state for rename operation from Redux store
  const { status } = useSelector((state: RootState) => state.reducer.rooms);
  const loading = status === "loading";

  const handleRenameRoom = (newName: string) => {
    if (newName.trim() && newName !== currentName) {
      // Dispatch the updateRoom action
      dispatch(updateRoom({ updateRoomId: roomId, name: newName }));
      // Close the modal after dispatching
      setIsRenameModalOpen(false);
      SuccessNotification("Room updated");
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-inset hover:bg-gray-100 cursor-pointer">
          <EllipsisVerticalIcon className="h-4 w-4" />
        </MenuButton>
      </div>

      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden">
        <div className="m-1">
          <MenuItem>
            <button
              onClick={() => setIsRenameModalOpen(true)}
              className="block w-full px-4 py-2 text-left text-sm rounded-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden cursor-pointer inline-flex items-center gap-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              Rename
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="block w-full px-4 py-2 text-left text-sm rounded-sm text-red-600 data-focus:bg-gray-100 data-focus:text-red-700 data-focus:outline-hidden cursor-pointer inline-flex items-center gap-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              Delete
            </button>
          </MenuItem>
        </div>
      </MenuItems>
      <DeleteRoomModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => dispatch(deleteRoom(roomId))}
      />
      <RenameRoomModal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        onSubmit={handleRenameRoom}
        currentName={currentName}
        isSubmitting={loading}
      />
    </Menu>
  );
}
