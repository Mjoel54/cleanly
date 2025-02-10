import AddTasksForm from "../components/Tasks/AddTaskForm";
import TasksList from "../components/Tasks/TasksList";

export default function Tasks() {
  return (
    <>
      <h1>Tasks</h1>
      <AddTasksForm />
      <TasksList />
    </>
  );
}
