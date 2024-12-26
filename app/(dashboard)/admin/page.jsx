import Announcements from "@/components/Announcements";
import EventCalendar from "@/components/EventCalendar";
import UserCard from "@/components/UserCard";
import TasksTable from "@/components/TaskTable";
import { getTaskCounts } from "@/app/actions/getCounts";

const AdminPage = async () => {
  const count = await getTaskCounts();
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap ">
          <UserCard type="To Do" bg="bg-todo" count={count['To Do']}/>
          <UserCard type="In Progress" bg="bg-progress" count={count['In Progress']}/>
          <UserCard type="Review"  bg="bg-review" count={count['Review']}/>
          <UserCard type="Completed" bg="bg-done" count={count['Completed']}/>
        </div>
        {/* MIDDLE CHARTS */}
        <TasksTable/>
      </div>


      
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements/>
      </div>
    </div>
  );
};

export default AdminPage;
