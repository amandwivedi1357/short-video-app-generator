import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
   <div className="text-red-500">
    <UserButton/>
    Hello
   </div>
  );
}
