import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Hero() {
    return (
        <div>
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                        <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                            <Image
                                alt=""
                                src="/lash-technician.webp"
                                width={800}
                                height={800}
                                className="absolute inset-0 h-full rounded-3xl  w-full object-cover"
                            />
                        </div>

                        <div className="lg:py-24">
                            <h2 className="text-4xl font-bold sm:text-4xl">
                                預約
                                <span className='text-primary'> 美睫</span>
                            </h2>

                            <p className="mt-4 text-gray-600">
                                想要素顏就美麗，自然健康的睫毛不可少。LUNA Eyelash主打兼顧舒適、自然、眼線感的美睫風格，讓女孩們無論素顏或上妝，都輕鬆擁有清亮眼神。
                            </p>
                            <Link href='details/1'>
                                <Button className='mt-10 sm:text-xl'>
                                    BOOK NOW
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero
