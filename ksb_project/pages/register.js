import React, { useState } from 'react'

import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { registerUser } from './api/userAPI'

const register = () => {
    let [error, setError] = useState("")
    let [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    const router = useRouter()

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        registerUser(user)
            .then(data => {
                if (data && data.error) {
                    setError(data.error)
                }
                else {
                    router.push("/admin")
                }
            })


    }

    const showError = () => {
        if (error) {
            Swal.fire("Error", error, "error")
            setError("")
        }
    }
    // console.log(user, "USERRRRRR")

    return (
        <div className='mt-20 '>
            {showError()}

            <form className="max-w-sm mx-auto border-[1px] border-solid border-gray-600 p-7 rounded-lg">

                <div className="mb-5">
                    <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
                    <input type="text" id="email" name='username' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your user name" required onChange={handleChange} />
                </div>
                <div className="mb-5">
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required onChange={handleChange} />
                </div>
                <div className="mb-5">
                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" name='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handleChange} />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Register</button>

            </form>

        </div>
    )
}

export default register