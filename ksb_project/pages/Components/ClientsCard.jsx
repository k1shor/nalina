import Image from 'next/image'
import React from 'react'

const ClientsCard = ({ item }) => {
  const imagePath = item.image.startsWith('/') ? item.image : `/${item.image}`;

  return (
    <div className='h-[250px] w-full sm:w-[345px] rounded-lg border border-gray-600 flex flex-col justify-center items-center m-auto bg-blue-200'>
      <div className='relative w-full h-[150px]'>
        <img
          src={imagePath}
          alt={item.name}
          // layout='fill'
          // objectFit='cover'
          className='h-full w-[90%] object-cover m-auto'
        />
      </div>
      <p className='mt-3 text-center'>{item.name}</p>
    </div>
  )
}

export default ClientsCard
