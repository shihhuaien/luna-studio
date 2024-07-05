import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import { Calendar, Clock, MapPin } from 'lucide-react'
import CancelAppointment from './CancelAppointment';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';


function BookingList({ bookingList, expired, updateRecord }) {

    const onDeleteBooking = (item) => {
        console.log(item)
        GlobalApi.deleteBooking(item.id).then(resp => {
            console.log(resp);
            if (resp) {
                toast('取消成功!');
                updateRecord()
            }
        })
    }

    return (
        <div>
            {bookingList.length > 0 ? bookingList.map((item, index) => (
                <div key={index} className=' flex gap-4 items-center border p-5 m-3 rounded-lg'>
                    <Image
                        className='rounded-full h-[70px] w-[70px] object-cover'
                        src={item.attributes.eyelash_technician.data.attributes.Image.data[0].attributes.url}
                        width={70}
                        height={70}
                        alt={`Booking ${index}`}
                    />
                    <div className='flex flex-col gap-2 w-full'>
                        <h2 className='font-bold text-[18px] items-center flex justify-between'>{item.attributes.eyelash_technician.data.attributes.Name}
                            {!expired && <CancelAppointment onContinueClick={() => onDeleteBooking(item)} />}
                        </h2>
                        <a href="https://goyourstudio.com/direction/" target="_blank" rel="noopener noreferrer">
                            <h2 className='flex gap-2 text-gray-500'>
                                <MapPin className='text-primary h-5 w-5' />
                                {item.attributes.eyelash_technician.data.attributes.Address}
                            </h2>
                        </a>                        <h2 className='flex gap-2'><Calendar className='text-primary h-5 w-5' /> 日期：
                            {moment(item.attributes.Date).format('DD-MMM-YYYY')} </h2>
                        <h2 className='flex gap-2'><Clock className='text-primary h-5 w-5' /> 時間 : {item.attributes.Time} </h2>
                    </div>

                </div>
            )) :
                <div className='h-[150px] w-full bg-slate-100 animate-pulse rounded-lg'>
                </div>}
        </div>
    )
}

export default BookingList
