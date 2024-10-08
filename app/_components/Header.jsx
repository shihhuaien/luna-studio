"use client";

import React, { useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


function Header() {
    const { user } = useKindeBrowserClient()
    useEffect(() => {
        console.log(user)
    }, [user])
    const Manu = [
        {
            id: 1,
            name: '首頁',
            path: '/'
        },
        {
            id: 2,
            name: '方案',
            path: '/search/所有方案'
        },
        {
            id: 3,
            name: user ? '我的預約' : "",
            path: '/my-booking'
        },
    ];

    return (
        <div className='flex items-center justify-between p-4 shadow-sm'>
            <div className='flex items-center gap-10'>
                <Image src='/logo.svg' alt='logo'
                    width={120} height={50}
                />

                <ul className='md:flex gap-8 hidden'>
                    {Manu.map((item, index) => (
                        <Link key={index} href={item.path}>
                            <li className='hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out'>{item.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            {user ?
                <Popover>
                    <PopoverTrigger>
                        <Image src={user?.picture} alt='profile-image'
                            width={50}
                            height={50}
                            className="rounded-full" />
                    </PopoverTrigger>
                    <PopoverContent className="w-44">
                        <ul className='flex  flex-col gap-2'>
                            <Link href={'/my-booking'} className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>
                                我的預約
                            </Link>
                            <li className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>
                                <LogoutLink> 登出 </LogoutLink></li>
                        </ul>
                    </PopoverContent>
                </Popover>
                :
                <LoginLink>
                    <Button>登入/註冊</Button>
                </LoginLink>}
        </div>
    )
}

export default Header
