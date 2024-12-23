// TaskModal.js (Client Component)
'use client';
import { useState } from 'react';
import { Eye } from 'lucide-react';

export function TaskModal({ task }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <button
                onClick={openModal}
                className="text-blue-600 hover:text-blue-800"
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
                            <div>
                                <h3 className="font-semibold">Status</h3>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                    task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                                    'bg-yellow-100 text-yellow-800'}`}>
                                    {task.status}
                                </span>
                            </div>
                            <div>
                                <h3 className="font-semibold">Assignees</h3>
                                <div className="flex flex-wrap gap-2">
                                    {task.assignees?.map((assignee, index) => (
                                        <span key={index} className="px-2 py-1 bg-gray-100 rounded">
                                            {assignee.username}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold">Dates</h3>
                                <p>Request Date: {new Date(task.requestDate).toLocaleDateString()}</p>
                                <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
