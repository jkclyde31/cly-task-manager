import Announcements from "@/components/Announcements";
import EventCalendar from "@/components/EventCalendar";
import UserCard from "@/components/UserCard";
import TasksTable from "@/components/TasksList";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap ">
          <UserCard type="To Do" />
          <UserCard type="In Progress" />
          <UserCard type="Review" />
          <UserCard type="Completed" />
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
