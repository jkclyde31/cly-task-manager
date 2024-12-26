// app/actions/taskActions.js
import connectDB from "@/config/database";
import Task from "@/models/Tasks";

export async function getTaskCounts() {
    await connectDB();
    
    const statusCounts = await Task.aggregate([
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        }
    ]);

    // Initialize default counts
    const counts = {
        'To Do': 0,
        'In Progress': 0,
        'Review': 0,
        'Completed': 0
    };

    // Update with actual counts
    statusCounts.forEach(status => {
        counts[status._id] = status.count;
    });

    return counts;
}