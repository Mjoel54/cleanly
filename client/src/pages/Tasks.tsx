import TasksList from "../components/Tasks/TasksList";
import TaskPageHeader from "../components/Tasks/TaskPageHeader";

export default function Tasks() {
  return (
    <>
      <div className="px-16 py-12">
        <TaskPageHeader />
        <TasksList />
      </div>
    </>
  );
}
