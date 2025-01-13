// app/actions/taskActions.js


import connectDB from "@/config/database";
import Task from "@/models/Tasks";
import User from "@/models/User";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/utils/AuthOptions";


export async function getTasks() {
    await connectDB();
    const tasks = await Task.find({}).populate('assignees', 'username image').lean();
    return tasks;
}


export async function getMyTasks() {
    try {
        await connectDB();
        
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.email) {
            console.log("No session or email found");
            return [];
        }
        
        const user = await User.findOne({ email: session.user.email });
        
        if (!user) {
            console.log("No user found for email:", session.user.email);
            return [];
        }

        console.log("User ID:", user._id);
        
        // First, let's check all tasks to see what's available
        const allTasks = await Task.find({})
            .populate('assignees', 'username image email')
            .lean();
            
        console.log("Total tasks in system:", allTasks.length);
        console.log("Sample task assignees:", allTasks[0]?.assignees);
        
        // Now let's check tasks specifically assigned to the user
        const myTasks = await Task.find({
            assignees: { $in: [user._id] }  // Using $in operator for better matching
        })
        .populate('assignees', 'username image email')
        .populate('creator', 'username')
        .sort({ dueDate: 1 })
        .lean();
        
        console.log("Tasks assigned to user:", myTasks.length);
        
        // Double check the first few tasks to verify the assignment
        myTasks.forEach((task, index) => {
            if (index < 3) {  // Log first 3 tasks for debugging
                console.log(`Task ${index + 1}:`, {
                    name: task.name,
                    assigneeIds: task.assignees.map(a => a._id.toString())
                });
            }
        });
        
        return myTasks;
    } catch (error) {
        console.error('Error in getMyTasks:', error);
        throw error;
    }
}

