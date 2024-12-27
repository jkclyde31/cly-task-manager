'use server'
import connectDB from "@/config/database"
import Notification from "@/models/Notifications";

// Separate notification function
async function createNotification(assigneeId, taskId, taskName) {
    await connectDB();

    try {
        const notification = new Notification({
            recipient: assigneeId,
            taskId: taskId,
            message: `You have been assigned to a new task: ${taskName}`,
        });
        await notification.save();
    } catch (error) {
        console.error('Error creating notification:', error);
    }
}

export default createNotification
