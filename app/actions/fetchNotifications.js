import connectDB from "@/config/database";
import User from "@/models/User";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/utils/AuthOptions";
import Notification from "@/models/Notifications";

export async function getNotification() {

        await connectDB();
        
        const sessionUser = await getServerSession(authOptions);

        if (!sessionUser?.user?.email) {
            console.log("No session or email found");
            return [];
        }else{
            console.log(sessionUser);

        }

        const notifications = await Notification.find({ 
            recipient: sessionUser.user.id,
            // isRead: false 
        })
        .sort({ createdAt: -1 })
        .populate({
            path: 'taskId',
            select: 'name description'
        })
        .lean();

        return notifications;

}