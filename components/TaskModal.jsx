// TaskModal.js (Client Component)
'use client';
import { useState } from 'react';
import { Eye, Plus } from 'lucide-react';
import Image from 'next/image';

export function TaskModal({ task }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
                           
                            <div>
                                <h3 className="font-semibold">Status</h3>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${task.status === 'Completed' ? 'bg-done text-green-800' : 
                                            task.status === 'In Progress' ? 'bg-progress text-blue-800' : 
                                            task.status === 'Review' ? 'bg-review text-blue-800' : 
                                            'bg-todo text-yellow-900'}`}>
                                            {task.status}
                                        </span>
                            </div>
                            <div>
                                <h3 className="font-semibold">Description</h3>
                                <p>{task.description}</p>
                            </div>


                          <div className="flex justify-between">
                            <div>
                                    <h3 className="font-semibold">Assignees</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {task.assignees?.map((assignee, index) => (
                                            <>
                                                <Image src={assignee.image} alt="" width={36} height={36} className="rounded-full"/>
                                                <span key={index} className="px-2 py-1 bg-gray-100 rounded">
                                                    {assignee.username}
                                                </span>
                                            </>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p><span className="font-bold">Request Date:</span> {new Date(task.requestDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p><span className="font-bold">Due Date:</span> {new Date(task.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                          </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
