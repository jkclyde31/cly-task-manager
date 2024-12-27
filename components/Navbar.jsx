// components/Navbar.js
import { NotificationWrapper } from "./NotificationWrapper";
import { NavProfile } from "./NavProfile";

function Navbar() {
  return (
    <div className='flex items-center justify-between p-4'>
      <div className='flex items-center gap-6 justify-end w-full'>
        <NavProfile />
        <NotificationWrapper />
      </div>
    </div>
  );
}

export default Navbar;