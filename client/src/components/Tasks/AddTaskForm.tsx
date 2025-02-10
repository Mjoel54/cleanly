import { useState, type FormEvent, type ChangeEvent } from "react";

import { useMutation, useQuery } from "@apollo/client";

import { CREATE_TASK, GET_TASKS, GET_ROOMS } from "../../utils/api/index";
import { TaskRequest } from "../../interfaces/Task";

export default function AddTaskForm() {
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
      // console.log("Task added successfully");
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
    <div className="bg-white shadow-sm sm:rounded-lg my-5">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold text-gray-900">
          Add a new task
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Enter the details of the task you want to add.</p>
        </div>
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
          <div>
            <label
              htmlFor="taskNameInput"
              className="block text-sm font-medium text-gray-700"
            >
              Task Name
            </label>
            <div className="mt-1">
              <input
                id="taskNameInput"
                name="name"
                type="text"
                value={formState.input.name}
                onChange={handleInputChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="taskDescriptionInput"
              className="block text-sm font-medium text-gray-700"
            >
              Task Description
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

          <div>
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
  );
}
