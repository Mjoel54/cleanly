import { useState } from "react";
import AddTaskButton from "./AddTaskButton";
import AddTaskForm from "./AddTaskForm";

export default function TaskPageHeader() {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <AddTaskButton onClick={handleButtonClick} />
        {/* <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">
          Tasks
        </h2> */}
      </div>
      <hr className="border-t border-gray-300 mt-6" />
      {showForm && <AddTaskForm onClose={closeForm} />}
    </>
  );
}
