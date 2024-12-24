
import UserForm from "./components/UserForm";

export default async function Home() {

   
  return (
   
    <section className="flex flex-col items-center justify-center md:p-10 w-full h-full ">

      <div className=" bg-gray-950 rounded-lg shadow-lg shadow-red-700 md:w-3/4  lg:w-1/2 h-fit w-full  max-w-[500px] p-6">
        <UserForm/>
      </div>
      
    </section>
  );
}
