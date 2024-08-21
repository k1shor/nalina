import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { getProductByCategory } from '../api/productAPI';
import { getCategoryById } from '../api/categoryAPI';
import ProductByCategory from './productByCategory';
import Link from 'next/link';


const URL = `https://nalina.indexithub.com`

const Products = () => {
    let params = useParams();
    const id = params?.id;
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('')
    const router = useRouter()
    useEffect(() => {
        getCategoryById(id)
            .then(data => setCategory(data.category_name))
            .catch(err => console.log(err));

        getProductByCategory(id)
            .then(data => setProducts(data))
            .catch(err => console.log(err));
    }, [id]);

    const onBtnClick = () => {
        router.back()
    }

    return (
        <div>

            <div className='relative'>
                <div className="banner absolute top-0 left-0 h-full w-full bg-blue-400"></div>
                <img src="/one.jpg" alt="" className='h-40 w-full object-cover' />
                <p className='absolute text-white top-6 left-4 md:left-20 lg:left-52 text-2xl md:text-4xl font-semibold'>{category}</p>
                <p className='absolute text-white top-16 left-4 md:left-20 lg:left-52 text-sm md:text-base'>
                    Home/<span className='text-orange-500'>Products/<b>
                        {category}</b></span>
                </p>
            </div>
            <h1 className='font-bold text-center mt-7'>{category}</h1>

            <div className='w-full m-auto grid md:grid-cols-2 xl:grid-cols-3 p-4 '>

                {
                    products.length > 0 &&
                    <ProductByCategory category={id} />
                }
            </div>
            <div className='w-3/4 m-auto flex justify-between mt-4'>

                <button type="button" className="text-gray-900 bg-white border border-black border-solid focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 font-bold " onClick={() => onBtnClick()}>
                    &lt; Back
                </button>
            </div>
        </div>
    )
}

export default Products;
