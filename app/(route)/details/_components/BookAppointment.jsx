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
    // 獲取今天的日期
    const today = new Date();
    // 將日期加一天
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(today.getDate() + 3);

    const [date, setDate] = useState(threeDaysLater);
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
        for (let i = 10; i <= 10; i += 2) {
            timeList.push({
                time: i + ':00 AM'
            })

        }
        for (let i = 1; i <= 1; i += 3) {
            timeList.push({
                time: i + ':30 PM'
            })
            // timeList.push({
            //     time: i + ':30 PM'
            // })
        }

        // //原本的時段14:00pm
        // for (let i = 2; i <= 2; i += 2) {
        //     timeList.push({
        //         time: i + ':00 PM'
        //     })
        // }


        setTimeSlot(timeList)
    }

    const fetchBookedSlots = async () => {
        console.log("Fetching all booked slots");

        const fetchPage = async (page) => {
            try {
                const response = await GlobalApi.getAllBookings({
                    'pagination[page]': page,
                    'pagination[pageSize]': 100
                });
                console.log("API response:", response);
                return response.data;
            } catch (error) {
                console.error("Error fetching booked slots:", error);
                return { data: [], meta: { pagination: { pageCount: 0 } } };
            }
        };

        let allData = [];
        let currentPage = 1;
        let totalPages = 1;

        do {
            const response = await fetchPage(currentPage);
            allData = [...allData, ...response.data];
            currentPage += 1;
            totalPages = response.meta.pagination.pageCount;
        } while (currentPage <= totalPages);

        const bookedSlotsForDay = allData.filter(booking => {
            const bookingDate = new Date(booking.attributes.Date);
            const selectedDate = new Date(date);

            // 比較 UTC 日期
            return bookingDate.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];
        }).map(booking => booking.attributes.Time);

        console.log("Booked slots for selected day:", bookedSlotsForDay);

        setBookedSlots(bookedSlotsForDay);
    };

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
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 清除小時、分鐘、秒和毫秒部分

        // 計算三天後的日期
        const threeDaysLater = new Date(today);
        threeDaysLater.setDate(today.getDate() + 3);

        // 禁用今天及三天內的日期
        if (day < threeDaysLater) {
            return true;
        }

        // 禁用週五和週日
        const dayOfWeek = day.getDay();
        if (dayOfWeek === 5 || dayOfWeek === 0 || dayOfWeek === 6) {
            return true;
        }

        return false;
    }

    const isTimeSlotBooked = (time) => {
        return bookedSlots.includes(time);
    }

    const isTimeSlotAvailable = (day, time) => {
        if (!day || !(day instanceof Date)) {
            return false;
        }

        const dayOfWeek = day.getDay();

        if ((dayOfWeek === 3 || dayOfWeek === 6) && time === '2:00 PM') {
            return false;
        }

        return !isTimeSlotBooked(time);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-3 rounded-full">開始預約</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto" >
                <DialogHeader>
                    {/* <DialogTitle>預約系統</DialogTitle> */}
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
                                                    rounded-lg p-3'>
                                        {timeSlot?.map((item, index) => (
                                            <h2
                                                key={index}
                                                onClick={() => isTimeSlotAvailable(date, item.time) && setSelectedTimeSlot(item.time)}
                                                className={`p-2 border cursor-pointer text-center
                                                ${isTimeSlotBooked(item.time) || !isTimeSlotAvailable(date, item.time) ? 'bg-gray-300 cursor-not-allowed' : 'hover:bg-primary hover:text-white'}
                                                rounded-full ${item.time == selectedTimeSlot && 'bg-primary text-white'}`}>
                                                {isTimeSlotBooked(item.time) ? `${item.time} (已預約)` : !isTimeSlotAvailable(date, item.time) ? `${item.time} (暫不開放)` : item.time}                                            </h2>
                                        ))}
                                    </div>
                                    <div className='grid grid-cols-1 gap-2 
                                                    rounded-lg p-2'>
                                        點選「送出」系統會寄送預約email給您<br />
                                        請於兩天內完成訂金匯款，以保留預約資格
                                    </div>

                                    <div className='grid grid-cols-1 gap-2 
                                                    rounded-lg p-2'>
                                        ♫ 匯款資訊詳見email<br />
                                        ♫ 若需取消預約，可於「我的預約」進行取消
                                    </div>
                                </div>
                            </div>
                            <Textarea className="mt-3" placeholder="備註" onChange={(e) => setNote(e.target.value)} />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" className="text-red-500 border-red-500 m-1" variant="outline">
                            取消
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button" className="m-1" disabled={!(date && selectedTimeSlot && !isTimeSlotBooked(selectedTimeSlot))} onClick={saveBooking}>
                            送出
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default BookAppointment