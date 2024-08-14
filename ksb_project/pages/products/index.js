
import React, { useEffect, useState } from "react";
import { getAllCategories, getSubCategories } from "../api/categoryAPI.js";
import { getAllProduct, getProductByCategory } from "../api/productAPI.js";
import Link from 'next/link';
import ProductByCategory from "./productByCategory";



const Index = (props) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([])
  const [products, setProducts] = useState([]);
  // const [productsBasedOnCategory, setProductsBasedOnCategory] = useState([]);
  let [reset, setReset] = useState(false)

  useEffect(() => {
    setReset(false)
    if (categories.length == 0) {
      getAllCategories().then((data) => setCategories(data));
    }
    getAllProduct().then((data) => setProducts(data));
  }, [reset]);

  const handleClick = (id) => {
    getSubCategories(id).then(data => setSubCategories(data))
  };

  return (
    <>
      <div>
        <div className='relative'>
          <div className="banner absolute top-0 left-0 h-full w-full bg-blue-400"></div>
          <img src="/one.jpg" alt="" className='h-40 w-full object-cover' />
          <p className='absolute text-white top-6 left-4 md:left-20 lg:left-52 text-2xl md:text-4xl font-semibold'>Products</p>
          <p className='absolute text-white top-16 left-4 md:left-20 lg:left-52 text-sm md:text-base'>
            <Link href="/">Home</Link>/<span className='text-orange-500'>Products</span>
          </p>
        </div>
        <div className="w-full md:w-3/4 lg:w-[1200px] m-auto flex flex-col md:flex-row mt-14 justify-center items-center gap-3 px-4 flex-wrap">
          <button
            className="block py-1 px-3 md:px-5 text-gray-700 bg-white rounded-lg md:bg-transparent md:text-gray-700 dark:text-white md:dark:text-blue-500 hover:md:bg-ksb hover:md:text-white hover:duration-200 md:border-solid md:border-[1px] md:border-gray-700"
            onClick={() => setReset(true)}
          >
            ALL
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              className="block py-1 px-3 md:px-5 text-gray-700 bg-white rounded-lg md:bg-transparent md:text-gray-700 dark:text-white md:dark:text-blue-500 hover:md:bg-ksb hover:md:text-white hover:duration-200 md:border-solid md:border-[1px] md:border-gray-700"
              onClick={() => handleClick(category._id)}
            >
              {category.category_name}
            </button>
          ))}
        </div>
        {
          subcategories.length > 0 &&
          subcategories.map(subcategory => {
            return <>
              <h1 className="text-lg my-3 md:text-2xl font-semibold text-center">{subcategory.category_name}</h1>
              <ProductByCategory category={subcategory._id} />
            </>

          })
        }
        
      </div>
    </>
  );
};

export default Index;
