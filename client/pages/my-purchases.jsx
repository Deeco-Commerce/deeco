import Image from 'next/image';
import MainAppLayout from '../components/dashboard/layout/MainAppLayout';
import purchases from '../assets/images/purchases.png';

export default function Mypurchases() {
  return (
    <MainAppLayout>
      <div className="flex gap-4 flex-1">
        <aside className="basis-full bg-white ml-auto shadow-md overflow-hidden">
          <h1 className="text-lg font-bold text-black border-b-2 p-6">Purchases</h1>
          <div className="flex border-b-2 p-6 cursor-pointer">
            <h1 className="text-lg font-bold text-black pr-8">Open Order (0)</h1>
            <h1 className="text-lg font-bold text-[#61A5FA]">Closed Order (2)</h1>
          </div>
          <div className="border-2 flex items-center justify-between p-4 m-6">
            <div className="flex">
              <Image src={purchases} alt="purchases" width={120} height={120} className="mr-8" />
              <div className='flex flex-col items-start justify-center'>
                <h1 className="text-lg font-bold text-black">Big Sneakers</h1>
                <h1 className="text-sm font-normal text-[#666]">Order 230912892</h1>
                <h1 className="text-sm font-normal text-[#666]">Size (UK); 42</h1>
                <h1 className="text-base text-black font-bold">On-27-2023</h1>
              </div>
            </div>
            <div className='flex flex-col items-start self-stretch justify-between'>
              <h1 className="text-sm font-bold underline text-black">See details</h1>
              <button className="bg-[#6DBD28] px-2 py-1 text-white">Delivered</button>
            </div>
          </div>
        </aside>
      </div>
    </MainAppLayout>
  );
}
