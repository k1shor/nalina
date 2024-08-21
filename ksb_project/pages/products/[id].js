import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { getProductByCategory } from '../api/productAPI';
import { getCategoryById } from '../api/categoryAPI';


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
                <img src="/one.jpg" alt="" className='h-40 w-full object-cover' />
                <p className='absolute text-white top-6 left-4 md:left-20 lg:left-52 text-2xl md:text-4xl font-semibold'>{category}</p>
                <p className='absolute text-white top-16 left-4 md:left-20 lg:left-52 text-sm md:text-base'>
                    Home/<span className='text-orange-500'>{category}</span>
                </p>
            </div>

            
        </div>
    );
}

export default Products;
