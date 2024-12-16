'use client'

import { useState } from 'react';
import { X } from 'lucide-react';

// Sample initial data with added description
const initialTasks = [
  {
    id: 1,
    name: 'Design Homepage',
    description: 'Create a responsive and intuitive homepage design for the new website, focusing on user experience and brand consistency.',
    assignees: ['John Doe', 'Jane Smith'],
    status: 'In Progress',
    requestDate: '2024-01-15',
    dueDate: '2024-02-15',
    comments: []
  },
  {
    id: 2,
    name: 'Backend API Development',
    description: 'Develop robust backend API endpoints for user authentication, data retrieval, and system integrations.',
    assignees: ['Mike Johnson'],
    status: 'Pending',
    requestDate: '2024-01-10',
    dueDate: '2024-02-10',
    comments: []
  },
  {
    id: 3,
    name: 'User Testing',
    description: 'Conduct comprehensive user testing for the new application interface and gather feedback.',
    assignees: ['Emily Brown', 'Alex Lee'],
    status: 'Completed',
    requestDate: '2024-01-05',
    dueDate: '2024-01-20',
    comments: []
  }
];

const TaskDetailsModal = ({ task, onClose, onStatusChange, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [currentStatus, setCurrentStatus] = useState(task.status);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    onStatusChange(task.id, newStatus);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(task.id, newComment);
      setNewComment('');
    }
  };

  const statusOptions = ['Pending', 'In Progress', 'Completed', 'On Hold'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">{task.name}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Task ID</label>
              <p className="mt-1 text-sm text-gray-900">{task.id}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={currentStatus}
                onChange={handleStatusChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <p className="mt-1 text-sm text-gray-900">{task.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Request Date</label>
              <p className="mt-1 text-sm text-gray-900">{task.requestDate}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <p className="mt-1 text-sm text-gray-900">{task.dueDate}</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Assignees</label>
            <div className="mt-1 space-y-1">
              {task.assignees.map((assignee, index) => (
                <p key={index} className="text-sm text-gray-900">{assignee}</p>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Comments</label>
            <div className="mt-1 space-y-2">
              {task.comments.map((comment, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded-md">
                  <p className="text-sm text-gray-900">{comment}</p>
                </div>
              ))}
            </div>
            <div className="mt-2 flex">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-grow mr-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TasksTable = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);

  // Status color mapping
  const getStatusColor = (status) => {
    switch(status) {
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleAddComment = (taskId, comment) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, comments: [...task.comments, comment] } 
          : task
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignees</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">{task.id}</td>
                <td className="px-4 py-3">{task.name}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    {task.assignees.map((assignee, index) => (
                      <span key={index} className="text-sm">{assignee}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-3">{task.requestDate}</td>
                <td className="px-4 py-3">{task.dueDate}</td>
                <td className="px-4 py-3">
                  <button 
                    onClick={() => handleViewTask(task)}
                    className="text-gray-600 hover:text-blue-600 focus:outline-none"
                    aria-label="View Task"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-5 h-5"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" 
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" 
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetailsModal 
          task={selectedTask} 
          onClose={handleCloseModal}
          onStatusChange={handleStatusChange}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
};

export default TasksTable;