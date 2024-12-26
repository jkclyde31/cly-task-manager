'use server'
import connectDB from "@/config/database"
import Task from "@/models/Tasks"
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


async function addTask(formData) {
    await connectDB();

    const sessionUser = await getSessionUser();
    
    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }
    
    const { userId } = sessionUser;

    // Access value for assignees
    const assignees = formData.getAll('assignees');
    const status = "To Do";

    const taskData = {
        name: formData.get('name'),
        description: formData.get('description'),
        status,
        assignees: formData.get('assignees'),
        requestDate: formData.get('requestDate'),
        dueDate: formData.get('dueDate'),
        assignees,
        creator: userId
    }

    const newTask = new Task(taskData);
    await newTask.save();

    revalidatePath('/', 'layout');

    redirect(`/admin/`);

}

export default addTask;
