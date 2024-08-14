'use client'

import { updateCategory } from '@/pages/api/categoryAPI'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const edit = () => {
    const router = useRouter()
    const params = useParams()


    let id = params?.id;
    // console.log(id, "id")
    const [formData, setFormData] = useState({
        name: '',

        file: null,
    });

    const [message, setMessage] = useState('');


    console.log(formData, "FORM DATA")
    let [error, setError] = useState("");
    let [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value,
        });

    };
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0],
        });
    };
    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3000/api/client?id=${id}`
                , { method: "GET" })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    setFormData(data)
                })
                .catch(err => console.log(err))
        }



    }, [id])
    // console.log(category_name, "nameeeee")


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.file) {
            setMessage('Please select a file.');
            return;
        }
        const formPayload = new FormData();

        formPayload.append('name', formData.name);

        formPayload.append('file', formData.file);



        fetch(`http://localhost:3000/api/client?id=${id}`, {
            method: 'PATCH',
            body: formPayload,
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data, "DATAAAA")
                if (data.error) {
                    setError(data.error);
                } else {
                    setSuccess(true);
                }
            })
            .catch(error => {
                setMessage('Form submission error');
                console.error('Form submission error:', error);
            })
    };

    console.log(success, "SUCCESSSSS")
    const showError = () => {
        if (error) {
            return <div className="bg-red-200 text-center">{error} </div>;
        }
    };
    const showSuccess = () => {
        if (success) {
            return (
                <div className="bg-green-200 text-center">
                    Client Edited Successfully.
                </div>
            );
        }
    };



    return (
        <>
            <div
                id="defaultModal"
                tabindex="-1"
                aria-hidden="true"
                className=" overflow-y-auto overflow-x-hidden mx-auto z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full p-7 bg-slate-50"
            >
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <button type="general">
                        <Link href="/admin/client/">Back</Link>
                    </button>

                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Edit Client
                            </h3>

                            {showError()}
                            {showSuccess()}
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        for="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"

                                    >
                                        Client Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type client name"
                                        required=""

                                    />
                                </div>
                                <div className='col-span-2'>

                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file" type="file" name='file' onChange={handleFileChange} required />



                                </div>
                            </div>
                            <button
                                type="add"
                                // onClick={handleSubmit}
                                className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800  "
                            >
                                <svg
                                    className="mr-1 -ml-1 w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                Edit Client
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default edit