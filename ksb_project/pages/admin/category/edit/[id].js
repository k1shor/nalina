'use client'

import { getCategoryById, updateCategory } from '@/pages/api/categoryAPI'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const edit = () => {
    const router = useRouter()
    const params = useParams()
    let [category_name, setCategory] = useState('')

    let id = params?.id;
    // console.log(id, "id")

    useEffect(() => {
        if (id) {
            getCategoryById(id)
                .then(data => {
                    // console.log(data)
                    setCategory(data.category_name)
                })
                .catch(err => console.log(err))
        }



    }, [id])
    // console.log(category_name, "nameeeee")


    const handleEdit = async (e) => {
        e.preventDefault()
        await updateCategory(id, category_name)
            .then(data => {

                if (data.error) {
                    Swal.fire('Error', data.error, 'error')
                }
                else {
                    Swal.fire('Success', 'Category updated successsfully', 'success')
                    setCategory('')
                    router.push('/admin/category')
                }
            })
    }



    return (
        <>
            <div id="defaultModal" tabindex="-1" aria-hidden="true" className=" overflow-y-auto overflow-x-hidden mx-auto z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full p-7 bg-slate-50">
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <button type="general"><Link href='/admin/category'>Back</Link></button>
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 mt-3">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Edit Category
                            </h3>
                        </div>
                        <form >
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type category name" required="" value={category_name} onChange={(e) => setCategory(e.target.value)} />
                                </div>
                            </div>
                            <button type="add" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleEdit}>
                                <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default edit