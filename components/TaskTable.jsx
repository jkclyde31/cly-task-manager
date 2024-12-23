// page.js (Server Component)
import connectDB from "@/config/database";
import Task from "@/models/Tasks";
import User from "@/models/User";
import { TaskModal } from './TaskModal';

const Tasks = async () => {
    await connectDB();
    const tasks = await Task.find({}).populate('assignees', 'username image').lean();

    return (
        <div className="container mx-auto p-6">
            <div className="p-2">
                <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignees</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tasks.map((task) => (
                                <tr key={task._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{task.name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex -space-x-1">
                                            {task.assignees?.map((assignee, index) => (
                                                <div key={index} className="text-sm font-medium">
                                                    {assignee.username}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                            task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                                            'bg-yellow-100 text-yellow-800'}`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {new Date(task.requestDate).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {new Date(task.dueDate).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <TaskModal task={task} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Tasks;