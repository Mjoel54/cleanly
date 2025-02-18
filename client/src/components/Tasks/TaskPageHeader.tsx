import { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import { DELETE_ALL_TASKS, GET_TASKS, GET_ROOMS } from "../../utils/api/index";
import { useMutation } from "@apollo/client";
import successNotification from "../../utils/successNotification";
import FilterTaskDropdown from "./FilterTaskDropdown";
import PrimaryButton from "../General/PrimaryButton";
import DropdownMenu, {
  ButtonItem,
  redButtonStyling,
} from "../General/DropdownMenu";
import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/outline";

import { PlusIcon } from "@heroicons/react/20/solid";

export default function TaskPageHeader() {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleDeleteAllTasksButtonclick = () => {
    deleteAllTasks();
  };

  const [deleteAllTasks] = useMutation(DELETE_ALL_TASKS, {
    refetchQueries: [{ query: GET_TASKS }, { query: GET_ROOMS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      successNotification("Tasks deleted");
    },
  });

  const menuItems: ButtonItem[] = [
    {
      name: "Delete all tasks",
      action: () => handleDeleteAllTasksButtonclick(),
      className: redButtonStyling,
      icon: <TrashIcon className="h-4 w-4" />,
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <PrimaryButton
            text="Add Task"
            icon={<PlusIcon className="w-5 h-5" />}
            type="button"
            onClick={handleButtonClick}
          />

          <FilterTaskDropdown />
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu
            buttonIcon={<EllipsisVerticalIcon className="h-4 w-4" />}
            menuItems={menuItems}
          />
        </div>
      </div>

      <hr className="border-t border-gray-300 mt-6" />
      {showForm && <AddTaskForm onClose={closeForm} />}
    </>
  );
}
