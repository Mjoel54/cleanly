import AddTasksForm from "../components/Tasks/AddTaskForm";
import TasksList from "../components/Tasks/TasksList";
import PageHeading from "../components/General/PageHeading";

export default function Tasks() {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <PageHeading title="Tasks" />
        <AddTasksForm />
        <TasksList />
      </div>
    </>
  );
}
