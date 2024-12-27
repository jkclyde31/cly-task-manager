'use server'
import connectDB from "@/config/database"
import Task from "@/models/Tasks"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import createNotification from "./createNotification"

async function addTask(formData) {
    await connectDB();

    const sessionUser = await getSessionUser();
    
    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }
    
    const { userId } = sessionUser;
    const assignees = formData.getAll('assignees');
    const category = formData.get('category');

    console.log('Category:', category); // Debug log

    const taskData = {
        name: formData.get('name'),
        description: formData.get('description'),
        status: "To Do",
        category,
        requestDate: formData.get('requestDate'),
        dueDate: formData.get('dueDate'),
        assignees,
        creator: userId
    }

    console.log('Task Data:', taskData); // Debug log

    const newTask = new Task(taskData);
    await newTask.save();

      // Create notifications for all assignees after task is saved
      for (const assigneeId of assignees) {
        await createNotification(assigneeId, newTask._id, taskData.name);
    }

    

    revalidatePath('/', 'layout');
    redirect(`/admin/`);
}

export default addTask;