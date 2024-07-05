"use client"

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';

function CategorySearch() {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        getCategoryList()
    }, [])

    const getCategoryList = () => {
        GlobalApi.getCategory().then(resp => {
            console.log(resp.data.data);
            setCategoryList(resp.data.data)
        })
    }

    return (
        <div className='mb-10 items-center px-5 flex flex-col gap-2'>
            <h2 className='font-bold text-4xl tracking-wide'>
                <span className='text-primary'>款式</span>
                介紹
            </h2>
            <h2 className='text-gray-500 text-xl'>先選擇喜歡的款式來完成預約</h2>
            <div className="flex w-full max-w-sm mt-3 items-center flex-col ">
                <h2 className='text-gray-300 text-l'>點選想看的分類</h2>
                {/* 暫時沒有搜尋功能 */}
                {/* <Input type="email" placeholder="輸入樣式" />
                <Button type="submit">
                    <Search className='h-4 w-4 mr-2' />搜尋
                </Button> */}
            </div>
            <div>
                {/* Display list of category */}
                <div className='grid grid-cols-3 mt-5 '>
                    {categoryList.length > 0 ? categoryList.map((item, index) => (
                        <Link href={'/search/' + item.attributes.Name} key={index} className='flex 
                            flex-col text-center items-center
                            p-5 bg-blue-50 m-2 rounded-lg cursor-pointer
                            gap-4 hover:scale-110 transition-all ease-in-out
                            w-40'>
                            <Image src={item.attributes?.Icon?.data[0].attributes?.url}
                                alt='icon'
                                width={70}
                                height={70}
                            />
                            <label className='text-blue-600 text-m'>{item?.attributes?.Name}</label>
                        </Link>
                    )) :
                        //skeleton effect
                        [1, 2, 3, 4].map((item, index) => (
                            <div key={index} className=' bg-slate-200 m-2
                           w-[130px] h-[120px] rounded-lg animate-pulse'>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CategorySearch
