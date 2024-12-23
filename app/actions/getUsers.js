// app/actions/taskActions.js
'use server'

import connectDB from "@/config/database";
import User from "@/models/User";


export async function getUsers() {
    await connectDB();
    const users = await User.find({}).lean();
    return users;
}