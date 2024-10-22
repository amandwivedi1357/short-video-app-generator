import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from "next/image"
  const CustomLoading = ({loading}) => {
    return (
        <AlertDialog open={loading}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent className = 'bg-white'>
        <AlertDialogTitle className='text-black'>Hold On!</AlertDialogTitle>
          <div className='flex justify-center items-center flex-col'>
            <Image src={'/progress.gif'} alt="Loading..." width={100} height={100} className="object-contain "/>
            <AlertDialogDescription className='text-gray-600'>
                generating your video...do not refresh
            </AlertDialogDescription>

          </div>
        </AlertDialogContent>
      </AlertDialog>
      
    )
  }
  
  export default CustomLoading