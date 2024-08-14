import { getAllCategories } from '@/pages/api/categoryAPI';
import { getProductById, updateProduct } from '@/pages/api/productAPI';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';

// export async function getStaticProps() {
//     let FRONTEND_URL = process.env.FRONTEND_URL
//     return {props: {FRONTEND_URL}}
// }

const edit_Product = () => {

    // let FRONTEND_URL = process.env.FRONTEND_URL
    let [categorys, setCategorys] = useState([]);
    // let [productById, setProductById] = useState({});
    const params = useParams()
    let id = params?.id;
    const [formData, setFormData] = useState({
        product_title: '',
        about: '',
        application: '',
        capacity: '',
        head: '',
        temperature: '',
        tank_capacity: '',
        capacity: '',
        file: null,
    });

    const [message, setMessage] = useState('');

    // let [product, setProduct] = useState({
    //     title: "",
    //     category: "",
    //     about: "",
    //     application: '',
    //     formdata: new FormData,
    // });

    // const { product_title, category, about, application } = productById;



    let [error, setError] = useState("");
    let [success, setSuccess] = useState("false");

    // console.log(productById, "Product By IDDDDDD")


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

        getAllCategories().then((data) => {
            if (data) {
                setCategorys(data);
            }
        });

        getProductById(id).then((data) => {
            if (data) {
                setFormData(data)
            }
        }
        )



    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.file) {
            setMessage('Please select a file.');
            return;
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
        formPayload.append('file', formData.file);

        // for (let item of formData) {
        //     console.log(item[0], item[1])
        // }

        // updateProduct(id, formData).then((data => {
        //     if (data && data.error) {
        //         setError(data.error);
        //         setSuccess(false);
        //     } else {
        //         setSuccess(true);
        //         setProductById({
        //             product_title: "",
        //             price: "",
        //             description: "",
        //             count_in_stock: "",
        //         });
        //         // sel_ref.current.value = "";
        //         // file_ref.current.value = "";
        //         setError("");
        //     }
        // }))

        fetch(`/api/upload?id=${id}`, {
            method: 'PATCH',
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
    const handleEditorChange = (content, editor) => {
        const { id } = editor;
        setFormData({ ...formData, [id]: content })
    }


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
                                Edit Product
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {showError}
                            {showSuccess}
                            <div className="">
                                <div>
                                    <label
                                        for="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Product Name*
                                    </label>
                                    <input
                                        type="text"
                                        name="product_title"
                                        value={formData.product_title}
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                        required=""
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="about" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About:</label>

                                    <Editor

                                        apiKey="19m7bc67maqca1olojnw5zzrphaac5oh1r0hgrkq2jfv5y5v"
                                        // onInit={(_evt, editor) => editorRef.current = editor}

                                        init={{
                                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                                            toolbar: 'undo redo | bold italic  |aligncenter | alignleft |alignright| fontsize',
                                            tinycomments_mode: 'embedded',
                                            tinycomments_author: 'Author name',
                                            height: 800,
                                            width: 600,
                                            menubar: false,
                                            directionality: 'ltr',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',

                                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                        }}
                                        initialValue={formData.about}
                                        id="about"
                                        name="about"
                                        value={formData.about}
                                        onEditorChange={handleEditorChange}
                                    />
                                </div>

                                <div>
                                    <label
                                        for="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Application*
                                    </label>
                                    <input
                                        type="text"
                                        name="application"
                                        value={formData.application}
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                        required=""
                                        onChange={handleChange}
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
                                        name="category"
                                        value={formData.category}
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type count in stock"
                                        required=""
                                        onChange={handleChange}
                                    >
                                        <option disabled selected>
                                            Select Category
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
                                <div className='col-span-2'>

                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file" type="file" name='file' onChange={handleFileChange} required />



                                </div>


                            </div>
                            <button
                                // onClick={handleSubmit}
                                type="add"
                                className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-10"
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
                                Edit product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


export default edit_Product