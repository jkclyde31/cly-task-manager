import { TaskModal } from './TaskModal';
import { getTasks } from '@/app/actions/getTasks';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { 
    ChevronLeft, 
    ChevronRight, 
    ChevronsLeft, 
    ChevronsRight 
} from 'lucide-react';

const ITEMS_PER_PAGE = 10;

const Tasks = async ({ searchParams }) => {
    const page = Number(searchParams?.page) || 1;
    const tasks = await getTasks();
    
    // Calculate pagination values
    const totalItems = tasks.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentTasks = tasks.slice(startIndex, endIndex);
    
    // Generate page numbers to display
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (page <= 3) {
                for (let i = 1; i <= 5; i++) {
                    pageNumbers.push(i);
                }
            } else if (page >= totalPages - 2) {
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                for (let i = page - 2; i <= page + 2; i++) {
                    pageNumbers.push(i);
                }
            }
        }
        
        return pageNumbers;
    };

    return (
        <div className="w-full mx-auto px-0 md:px-2 py-4">
            <div className="p-2 flex justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
                <Link href="/tasks/add" className="text-blue-600 hover:text-blue-800 px-1">
                    <Plus size={25} />
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignees</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentTasks.map((task) => (
                                <tr key={task._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{task.name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            {task.assignees?.map((assignee, index) => (
                                                <div key={index} className="text-sm font-medium">
                                                    {assignee.username}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${task.status === 'Completed' ? 'bg-done text-green-800' : 
                                            task.status === 'In Progress' ? 'bg-progress text-blue-800' : 
                                            task.status === 'Review' ? 'bg-review text-blue-800' : 
                                            'bg-todo text-yellow-900'}`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{task.category}</div>
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

                {/* Pagination Controls */}
                <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <Link
                            href={`/tasks?page=${page > 1 ? page - 1 : 1}`}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                                page <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Previous
                        </Link>
                        <Link
                            href={`/tasks?page=${page < totalPages ? page + 1 : totalPages}`}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                                page >= totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Next
                        </Link>
                    </div>
                    
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                                <span className="font-medium">{Math.min(endIndex, totalItems)}</span> of{' '}
                                <span className="font-medium">{totalItems}</span> results
                            </p>
                        </div>
                        
                        <div className="flex gap-2">
                            <Link
                                href="/tasks?page=1"
                                className={`relative inline-flex items-center p-2 rounded-md ${
                                    page <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <ChevronsLeft size={20} />
                            </Link>
                            
                            <Link
                                href={`/tasks?page=${page > 1 ? page - 1 : 1}`}
                                className={`relative inline-flex items-center p-2 rounded-md ${
                                    page <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <ChevronLeft size={20} />
                            </Link>
                            
                            <div className="flex gap-1">
                                {getPageNumbers().map((pageNum) => (
                                    <Link
                                        key={pageNum}
                                        href={`/tasks?page=${pageNum}`}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                                            page === pageNum
                                                ? 'bg-blue-500 text-white'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {pageNum}
                                    </Link>
                                ))}
                            </div>
                            
                            <Link
                                href={`/tasks?page=${page < totalPages ? page + 1 : totalPages}`}
                                className={`relative inline-flex items-center p-2 rounded-md ${
                                    page >= totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <ChevronRight size={20} />
                            </Link>
                            
                            <Link
                                href={`/tasks?page=${totalPages}`}
                                className={`relative inline-flex items-center p-2 rounded-md ${
                                    page >= totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <ChevronsRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tasks;