import React, { useEffect, useState } from 'react';
// import { Clients } from "../raw.js";
import ClientsCard from './Components/ClientsCard.jsx';

const clients = () => {

    let [clients, setClients] = useState([])
    useEffect(() => {
        fetch(`/api/client`).then(res => res.json())
            .then(data => setClients(data))


    }, [])
    return (
        <div>
            <div className='relative'>
                <div className="banner absolute top-0 left-0 h-full w-full bg-blue-400"></div>
                <img src="/one.jpg" alt="" className='h-40 w-full object-cover' />
                <p className='absolute text-white top-6 left-4 md:left-20 lg:left-52 text-2xl md:text-4xl font-semibold'>Clients</p>
                <p className='absolute text-white top-16 left-4 md:left-20 lg:left-52 text-sm md:text-base'>
                    Home/<span className='text-orange-500'>Clients</span>
                </p>
            </div>
                <h1 className='font-bold text-center mt-7'>Our Clients include:</h1>
            <div className='w-full m-auto grid md:grid-cols-2 xl:grid-cols-3 p-4 '>
                {
                    clients.map((item) => {
                        return (
                            <div key={item.id} className=' py-4 m-auto w-full text-center'>
                                <ClientsCard item={item} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default clients;
