import UserForm from "./New";

export default async function Page() {
    return (
      <section className="flex flex-col items-center justify-center md:p-10 w-full h-full ">
  
        <div className=" bg-gray-950 rounded-lg shadow-lg shadow-red-700 w-[80vw] max-w-[500px] p-6">
         <UserForm/>
        </div>
        
      </section>
    );
  }
  