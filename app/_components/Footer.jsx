import React from 'react';
import Image from 'next/image';

function Footer() {
    return (
        <footer className="bg-gray-100">
            <div className="mx-auto max-w-5xl px-4 justify-center py-16 sm:px-6 lg:px-8">
                <div className="flex justify-center text-teal-600">
                    <Image
                        src='/logo.svg'
                        alt='logo'
                        width={120}
                        height={50}
                    />
                </div>

                <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
                    台北獨立美睫職人
                </p>

                {/* <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
                    <li>
                        <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> About </a>
                    </li>

                    <li>
                        <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Careers </a>
                    </li>

                    <li>
                        <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> History </a>
                    </li>

                    <li>
                        <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Services </a>
                    </li>

                    <li>
                        <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Projects </a>
                    </li>

                    <li>
                        <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Blog </a>
                    </li>
                </ul> */}

                <ul className="mt-12 flex justify-center gap-6 md:gap-8">
                    <li>
                        <a
                            href='https://www.instagram.com/luna_thelashartist?igsh=aXp4c2d3dnBmaXVl&utm_source=qr'
                            rel="noreferrer"
                            target="_blank"
                            className="text-gray-700 transition hover:text-gray-700/75"
                        >
                            <span className="sr-only">Instagram</span>
                            <img src="/instagram.png" alt="Instagram" className="h-6 w-6 rounded-full" />
                        </a>
                    </li>
                    <li>
                        <a
                            href='https://www.threads.net/@luna_thelashartist'
                            rel="noreferrer"
                            target="_blank"
                            className="text-gray-700 transition hover:text-gray-700/75"
                        >
                            <span className="sr-only">Instagram</span>
                            <img src="/threads.jpg" alt="Instagram" className="h-6 w-6 rounded-full" />
                        </a>
                    </li>
                    <li>
                        <a
                            href='https://lin.ee/s7dBTpi'
                            rel="noreferrer"
                            target="_blank"
                            className="text-gray-700 transition hover:text-gray-700/75"
                        >
                            <span className="sr-only">Instagram</span>
                            <img src="/line.png" alt="Instagram" className="h-6 w-6 rounded-full" />
                        </a>
                    </li>
                    <li>
                        <a
                            href='https://www.xiaohongshu.com/user/profile/624a9fbf0000000010005674?xhsshare=CopyLink&appuid=624a9fbf0000000010005674&apptime=1719818657'
                            rel="noreferrer"
                            target="_blank"
                            className="text-gray-700 transition hover:text-gray-700/75"
                        >
                            <span className="sr-only">Instagram</span>
                            <img src="/redbook.png" alt="Instagram" className="h-6 w-6 rounded-full" />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer
