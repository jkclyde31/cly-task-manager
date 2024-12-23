// app/actions/taskActions.js


import connectDB from "@/config/database";
import Task from "@/models/Tasks";
import User from "@/models/User";

export async function getTasks() {
    await connectDB();
    const tasks = await Task.find({}).populate('assignees', 'username image').lean();
    return tasks;
}