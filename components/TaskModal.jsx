// components/TaskModal.jsx
'use client';

import { useState } from 'react';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import { useTransition } from 'react';
import { updateTaskStatus } from '@/app/actions/updateTask';

export function TaskModal({ task }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState(task.status);
    const [isPending, startTransition] = useTransition();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        startTransition(async () => {
            try {
                const result = await updateTaskStatus(task._id, newStatus);
                if (result.success) {
                    setStatus(newStatus);
                } else {
                    console.error('Failed to update status:', result.error);
                }
            } catch (error) {
                console.error('Error updating status:', error);
            }
        });
    };

    const getStatusColor = (statusValue) => {
        const colors = {
            'Completed': 'bg-green-100 text-green-800',
            'In Progress': 'bg-blue-100 text-blue-800',
            'Review' : 'bg-review text-blue-800' ,

            'To Do': 'bg-yellow-100 text-yellow-800'
        };
        return colors[statusValue] || 'bg-gray-100 text-gray-800';
    };

    return (
        <>
            <button
                onClick={openModal}
                className="text-blue-600 hover:text-blue-800 px-1"
            >
                <Eye size={20} />
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">{task.name}</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                          <div>
                                <h3 className="font-semibold mb-2">Status</h3>
                                <select
                                    value={status}
                                    onChange={handleStatusChange}
                                    disabled={isPending}
                                    className={`px-3 py-2 rounded-md border ${getStatusColor(status)} cursor-pointer`}
                                >
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Review">Review</option>
                                    <option value="Completed">Completed</option>
                                </select>
                                {isPending && (
                                    <span className="ml-2 text-sm text-gray-500">Updating...</span>
                                )}
                            </div>

                            <div className="flex justify-between">
                                <div>
                                    <h3 className="font-semibold">Assignees</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {task.assignees?.map((assignee, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <Image 
                                                    src={assignee.image} 
                                                    alt="" 
                                                    width={36} 
                                                    height={36} 
                                                    className="rounded-full"
                                                />
                                                <span className="px-2 py-1 bg-gray-100 rounded">
                                                    {assignee.username}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                               
                            </div>
                          </div>

                            <div>
                                <h3 className="font-semibold">Description</h3>
                                <p>{task.description}</p>
                            </div>

                         
                            <div>
                                    <p><span className="font-bold">Request Date:</span> {new Date(task.requestDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p><span className="font-bold">Due Date:</span> {new Date(task.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}