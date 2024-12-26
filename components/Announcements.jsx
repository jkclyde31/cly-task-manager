import { getAnnouncements } from "@/app/actions/getAnnouncements";

const Announcements = async () => {
  const announcements = await getAnnouncements();

  console.log("Announcements", announcements);

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>

      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <div className="flex flex-col gap-4 mt-4" key={announcement._id}>
            <div className="bg-lamaSkyLight rounded-md p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-medium">{announcement.title}</h2>
                <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                  {announcement.date}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {announcement.description}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No announcements found.</p>
      )}
    </div>
  );
};

export default Announcements;