import { deleteCategory, getAllCategories } from '@/pages/api/categoryAPI'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export async function getStaticProps() {
    let FRONTEND_URL = process.env.FRONTEND_URL
    return { props: { FRONTEND_URL } }
}

const client_page = (props) => {
    let [clients, setClients] = useState([])
    let router = useRouter()


    useEffect(() => {

        fetch('http://localhost:3000/api/client', {
            method: "GET",
        })
            .then(res => res.json())
            .then(data => setClients(data))
    }, [])
    console.log(clients, "CLIENTS")


    const handleDelete = (id) => (e) => {
        e.preventDefault()
        Swal.fire({
            title: "Confirm ",
            text: "Are you sure you want to delete this client?",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: '#dd1111',
            confirmButtonText: "OK, Delete!",
            position: "center",
            // timer:1000,
        })
            .then(result => {
                if (result.isConfirmed) {
                    fetch(`http://localhost:3000/api/client?id=${id}`, {
                        method: "DELETE"
                    })
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
                    <h1>Clients</h1>
                    <Link href='/admin/client/new'><button type='add'>Add new Client</button></Link>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    S.No
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Client Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clients?.map((client, i) => {
                                    return <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {i + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {client.name}
                                        </td>
                                        <td className="px-6 py-4">
                                           <img src = {`${props.FRONTEND_URL}/${client.image}`} alt={`${props.FRONTEND_URL}/${client.image}`} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link href={`/admin/client/edit/${client._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"><button type='warning'>Edit</button></Link>
                                            <button type='delete' onClick={handleDelete(client._id)}>Delete</button>
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

export default client_page