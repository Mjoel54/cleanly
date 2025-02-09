import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useMutation } from "@apollo/client";
import SuccessNotification from "../Notifications/SuccessNotification";
import { DELETE_ROOM, GET_ROOMS } from "../../utils/api/index";

interface DropdownProps {
  roomId: string;
}

export default function Dropdown({ roomId }: DropdownProps) {
  const [showNotification, setShowNotification] = useState(false);
  const [deleteRoom, { loading }] = useMutation(DELETE_ROOM, {
    variables: { deleteRoomId: roomId },
    refetchQueries: [{ query: GET_ROOMS }], // ✅ Automatically refresh RoomTable
    awaitRefetchQueries: true, // ✅ Ensures fresh data before continuing
    onCompleted: () => {
      setShowNotification(true);
      // Auto-hide after 3 seconds
      setTimeout(() => setShowNotification(false), 3000);
    },
  });

  // console.log("Received roomId in Dropdown:", roomId);

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 cursor-pointer">
            Options
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 size-5 text-gray-400"
            />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                Rename
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                Duplicate
              </a>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => deleteRoom()} // ✅ Correctly triggers mutation
                disabled={loading}
                className="block px-4 py-2 text-sm w-full text-left  text-red-600 data-focus:bg-gray-100 data-focus:text-red-700 data-focus:outline-hidden cursor-pointer"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
      <SuccessNotification
        show={showNotification}
        onClose={() => setShowNotification(false)}
        title="Room added!"
      />
    </>
  );
}
