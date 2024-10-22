"use client"
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
   <div className="text-red-500 ">
    <UserButton/>
    <div className="w-full h-screen flex justify-center items-center"> 
    <Button className="bg-purple-500 font-bold text-white" onClick={() => router.push('/dashboard')}>Dashboard</Button>
    </div>
   </div>
  );
}
