import { FC } from 'react'
import Image from 'next/image'



const Header: FC = () => {
  return (
  <div className='bg-[rgba(13,13,13,1)] h-[180px] flex justify-center items-center w-full'>
     
           <Image src='/assests/images/rocket.svg' width={20} height={36} alt='Logo' className='mr-2'/>
           <p className='text-[rgba(78,168,222,1)] text-[40px] font-[900] '>Todo <span className='text-[rgba(94,96,206,1)]'>App</span></p>
     
  </div>
)
}

export default Header