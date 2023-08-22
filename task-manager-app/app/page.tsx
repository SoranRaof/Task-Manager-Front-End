import AddTask from "./components/AddTask";
import TaskManagerList from "./components/TaskManagerList";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <AddTask />
      </div>
      <TaskManagerList />
    </main>
  );
}
