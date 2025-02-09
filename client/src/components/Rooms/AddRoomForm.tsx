import { useState } from "react";
import { useMutation } from "@apollo/client";

// import helper functions
import { CREATE_ROOM, GET_ROOMS } from "../../utils/api/index";

// import components
import SuccessNotification from "../Notifications/SuccessNotification";

// import types
import { RoomRequest } from "../../interfaces/Room";

export default function AddTaskForm() {
  const [roomName, setRoomName] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const [createRoom] = useMutation(CREATE_ROOM, {
    refetchQueries: [{ query: GET_ROOMS }], // ✅ Automatically refresh RoomTable
    awaitRefetchQueries: true, // ✅ Ensures fresh data before continuing
    onCompleted: () => {
      setShowNotification(true);
      // Auto-hide after 3 seconds
      setTimeout(() => setShowNotification(false), 3000);
    },
  });

  //   const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setRoomName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (roomName.trim()) {
      const newRoom: RoomRequest = { name: roomName };
      createRoom({ variables: newRoom });
      setRoomName(""); // Reset input field
      // window.location.assign("/rooms");
    }
  };

  // useEffect(() => {
  //   // console.log(createRoomData, createRoomLoading, createRoomError, createRoom);
  // });

  return (
    <div className="bg-white shadow-sm sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold text-gray-900">Add a room</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          {/* <p>Change the email address you want associated with your account.</p> */}
        </div>
        <form onSubmit={handleSubmit} className="mt-5 sm:flex sm:items-center">
          <div className="w-full sm:max-w-xs">
            <input
              id="email"
              name="email"
              type="text"
              value={roomName}
              onChange={handleChange}
              aria-label="Room"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-0 sm:ml-3 sm:w-auto cursor-pointer"
          >
            Add
          </button>
        </form>
        <SuccessNotification
          show={showNotification}
          onClose={() => setShowNotification(false)}
          title="Room added"
        />
      </div>
    </div>
  );
}
