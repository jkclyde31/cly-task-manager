import TaskAddForm from "@/components/TaskAddForm";


const PropertyAddPage = () => {
  return (
    <section className='bg-[#F7F8FA]'>
      <div className='container m-auto max-w-6xl py-10'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <TaskAddForm />
        </div>
      </div>
    </section>
  );
};
export default PropertyAddPage;
