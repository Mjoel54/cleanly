import TasksList from "../components/Tasks/TasksList";
import TaskPageHeader from "../components/Tasks/TaskPageHeader";

export default function Tasks() {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <TaskPageHeader />
        <TasksList />
      </div>
    </>
  );
}
