import React, { useState } from 'react'
import { authenticate, isAuthenticated, login } from '../api/userAPI'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const index = () => {
    let [error, setError] = useState("")
    let [user, setUser] = useState({

        email: "",
        password: ""
    })
    const router = useRouter()

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(user)
            .then(data => {
                console.log(data, "login")
                if (data && data.error) {

                    setError(data.error)
                }
                else {

                    {
                        // data.isVerified &&

                        authenticate(data)

                        router.push("/admin/dashboard")
                    }




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
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required onChange={handleChange} />
                </div>
                <div className="mb-5">
                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" name='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handleChange} />
                </div>
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                    </div>
                    <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
                <div className='flex justify-between'>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Submit</button>

                    <div className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><Link href="/register">Register Now!</Link></div>
                </div>
            </form>

        </div>
    )
}

export default index