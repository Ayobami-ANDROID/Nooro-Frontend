import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-[736px]">
        <Link href="/" className="bg-[rgba(30,111,159,1)] flex justify-center items-center text-[rgba(242,242,242,1)] rounded-[8px]  p-[16px] mt-[-20px] w-full">
              <p className="text-[14px] font-[700] mr-2">Create Task</p>
              <Image src='/assests/images/plus.svg' alt="plus" width={16} height={16}/>
        </Link>

        <div className="flex justify-between w-full">
          
        </div>
    </div>
  );
}
