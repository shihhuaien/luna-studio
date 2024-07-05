import React from 'react'
import Image from 'next/image'
import { Sparkles, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BookAppointment from './BookAppointment'


function EyelasherDetail({ eyelasher }) {
    const socialMediaList = [
        {
            id: 1,
            icon: '/instagram.png',
            url: 'https://www.instagram.com/luna_thelashartist?igsh=aXp4c2d3dnBmaXVl&utm_source=qr'
        },
        {
            id: 2,
            icon: '/threads.jpg',
            url: 'https://www.threads.net/@luna_thelashartist'
        },
        {
            id: 3,
            icon: '/line.png',
            url: 'https://lin.ee/s7dBTpi'
        },
        {
            id: 4,
            icon: '/redbook.png',
            url: 'https://www.xiaohongshu.com/user/profile/624a9fbf0000000010005674?xhsshare=CopyLink&appuid=624a9fbf0000000010005674&apptime=1719818657'
        }
    ]
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg'>
                <div>
                    <Image
                        src={eyelasher.attributes?.Image?.data[0].attributes?.url}
                        width={200}
                        height={200}
                        alt='doctor-image'
                        className='rounded-lg w-full h-[280px] object-cover' />

                </div>

                <div className='col-span-2 mt-5 flex md:px-10 flex-col gap-3 items-baseline'>
                    <h2 className='font-bold text-2xl'>{eyelasher.attributes?.Name}</h2>
                    <h2 className='flex gap-2 text-gray-500 text-md'>
                        <Sparkles />
                        <span>{eyelasher.attributes?.Year_of_Experience} </span>
                    </h2>
                    <h2 className='text-md flex gap-2 text-gray-500'>
                        <MapPin />
                        <span>{eyelasher.attributes.Address}</span>
                    </h2>
                    <h2 className='text-[10px] p-1 rounded-full px-2'>
                        {eyelasher.attributes?.categories.data.map((category, index) => (
                            <span key={index} className="p-2 text-center bg-blue-100 mr-2 text-primary rounded-full">{category.attributes?.Name}</span>
                        ))}
                    </h2>

                    <div className='flex gap-3'>
                        {socialMediaList.map((item, index) => (
                            item.url ? (
                                <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className='rounded-full'>
                                    <Image
                                        src={item.icon}
                                        width={30}
                                        height={30}
                                        alt='icon'
                                        className='rounded-full'
                                    />
                                </a>
                            ) : (
                                <Image
                                    src={item.icon}
                                    key={index}
                                    width={30}
                                    height={30}
                                    alt='icon'
                                    className='rounded-full'
                                />
                            )
                        ))}
                    </div>
                    <BookAppointment eyelasher={eyelasher} />
                </div>
            </div>

            <div className='p-3 border-[1px] rounded-lg mt-5'>
                <h2 className='font-bold text-[20px]'>關於</h2>
                {eyelasher.attributes?.About.map((paragraph, index) => (
                    <p key={index} className='text-gray-500 tracking-wide mt-2'>
                        {paragraph.children.map((child, childIndex) => (
                            <span key={childIndex}>{child.text}</span>
                        ))}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default EyelasherDetail
