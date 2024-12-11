
import { FC } from 'react'
import Image from 'next/image'



const NoTask: FC = () => {
  return (
  <div className='border-t-[1px] border-[rgba(51,51,51,1)] flex flex-col items-center pt-[70px] gap-4'>
       <Image src="/assests/images/Clipboard.svg" alt="file" width={56} height={56}/>
       <h3 className='font-[700] text-[16px] text-[rgba(128,128,128,1)] text-center'>You don't have any tasks registered yet.</h3>
       <h3 className='font-[400] text-[16px] text-[rgba(128,128,128,1)] text-center'>Create tasks  and organise your to-do items.</h3>
  </div>
  )
}

export default NoTask