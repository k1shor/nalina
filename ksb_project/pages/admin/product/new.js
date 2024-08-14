import { getAllCategories, getSubCategories } from '@/pages/api/categoryAPI';
import { addProduct } from '@/pages/api/productAPI';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

const add_Product = () => {
    let [categorys, setCategorys] = useState([]);
    let [subcategories, setSubCategories] = useState([]);
    const [formData, setFormData] = useState({
        product_title: '',
        about: '',
        application: '',
        capacity: '',
        head: '',
        temperature: '',
        tank_capacity: '',
        category: '',
        parent_category:'',
        file: null,
    });
    const [message, setMessage] = useState('');
    const editorRef = useRef(null);

    // for (let [key, value] of formData) {
    //     console.log(`${key}: ${value}`)
    // }
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

    const handleEditorChange = (content, editor) => {
        const { id } = editor;
        setFormData({ ...formData, [id]: content })
    }


    let [error, setError] = useState("");
    let [success, setSuccess] = useState(false);




    useEffect(() => {

        getAllCategories().then((data) => {
            if (data) {
                setCategorys(data);
            }
        });



    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.file) {
            setMessage('Please select a file.');
            return;
        }
        if (editorRef.current) {
            console.log(editorRef.current.getContent(), "HELLLO");
            let x = editorRef.current.getContent()
            // console.log(x, "HELLO")
        }

        const formPayload = new FormData();
        formPayload.append('product_title', formData.product_title);
        formPayload.append('about', formData.about);
        formPayload.append('application', formData.application);
        formPayload.append('capacity', formData.capacity);
        formPayload.append('head', formData.head);
        formPayload.append('temperature', formData.temperature);
        formPayload.append('tank_capacity', formData.tank_capacity);
        formPayload.append('category', formData.category);
        formPayload.append('category', formData.category);
        formPayload.append('file', formData.file);

        fetch('/api/upload', {
            method: 'POST',
            body: formPayload,
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setSuccess("Product Added Successfully");
                }
            })
            .catch(error => {
                setMessage('Form submission error');
                console.error('Form submission error:', error);
            })
    };

    const showError = () => {
        if (error) {
            return <div className="bg-red-200 text-center">{error} </div>;
        }
    };
    const showSuccess = () => {
        if (success) {
            return (
                <div className="bg-green-200 text-center">
                    Product Added Successfully.
                </div>
            );
        }
    };

    const loadSubCategory = e => {
        getSubCategories(e.target.value)
        .then(data=>setSubCategories(data))
        .catch(err=>console.log(err))

        handleChange(e)
    }





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
                        <Link href="/admin/product">Back</Link>
                    </button>

                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Add New Product
                            </h3>
                            {showError()}
                            {showSuccess()}
                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="">

                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name*:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="product_title"
                                        value={formData.product_title}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label htmlFor="about" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About:</label>

                                    <Editor

                                        apiKey="o1equku4lp8l3yh1h3b9jkzlwh4c9c65pwx5zp494tq4mgke"
                                        onInit={(_evt, editor) => editorRef.current = editor}

                                        init={{
                                            // plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
                                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                            tinycomments_mode: 'embedded',
                                            tinycomments_author: 'Author name',
                                            height: 300,
                                            width: 600,
                                            menubar: false,
                                            directionality: 'ltr',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',

                                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                        }}
                                        value={formData.about}
                                        id="about"
                                        name="about"
                                        onEditorChange={handleEditorChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="application" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">application:</label>
                                    <input
                                        type="text"
                                        id="application"
                                        name="application"
                                        value={formData.application}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label htmlFor="capacity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">capacity:</label>
                                    <input
                                        type="text"
                                        id="capacity"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label htmlFor="head" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">head:</label>
                                    <input
                                        type="text"
                                        id="head"
                                        name="head"
                                        value={formData.head}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label htmlFor="temperature" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">temperature:</label>
                                    <input
                                        type="text"
                                        id="temperature"
                                        name="temperature"
                                        value={formData.temperature}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label htmlFor="tank_capacity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">tank_capacity:</label>
                                    <input
                                        type="text"
                                        id="tank_capacity"
                                        name="tank_capacity"
                                        value={formData.tank_capacity}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                        required=""

                                    />
                                </div>
                                <div>
                                    <label
                                        for="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Category *
                                    </label>

                                    <select
                                        type="text"
                                        name="parent_category"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type count in stock"
                                        required=""
                                        onChange={loadSubCategory}
                                    >
                                        <option disabled selected>
                                            Select Main Category
                                        </option>
                                        {categorys.map((category) => {
                                            return (
                                                <option value={category._id} key={category._id}>
                                                    {category.category_name}
                                                </option>
                                            );
                                        })}
                                    </select>

                                    
                                </div>

                                <div>
                                    <label
                                        for="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Sub Category *
                                    </label>

                                    <select
                                        type="text"
                                        name="category"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type count in stock"
                                        required=""
                                        onChange={handleChange}
                                    >
                                        <option disabled selected>
                                            Select Category
                                        </option>
                                        {subcategories?.map((category) => {
                                            return (
                                                <option value={category._id} key={category._id}>
                                                    {category.category_name}
                                                </option>
                                            );
                                        })}
                                    </select>

                                    
                                </div>
                                <div className='col-span-2'>

                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file" type="file" name='file' onChange={handleFileChange} required />



                                </div>
                                <button
                                    onClick={handleSubmit}
                                    type="add"
                                    className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 col-span-2 mt-11"
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
                                    Add new product
                                </button>
                                {message && <p className='text-red-600'>{message}</p>}
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </>
    )
}

export default add_Product