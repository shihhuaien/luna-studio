'use client'

import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';
import EyelasherDetail from '../_components/EyelasherDetail';
import EyelasherSuggestionList from '../_components/EyelasherSuggestionList';

function Details({ params }) {
    const [eyelasher, setEyelasher] = useState()

    useEffect(() => {
        getEyeLasherById()
    }, [])

    const getEyeLasherById = () => {
        GlobalApi.getEyelashById(params.recordId).then(resp => {
            console.log(resp);
            setEyelasher(resp.data.data)
        })
    }
    return (
        <div className='p-5 md:px-10'>
            <h2 className='font-bold text-[22px]'>Details</h2>
            <div className='grid grid-cols-1 lg:grid-cols-4 '>
                <div className=' col-span-3'>
                    {eyelasher && <EyelasherDetail eyelasher={eyelasher}></EyelasherDetail>}
                </div>
                <div>
                    <EyelasherSuggestionList />
                </div>
            </div>
        </div>
    )
}

export default Details
