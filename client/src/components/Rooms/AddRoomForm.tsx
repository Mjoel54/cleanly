import { useState } from "react";
import SuccessNotification from "../../utils/successNotification";
import PrimaryButton from "../General/PrimaryButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createRoom } from "../../redux/actions/roomActions";

export default function AddTaskForm() {
  const [roomName, setRoomName] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setRoomName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (roomName.trim()) {
      const newRoom = roomName;
      dispatch(createRoom(newRoom));
      SuccessNotification("Room added");
      setRoomName(""); // Reset input field
    }
  };

  return (
    <div className="bg-white shadow-sm sm:rounded-lg ring-1 ring-black/5">
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
          <div className="ml-5">
            <PrimaryButton text="Add" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
