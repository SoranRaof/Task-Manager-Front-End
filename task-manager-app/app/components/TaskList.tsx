import { ITask } from "@/types/tasks";
import Task from "./Task";

interface TaskListProps {
  tasks: ITask[];
}
const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr className="text-black">
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
