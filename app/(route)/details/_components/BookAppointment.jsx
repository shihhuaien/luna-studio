import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, Clock } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'

function BookAppointment({ eyelasher }) {
    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState();
    const [selectedTimeSlot, setSelectedTimeSlot] = useState();
    const [note, setNote] = useState();
    const [bookedSlots, setBookedSlots] = useState([]);
    const { user } = useKindeBrowserClient();


    useEffect(() => {
        getTime();
    }, []);

    useEffect(() => {
        if (user && date) {
            fetchBookedSlots();
        }
    }, [date, user]);

    const getTime = () => {
        const timeList = [];
        for (let i = 10; i <= 12; i += 2) {
            timeList.push({
                time: i + ':00 AM'
            })
            // timeList.push({
            //     time: i + ':30 AM'
            // })
        }
        for (let i = 2; i <= 2; i += 2) {
            timeList.push({
                time: i + ':00 PM'
            })
            // timeList.push({
            //     time: i + ':30 PM'
            // })
        }

        setTimeSlot(timeList)
    }

    const fetchBookedSlots = () => {
        console.log("Fetching all booked slots");


        GlobalApi.getAllBookings().then(response => {
            console.log("API response:", response);

            const bookedSlotsForDay = response.data.data.filter(booking => {
                const bookingDate = new Date(booking.attributes.Date);
                const selectedDate = new Date(date);

                // 比較 UTC 日期
                return bookingDate.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];
            }).map(booking => booking.attributes.Time);

            console.log("Booked slots for selected day:", bookedSlotsForDay);

            setBookedSlots(bookedSlotsForDay);
        }).catch(error => {
            console.error("Error fetching booked slots:", error);
        });
    }

    const saveBooking = () => {
        const data = {
            data: {
                UserName: user.given_name + " " + user.family_name,
                Email: user.email,
                Time: selectedTimeSlot,
                Date: date.toISOString(),  // 使用 ISO 字符串確保使用 UTC 時間
                eyelash_technician: eyelasher.id,
                Note: note
            }
        }
        // console.log(data)
        GlobalApi.bookAppointment(data).then(resp => {
            console.log(resp);
            if (resp) {
                GlobalApi.sendEmail(data).then(resp => {
                    console.log(resp)
                })
                toast("訂單確認信已寄出");
                fetchBookedSlots(); // 重新獲取已預約時間
            }
        })
    }

    const isPastDay = (day) => {
        return day <= new Date();
    }

    const isTimeSlotBooked = (time) => {
        return bookedSlots.includes(time);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-3 rounded-full">開始預約</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>預約系統</DialogTitle>
                    <DialogDescription>
                        <div>
                            <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
                                {/* Calender  */}
                                <div className='flex flex-col   gap-3 items-baseline'>
                                    <h2 className='flex gap-2 items-center'>
                                        <CalendarDays className='text-primary h-5 w-5' />
                                        選擇日期
                                    </h2>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        disabled={isPastDay}
                                        className="rounded-md border"
                                    />
                                </div>
                                {/* Time Slot  */}
                                <div className=' mt-3 md:mt-0'>
                                    <h2 className='flex gap-2 items-center mb-3'>
                                        <Clock className='text-primary h-5 w-5' />
                                        選擇開始時間
                                    </h2>
                                    <div className='grid grid-cols-1 gap-2 border 
                                                    rounded-lg p-5'>
                                        {timeSlot?.map((item, index) => (
                                            <h2
                                                key={index}
                                                onClick={() => !isTimeSlotBooked(item.time) && setSelectedTimeSlot(item.time)}
                                                className={`p-2 border cursor-pointer text-center
                                                ${isTimeSlotBooked(item.time) ? 'bg-gray-300 cursor-not-allowed' : 'hover:bg-primary hover:text-white'}
                                                rounded-full ${item.time == selectedTimeSlot && 'bg-primary text-white'}`}>{item.time}</h2>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <Textarea className="mt-3" placeholder="備註" onChange={(e) => setNote(e.target.value)} />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" className="text-red-500 border-red-500" variant="outline">
                            取消
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button" disabled={!(date && selectedTimeSlot && !isTimeSlotBooked(selectedTimeSlot))} onClick={saveBooking}>
                            送出
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default BookAppointment