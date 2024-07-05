'use client'

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from './_components/BookingList';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import GlobalApi from '@/app/_utils/GlobalApi';

function MyBooking() {
    const { user } = useKindeBrowserClient();

    const [bookingList, setBookingList] = useState([]);
    useEffect(() => {
        user && getUserBookingList();
    }, [user])

    const getUserBookingList = () => {
        GlobalApi.getUserBookingList(user?.email).then(resp => {
            console.log(resp.data.data)
            setBookingList(resp.data.data);
        })
    }

    const filterUserBooking = (type) => {
        const result = bookingList.filter(item =>
            type == 'upcoming' ? new Date(item.attributes.Date) >= new Date()
                : new Date(item.attributes.Date) <= new Date()
        )
        console.log(result)
        return result;
    }

    return (
        <div className='px-4 sm:px-10 mt-10'>
            <h2 className='font-bold text-2xl'>
                我的預約
            </h2>
            <Tabs defaultValue="upcoming" className="w-full mt-5">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="upcoming">即將開始</TabsTrigger>
                    <TabsTrigger value="expired">過期</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                    <BookingList bookingList={filterUserBooking('upcoming')}
                        updateRecord={() => getUserBookingList()}
                        expired={false}
                    />
                </TabsContent>
                <TabsContent value="expired">
                    <BookingList bookingList={filterUserBooking('expired')}
                        updateRecord={() => getUserBookingList()}
                        expired={true}
                    />
                </TabsContent>
            </Tabs>

        </div >
    )
}

export default MyBooking
