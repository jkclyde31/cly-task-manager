import MyTasks from "@/components/myTasks";
import UserCard from "@/components/UserCard";
import { getMyTaskCounts } from "@/app/actions/getCounts";


const Navbar = async () => {
  const count = await getMyTaskCounts();

  return (
   <div className="px-5">
        <div className="flex gap-4 justify-between flex-wrap ">
          <UserCard type="To Do" bg="bg-todo" count={count['To Do']}/>
          <UserCard type="In Progress" bg="bg-progress" count={count['In Progress']}/>
          <UserCard type="Review"  bg="bg-review" count={count['Review']}/>
          <UserCard type="Completed" bg="bg-done" count={count['Completed']}/>
        </div>
      <MyTasks/>
   </div>
  )
}

export default Navbar