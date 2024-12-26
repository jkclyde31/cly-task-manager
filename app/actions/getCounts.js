import connectDB from "@/config/database";
import Task from "@/models/Tasks";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Original function for getting all task counts
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

// New function for getting task counts for logged-in user
export async function getMyTaskCounts() {
    try {
        await connectDB();
        
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.email) {
            return {
                'To Do': 0,
                'In Progress': 0,
                'Review': 0,
                'Completed': 0
            };
        }
        
        const user = await User.findOne({ email: session.user.email });
        
        if (!user) {
            return {
                'To Do': 0,
                'In Progress': 0,
                'Review': 0,
                'Completed': 0
            };
        }

        const statusCounts = await Task.aggregate([
            {
                $match: {
                    assignees: { $in: [user._id] }
                }
            },
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
            if (status._id in counts) {
                counts[status._id] = status.count;
            }
        });

        return counts;
    } catch (error) {
        console.error('Error getting my task counts:', error);
        throw error;
    }
}