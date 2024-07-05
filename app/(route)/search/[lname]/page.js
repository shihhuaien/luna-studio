'use client'
import Eyelash from '@/app/_components/Eyelash'
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'

function Search({ params }) {
    const [lasherList, setLasherList] = useState([])

    useEffect(() => {
        console.log(params.lname);
        getLasher();
    }, [])


    const getLasher = () => {
        GlobalApi.getLasherByCategory(params.lname)
            .then(resp => {
                setLasherList(resp.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };



    return (
        <div className='mt-5'>
            <Eyelash
                heading={params.lname}
                eyelashList={lasherList}
            />
        </div>
    )
}

export default Search
