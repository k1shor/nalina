import Link from 'next/link';
import React, { useState } from 'react';
import { addMessage } from './api/contactAPI';
import Swal from 'sweetalert2';

const ContactUs = () => {
    let [msg, setMessage] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    let { name, email, subject, message } = msg

    const handleChange = (e) => {
        setMessage({ ...msg, [e.target.name]: e.target.value });
    };

    const handleClick = (e) => {
        e.preventDefault();
        addMessage(msg)
            .then(data => {
                if (data && data.error) {
                    Swal.fire("Error", data.error, "error");
                } else {
                    Swal.fire("", "Thank you for your enquiry. We will get back to you soon.", "success");
                    setMessage({ name: "", email: "", subject: "", message: "" })
                }
            });
    };

    return (
        <>
            <div className='relative'>
                <div className="banner absolute top-0 left-0 h-full w-full bg-blue-400"></div>
                <img src="/one.jpg" alt="" className='h-40 w-full object-cover' />
                <p className='absolute text-white top-6 left-4 md:left-20 lg:left-52 text-2xl md:text-4xl font-semibold'>Contact Us</p>
                <p className='absolute text-white top-16 left-4 md:left-20 lg:left-52 text-sm md:text-base'>
                    <Link href="/">Home</Link>/<span className='text-orange-500'>Contact Us</span>
                </p>
            </div>



            <div className='w-full md:w-3/4 lg:w-[1200px] m-auto mt-8 md:mt-14 px-4 flex flex-col md:flex-row gap-5 justify-between'>
                <div className='w-full md:w-2/3'>

                    <p className='text-4xl md:text-4xl font-bold underline'>
                        Nalina Machinery Suppliers Pvt. Ltd.
                    </p>
                    <p className='text-xl md:text-3xl font-medium mt-4 md:mt-4'>Newroad, Pokhara, Nepal</p>
                    <p className='text-xl md:text-3xl font-medium mt-4 md:mt-4'>Phone: 9856058042, 9802804200 </p>
                    <p className='text-xl md:text-3xl font-medium mt-4 md:mt-4'>Email: info@nalinagroup.com </p>

                    <div className='w-full m-auto flex justify-center items-center mt-8 md:mt-14 pr-12'>
                        <iframe
                            className='w-full h-40 md:h-96'
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1496.912199227362!2d83.98481097360607!3d28.216921025806524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995944d76693d11%3A0xf1f006d89be13640!2sNew%20Rd%2C%20Pokhara%2033700!5e1!3m2!1sen!2snp!4v1721551946347!5m2!1sen!2snp"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>


                </div>

                <div className='w-full md:w-1/3'>
                    <form className="mb-6 border p-5 rounded-lg bg-blue-200">
                        <div className="mb-6">
                            <h1 className='mb-6 font-bold underline text-center '>Inquiry Form</h1>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Xyz" required onChange={handleChange} value={name} />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xyz@gmail.com" required onChange={handleChange} value={email} />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                            <input type="text" id="subject" name='subject' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Let us know how we can help you" required onChange={handleChange} value={subject} />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                            <textarea id="message" rows="4" name='message' className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none h-40" placeholder="Your message..." onChange={handleChange} value={message}></textarea>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block" onClick={handleClick}>Send inquiry</button>
                    </form>
                </div>
            </div>


        </>
    );
}

export default ContactUs;
