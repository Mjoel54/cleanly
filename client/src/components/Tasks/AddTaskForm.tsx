import { useState, type FormEvent, type ChangeEvent } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import capitaliseFirst from "../../utils/capitaliseFirst";
import { RoomResponse } from "../../interfaces/Room";
import PrimaryButton from "../General/PrimaryButton";

import { useMutation, useQuery } from "@apollo/client";

import { CREATE_TASK, GET_TASKS, GET_ROOMS } from "../../utils/api/index";
import { TaskRequest } from "../../interfaces/Task";

import successNotification from "../../utils/successNotification";

export interface AddTaskFormProps {
  onClose: () => void;
}

export default function AddTaskForm({ onClose }: AddTaskFormProps) {
  const [formState, setFormState] = useState({
    roomId: "",
    input: {
      name: "",
      description: "",
      dueDate: "",
    },
  });

  const {
    data: roomsData,
    // loading: roomsLoading,
    // error: roomsError,
  } = useQuery(GET_ROOMS);

  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_TASKS }, { query: GET_ROOMS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      onClose();
      successNotification("Task created");
    },
  });

  const handleRoomSelect = (roomId: string) => {
    setFormState((prevState) => ({
      ...prevState,
      roomId,
    }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      input: {
        ...prevState.input,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formState.roomId && formState.input.name) {
      const newTask: TaskRequest = {
        roomId: formState.roomId,
        input: {
          name: capitaliseFirst(formState.input.name),
          description: capitaliseFirst(formState.input.description),
          dueDate: dayjs(formState.input.dueDate).unix(), // Convert to Unix timestamp (seconds)
          // or use .valueOf() for milliseconds: dayjs(formState.input.dueDate).valueOf()
          // room: formState.roomId,
        },
      };
      // console.log(newTask);
      createTask({ variables: newTask });
      setFormState({
        roomId: "",
        input: {
          name: "",
          description: "",
          dueDate: "",
        },
      });
      // console.log("Unix timestamp:", dayjs(formState.input.dueDate).unix());
      // console.log("Original date:", formState.input.dueDate);
    }
  };

  // Find the selected room name based on roomId
  const selectedRoom = roomsData?.rooms.find(
    (room: RoomResponse) => room._id === formState.roomId
  );
  // console.log(selectedRoom);

  return (
    <Dialog open={true} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon
                  aria-hidden="true"
                  className="size-6 cursor-pointer"
                />
              </button>
            </div>

            <div className="bg-white sm:rounded-lg my-5">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-xl font-bold text-indigo-700 text-center">
                  New Task
                </h3>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <div>
                    <label id="room-select-label" className="sr-only">
                      Select Room
                    </label>
                    <div className="mt-1">
                      <Menu
                        as="div"
                        className="relative inline-block w-full text-left"
                        aria-labelledby="room-select-label"
                      >
                        <div>
                          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 cursor-pointer">
                            {selectedRoom ? selectedRoom.name : "Select a room"}
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="-mr-1 size-5 text-gray-400"
                            />
                          </MenuButton>
                        </div>

                        <MenuItems
                          transition
                          className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                          <div className="flex flex-col p-1">
                            {" "}
                            {/* Use flex column layout */}
                            {roomsData?.rooms.map((room: RoomResponse) => (
                              <MenuItem key={room._id} as="button">
                                {({ active }) => (
                                  <button
                                    onClick={() => handleRoomSelect(room._id)}
                                    className={`flex w-full text-left px-4 py-2 text-sm cursor-pointer rounded-sm ${
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    <span className="w-full">{room.name}</span>
                                  </button>
                                )}
                              </MenuItem>
                            ))}
                          </div>
                        </MenuItems>
                      </Menu>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="taskNameInput"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="taskNameInput"
                        required
                        name="name"
                        type="text"
                        value={formState.input.name}
                        onChange={handleInputChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="taskDescriptionInput"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <input
                        id="taskDescriptionInput"
                        name="description"
                        type="text"
                        value={formState.input.description}
                        onChange={handleInputChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="taskDescriptionInput"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Due date
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        required
                        name="dueDate"
                        value={formState.input.dueDate}
                        onChange={handleInputChange}
                      />

                      {/* <input
                        id="taskDescriptionInput"
                        name="description"
                        type="text"
                        value={formState.input.description}
                        onChange={handleInputChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      /> */}
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <PrimaryButton text="Add" type="submit" />
                  </div>
                </form>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
