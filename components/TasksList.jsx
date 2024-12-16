'use client'

import { useState } from 'react';

// Sample initial data - you would typically fetch this from an API
const initialTasks = [
  {
    id: 1,
    name: 'Design Homepage',
    assignees: ['John Doe', 'Jane Smith'],
    status: 'In Progress',
    requestDate: '2024-01-15',
    dueDate: '2024-02-15'
  },
  {
    id: 2,
    name: 'Backend API Development',
    assignees: ['Mike Johnson'],
    status: 'Pending',
    requestDate: '2024-01-10',
    dueDate: '2024-02-10'
  },
  {
    id: 3,
    name: 'User Testing',
    assignees: ['Emily Brown', 'Alex Lee'],
    status: 'Completed',
    requestDate: '2024-01-05',
    dueDate: '2024-01-20'
  }
];

const EyeIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={className}
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
);

const TasksTable = () => {
  const [tasks, setTasks] = useState(initialTasks);

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

  const handleViewTask = (taskId) => {
    // Placeholder for view task functionality
    alert(`Viewing details for Task ${taskId}`);
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
                    onClick={() => handleViewTask(task.id)}
                    className="text-gray-600 hover:text-blue-600 focus:outline-none"
                    aria-label="View Task"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksTable;