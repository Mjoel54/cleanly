import { CheckCircleIcon } from "@heroicons/react/20/solid";

export interface AddTaskButtonProps {
  onClick: () => void;
}

export default function AddTaskButton({ onClick }: AddTaskButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
    >
      <CheckCircleIcon aria-hidden="true" className="-ml-0.5 size-5" />
      New Task
    </button>
  );
}
