import { useState } from "react";

export default function EditTaskModal({ taskToEdit, onSave, onClose }) {
  const [editedTitle, setEditedTitle] = useState(taskToEdit.title);

  const handleSave = (e) => {
    e.preventDefault();
    onSave(taskToEdit.id, editedTitle);
  };

  return (
    <div className='z-30 fixed inset-0 bg-gray-50 bg-opacity-50'>
      <form
        onSubmit={handleSave}
        className='bg-task-background border-2 border-task-border rounded-lg min-w-[300px] md:min-w-[500px] p-6 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h2 className='text-center text-2xl font-semibold text-black dark:text-white'>
          Edit Task
        </h2>
        <input
          type='text'
          name='edit'
          id='edit'
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className='focus:outline-none text-black dark:text-white bg-task-background border border-task-border w-full p-2 rounded-lg mt-4 text-2xl'
        />

        <div className='flex gap-4 mt-4 text-xl'>
          <button
            type='submit'
            className='bg-primer-button rounded-lg border border-primer-border text-white px-3 py-1 hover:bg-white hover:text-primer-button hover:border-primer-border transition-all duration-300 ease-in-out shadow active:scale-95 active:shadow-sm'>
            Save
          </button>
          <button
            type='button'
            onClick={onClose}
            className='text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
