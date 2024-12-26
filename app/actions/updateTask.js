// app/actions/updateTask.js
'use server';

import connectDB from "@/config/database";
import Task from "@/models/Tasks";
import { revalidatePath } from 'next/cache';

export async function updateTaskStatus(taskId, newStatus) {
    try {
        await connectDB();
        
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { status: newStatus },
            { new: true }
        );

        if (!updatedTask) {
            throw new Error('Task not found');
        }

        revalidatePath('/admin');
        return { success: true };
    } catch (error) {
        console.error('Update task error:', error);
        return { success: false, error: error.message };
    }
}