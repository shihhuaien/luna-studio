import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';


function CancelAppointment({ onContinueClick }) {
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger><Button className='text-primary border-primary' variant='outline'>取消</Button></AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>確定嗎?</AlertDialogTitle>
                        <AlertDialogDescription>
                            取消預約後，原先預約的時段會釋出，如果還想預約歡迎重新預約。
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>返回</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onContinueClick()}>確定</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default CancelAppointment
