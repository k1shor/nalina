import React, { useEffect, useState } from 'react'
import { deleteMessage, getAllMessages } from '../api/contactAPI'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

const message_one = () => {
    let [messages, setMessages] = useState([])
    let router = useRouter()

    useEffect(() => {
        getAllMessages()
            .then(data => {
                console.log(data, "Data")
                setMessages(data)
            })
    }, [])
    console.log(messages, "Messages")
    const handleDelete = (id) => (e) => {
        e.preventDefault()
        Swal.fire({
            title: "Confirm ",
            text: "Are you sure you want to delete this category?",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: '#dd1111',
            confirmButtonText: "OK, Delete!",
            position: "center",
            // timer:1000,
        })


            .then(result => {
                if (result.isConfirmed) {
                    deleteMessage(id)
                        .then(data => {
                            if (data.error) {
                                Swal.fire("Error", data.error, 'error')
                            }
                            else {
                                Swal.fire("Success", data.message, 'success')
                                    .then(data => {
                                        router.refresh()
                                    })
                            }
                        })
                }
                else {
                    Swal.fire("Cancelled", "Nothing is deleted ", 'info')
                }
            })
    }
    return (
        <div>
            <div>
                <div className='p-5 text-center'>
                    <h1>Messages</h1>
                </div>
                {
                    messages.length > 0 ?
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            S.No
                                        </th>

                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Subject
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Message
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        messages?.map((item, i) => {
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
                                                    {item.subject}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.message}
                                                </td>
                                                <td className="px-6 py-4">

                                                    <button type='delete' onClick={handleDelete(item._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        :
                        <div className='text-2xl  text-center text-red-600'>No Messages to Show</div>
                }
            </div>
        </div>
    )
}

export default message_one