import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <div>
        <Image src={'/auth.jpg'}
        width={500}
        height={500}
        alt='Auth'
        className='object-contain'
        />
      </div>
      <div className='flex justify-center items-center'>
        <SignUp/>
      </div>
    </div>
  )
}