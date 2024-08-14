import React, { useEffect, useState } from 'react'
import { deleteMessage, getAllMessages } from '../api/contactAPI'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { getUser, verifyUser } from '../api/userAPI'

const user = () => {
    let [allUser, setAllUser] = useState([])
    let router = useRouter()

    useEffect(() => {
        getUser()
            .then(data => {
                // console.log(data, "Data")
                setAllUser(data)
            })
    }, [])
    console.log(allUser, "All Users")
    const handleVerify = (id) => {
        verifyUser(id)
            .then(data => console.log(data))
        router.refresh()

    }

    return (
        <div>
            <div>
                <div className='p-5 text-center'>
                    <h1>Users</h1>
                </div>
                
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    S.No
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    User Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUser?.map((item, i) => {
                                    return <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {i + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.email}
                                        </td>

                                        <td className="px-6 py-4">
                                            {
                                                item.isVerified ? <button className='border-green-600 border-[1px] border-solid text-green-600' type='' >Verified</button> : <button className='border-red-600 border-[1px] border-solid text-red-600' onClick={() => handleVerify(item._id)}>Verify</button>
                                            }


                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default user