"use client";
import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTask, editTask } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTask({
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setOpenModalDelete(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className="w-full ">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500 hover:scale-110 ease-in duration-300"
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTask}>
            <h3 className="font-bold text-lg">Edit Task</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button
                type="submit"
                className="btn border-none bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white hover:scale-110 ease-in duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDelete(true)}
          cursor="pointer"
          className="text-red-500 hover:scale-110 ease-in duration-300"
          size={25}
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-lg text-bold">
            Are you sure you want to delete this task?
          </h3>
          <div className="modal-action">
            <button
              className="btn border-none text-white hover:scale-110 ease-in duration-300"
              onClick={() => handleDeleteTask(task.id)}
            >
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
