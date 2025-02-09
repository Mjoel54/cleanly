import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useMutation } from "@apollo/client";
import SuccessNotification from "../Notifications/SuccessNotification";
import { DELETE_ROOM, GET_ROOMS, UPDATE_ROOM } from "../../utils/api/index";

interface DropdownProps {
  roomId: string;
}

export default function Dropdown({ roomId }: DropdownProps) {
  const [showNotification, setShowNotification] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");

  // handles room deletion
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

  //handles room update
  const [updateRoom] = useMutation(UPDATE_ROOM, {
    refetchQueries: [{ query: GET_ROOMS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setShowNotification(true);
      setIsEditModalOpen(false);
      setTimeout(() => setShowNotification(false), 3000);
    },
  });

  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setNewRoomName(e.target.value);
  };

  const handleUpdateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoomName.trim()) {
      const updatedRoom = {
        updateRoomId: roomId,
        name: newRoomName,
      };
      updateRoom({ variables: updatedRoom });
      setNewRoomName(""); // Reset input
    }
  };

  // {  "updateRoomId": "67a66d9e265f23eeeefb15dd",
  //   "name": "KITCHEN_UPDATED_TEST"
  // }

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
          <div className="m-1">
            <MenuItem>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="block w-full px-4 py-2 text-left text-sm rounded-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden cursor-pointer"
              >
                Rename
              </button>
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
                className="block px-4 py-2 text-sm w-full text-left rounded-sm text-red-600 data-focus:bg-gray-100 data-focus:text-red-700 data-focus:outline-hidden cursor-pointer"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
      {isEditModalOpen ? (
        <div className="bg-white shadow-sm sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold text-gray-900">
              Update your email
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Change the email address you want associated with your account.
              </p>
            </div>
            <form
              onSubmit={handleUpdateRoom}
              className="mt-5 sm:flex sm:items-center"
            >
              <div className="w-full sm:max-w-xs">
                <input
                  id="newRoomName"
                  name="newRoomName"
                  type="text"
                  onChange={handleRoomChange}
                  aria-label="Email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <button
                type="submit"
                className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-0 sm:ml-3 sm:w-auto"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Room Name</DialogTitle>
            <DialogDescription>
              Enter a new name for this room
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateRoom} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="roomName">Room Name</Label>
              <Input
                id="roomName"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                placeholder="Enter new room name"
                className="w-full"
              />
            </div>
            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={updateLoading || !newRoomName.trim()}
              >
                {updateLoading ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog> */}
      <SuccessNotification
        show={showNotification}
        onClose={() => setShowNotification(false)}
        title="Room updated"
      />
    </>
  );
}
