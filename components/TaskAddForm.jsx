import addTask from "@/app/actions/addTask";
import { getUsers } from "@/app/actions/getUsers";

const TaskAddForm = async () => {
  const users = await getUsers();
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <form action={addTask}>
      <h2 className='text-3xl text-center font-semibold mb-6'>Add Task</h2>

      <div className='mb-4'>
        <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
          Task Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='e.g., Contact Form Layout'
          required
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='description'
          className='block text-gray-700 font-bold mb-2'
        >
          Task Description
        </label>
        <textarea
          id='description'
          name='description'
          className='border rounded w-full py-2 px-3'
          rows='4'
          placeholder='Add responsive Contact Form Layout'
        ></textarea>
      </div>

      <div className='mb-4'>
        <label htmlFor='assignees' className='block text-gray-700 font-bold mb-2'>
          Assignee/Assignees
        </label>
        <select
          id="assignees"
          name="assignees"
          className="border rounded w-full py-2 px-3"
          required
          multiple
          size={4}
        >
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-600 mt-1">Hold Ctrl/Cmd to select multiple assignees</p>
      </div>

      <div className='mb-4'>
        <label htmlFor='requestDate' className='block text-gray-700 font-bold mb-2'>
          Request Date
        </label>
        <input
          type='date'
          id='requestDate'
          name='requestDate'
          className='border rounded w-full py-2 px-3 mb-2'
          defaultValue={currentDate}
          required
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='dueDate' className='block text-gray-700 font-bold mb-2'>
          Due Date
        </label>
        <input
          type='date'
          id='dueDate'
          name='dueDate'
          className='border rounded w-full py-2 px-3'
          required
        />
      </div>

      <button
        type='submit'
        className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskAddForm;