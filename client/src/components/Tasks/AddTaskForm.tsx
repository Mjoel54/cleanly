import { useState, type FormEvent, type ChangeEvent } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useMutation, useQuery } from "@apollo/client";

import { CREATE_TASK, GET_TASKS, GET_ROOMS } from "../../utils/api/index";
import { TaskRequest } from "../../interfaces/Task";

import successNotification from "../../utils/successNotification";

export interface AddTaskFormProps {
  onClose: () => void;
}

export default function AddTaskForm({ onClose }: AddTaskFormProps) {
  const [open, setOpen] = useState(true);
  const [formState, setFormState] = useState({
    roomId: "",
    input: {
      name: "",
      description: "",
    },
  });

  const {
    data: roomsData,
    loading: roomsLoading,
    error: roomsError,
  } = useQuery(GET_ROOMS);

  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      onClose();
      successNotification("Task created");
    },
  });

  // {  "roomId": "67a66d9e265f23eeeefb15dd",
  //   "input": {
  //     "name": "Clean the cupboards",
  //     "description": "dust and disinfect"
  //   }
  // }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "roomId") {
      // Handle roomId separately
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      // Handle name and description
      setFormState((prevState) => ({
        ...prevState,
        input: {
          ...prevState.input,
          [name]: value,
        },
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formState) {
      const newTask: TaskRequest = {
        roomId: formState.roomId,
        input: {
          name: formState.input.name,
          description: formState.input.description,
        },
      };
      createTask({ variables: newTask });
      setFormState({
        roomId: "",
        input: {
          name: "",
          description: "",
        },
      });
      // Handle form submission here
      // console.log("Form submitted:", formState);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
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
                    <label
                      htmlFor="roomSelect"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Select Room
                    </label>
                    <div className="mt-1">
                      <select
                        id="roomSelect"
                        name="roomId"
                        value={formState.roomId}
                        onChange={handleInputChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        required
                      >
                        <option value=""></option>
                        {roomsData?.rooms.map((room: Room) => (
                          <option key={room._id} value={room._id}>
                            {room.name}
                          </option>
                        ))}
                      </select>
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

                  <div className="flex justify-center pt-4">
                    <button
                      type="submit"
                      className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-0 sm:w-auto cursor-pointer"
                    >
                      Add
                    </button>
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
