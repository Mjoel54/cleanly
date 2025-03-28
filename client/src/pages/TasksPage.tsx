import TaskList from "../components/Tasks/TaskList";
import TaskPageHeader from "../components/Tasks/TaskPageHeader";

export default function TasksPage() {
  return (
    <>
      <div className="px-16 py-12">
        <TaskPageHeader />
        <TaskList />
      </div>
    </>
  );
}
