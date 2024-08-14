import Link from 'next/link'
import React, { useState } from 'react'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='w-full md:w-3/4 m-auto'>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href='/'>
                        <img src="/logo.jpg" alt="Logo" className="h-8 sm:h-20" />
                    </Link>

                    <button
                        type="button"
                        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded={isMenuOpen}
                        onClick={toggleMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                        </svg>
                    </button>

                    <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 md:justify-end md:text-center">
                            <li>
                                <Link href="/" className="block py-2 px-3 text-gray-700 bg-white rounded md:bg-transparent md:text-gray-700 md:p-2 dark:text-white md:dark:text-blue-500 hover:md:bg-ksb hover:md:text-white hover:duration-200" aria-current="page">HOME</Link>
                            </li>
                            <li>
                                <Link href="/clients" className="block py-2 px-3 text-gray-700 bg-white rounded md:bg-transparent md:text-gray-700 md:p-2 dark:text-white md:dark:text-blue-500 hover:md:bg-ksb hover:md:text-white hover:duration-200">CLIENTS</Link>
                            </li>
                            <li>
                                <Link href="/products" className="block py-2 px-3 text-gray-700 bg-white rounded md:bg-transparent md:text-gray-700 md:p-2 dark:text-white md:dark:text-blue-500 hover:md:bg-ksb hover:md:text-white hover:duration-200">OUR PRODUCTS</Link>
                            </li>
                            <li>
                                <Link href="/about" className="block py-2 px-3 text-gray-700 bg-white rounded md:bg-transparent md:text-gray-700 md:p-2 dark:text-white md:dark:text-blue-500 hover:md:bg-ksb hover:md:text-white hover:duration-200">ABOUT US</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="block py-2 px-3 text-gray-700 bg-white rounded md:bg-transparent md:text-gray-700 md:p-2 dark:text-white md:dark:text-blue-500 hover:md:bg-ksb hover:md:text-white hover:duration-200">CONTACT US</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
