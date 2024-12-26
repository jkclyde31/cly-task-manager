import connectDB from "@/config/database";
import Announcement from "@/models/Announcements";

export async function getAnnouncements() {
    await connectDB();
    const announcement = await Announcement.find({}).lean();
    return announcement;
}