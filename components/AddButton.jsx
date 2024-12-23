'use client';

import { useState } from "react";
import { Plus } from "lucide-react";
import TaskAddForm from "./TaskAddForm";
import { getUsers } from "@/app/actions/getUsers";

const AddButton = ({users}) => {
  const [formOpen, setFormOpen] = useState(false);


  const handleClose = () => {
    setFormOpen(false);
  };

  // Prevent click propagation from modal content to overlay
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <Plus 
        size={25} 
        color="black" 
        className="cursor-pointer hover:opacity-80" 
        onClick={() => setFormOpen(true)} 
      />
      
      {formOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          onClick={handleClose}
        >
          <div 
            className="max-w-[1200px] w-[100%] bg-white p-8 rounded-lg"
            onClick={handleContentClick}
          >
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Add New Task</h2>
              <button 
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                ✕
              </button>
            </div>
            <TaskAddForm  users={users} setFormOpen={setFormOpen}/>
          </div>
        </div>
      )}
    </>
  );
};

export default AddButton;