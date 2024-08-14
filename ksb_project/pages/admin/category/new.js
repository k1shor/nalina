"use client";
import { addCategory, getAllCategories } from "@/pages/api/categoryAPI";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const add = () => {
    let [category, setCategory] = useState("");
    let [parent_category, setParent] = useState("")
    let [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories()
            .then(data => {
                setCategories(data)
            })
            .catch(err => console.log(err))
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        addCategory(category, parent_category).then((data) => {
            if (data.error) {
                Swal.fire("Error", data.error, "error");
            } else {
                Swal.fire("Success", data.error, "success");
                setCategory("");
            }
        });
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
                        <Link href="/admin/category/">Back</Link>
                    </button>

                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Add New Category
                            </h3>
                        </div>

                        <form>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        for="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Category Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type category name"
                                        required=""
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label
                                        for="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Parent Category
                                    </label>
                                    <select
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type category name"
                                        required=""
                                        onChange={(e) => setParent(e.target.value)}
                                    >
                                        <option selected disabled>Choose Category</option>
                                        {
                                            categories.length > 0 &&
                                            categories.map(cat=>{
                                                return<option value={cat._id}>{cat.category_name}</option>
                                            })
                                        }
                                        </select>
                                </div>
                            </div>
                            <button
                                type="add"
                                onClick={handleSubmit}
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
                                Add new Category
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default add;
