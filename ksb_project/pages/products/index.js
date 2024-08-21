import React, { useEffect, useState } from "react";
import { getAllCategories, getSubCategories } from "../api/categoryAPI.js";
import { getAllProduct, getProductByCategory } from "../api/productAPI.js";
import Link from "next/link";
import ProductByCategory from "./productByCategory";
import Product from "../Components/Product.jsx";

export async function getStaticProps() {
  let FRONTEND_URL = process.env.FRONTEND_URL;
  return { props: { FRONTEND_URL } };
}

const Index = (props) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  // const [productsBasedOnCategory, setProductsBasedOnCategory] = useState([]);
  let [reset, setReset] = useState(false);
  let [btnbg, setBtnBg] = useState('')
  let [title, setTitle] = useState('')


  useEffect(() => {
    setReset(false);
    setSubCategories("All")
    if (categories.length == 0) {
      getAllCategories().then((data) => setCategories(data));
    }
    getAllProduct().then((data) => setProducts(data));
  }, [reset]);

  // const handleClick = (id) => {
  //   getSubCategories(id).then((data) => setSubCategories(data));
  // };
  // const handleAllBtn = () => {
  //   setReset(true);
  //   setSubCategories("All");
  // };

  const handleClick = (e) => {
    if (e.target.id === "all") {
      setReset(true)
      setSubCategories("All")
      setBtnBg('all')
      setTitle('')
    }
    else {
      getSubCategories(e.target.id).then((data) => setSubCategories(data));
      setBtnBg(e.target.id)
      setTitle(e.target.name)
    }
  };

  // console.log("all category", categories);
  // console.log("all products", products);


  return (
    <>
      <div>
        <div className="relative">
          <div className="banner absolute top-0 left-0 h-full w-full bg-blue-400"></div>
          <img src="/one.jpg" alt="" className="h-40 w-full object-cover" />
          <p className="absolute text-white top-6 left-4 md:left-20 lg:left-52 text-2xl md:text-4xl font-semibold">
            Products
          </p>
          <p className="absolute text-white top-16 left-4 md:left-20 lg:left-52 text-sm md:text-base">
            <Link href="/">Home</Link>/
            <span className="text-orange-500">Products</span>
          </p>
        </div>
        <div className="w-full md:w-3/4 lg:w-[1200px] m-auto flex flex-col md:flex-row mt-14 justify-center items-center gap-3 px-4 flex-wrap">
          <button key={'all'} id='all'
            className={`block py-1 px-3 md:px-5 md:border-solid md:border-[1px] rounded-lg md:border-gray-700 ${btnbg === 'all' || btnbg === '' ? 'bg-ksb text-white' : 'text-gray-700 bg-white md:bg-transparent md:text-gray-700 dark:text-white md:dark:text-blue-500 hover:md:bg-ksb hover:md:text-white hover:duration-200'}`}
            onClick={handleClick}
          >
            ALL
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              id={category._id}
              name = {category.category_name}
              className={`block py-1 px-3 md:px-5 md:border-solid md:border-[1px] rounded-lg md:border-gray-700 ${btnbg === category._id ? 'bg-ksb text-white' : 'text-gray-700 bg-white md:bg-transparent md:text-gray-700 dark:text-white md:dark:text-blue-500 hover:md:bg-ksb hover:md:text-white hover:duration-200'}`}
              onClick={handleClick}
            >
              {category.category_name}
            </button>
          ))}
        </div>
        {
          subcategories === "All" ?
            <>
              <div className="w-full md:w-3/4 lg:w-11/12 m-auto flex flex-col md:flex-row md:gap-11 gap-4 mb-12 mt-10 justify-center items-center md:flex-wrap px-4">
              <h1 className="text-lg mt-3 md:text-2xl font-bold text-center bg-ksb px-4 py-2  w-full mx-auto rounded-lg underline text-white">Recently Added</h1>
                {products.map((product) => {
                  return <>
                    <Product key={product._id} product={product} FRONTEND_URL={props.FRONTEND_URL} />
                  </>
                })}
              </div>
            </>
            :
            <>
              <div className="w-full md:w-3/4 lg:w-11/12 m-auto flex flex-col md:flex-row md:gap-11 gap-4 mb-12 mt-10 justify-center items-center md:flex-wrap px-4">
            
            <h1 className="text-lg mt-3 md:text-2xl font-bold text-center bg-ksb px-4 py-2  w-full mx-auto rounded-lg underline text-white">{title}</h1>
              <div className="w-full md:w-3/4 lg:w-11/12 m-auto flex flex-col md:gap-11 gap-4 mb-12 justify-center items-center md:flex-wrap px-4">
                {subcategories.map((subcategory) => {
                  return (
                    <>
                      <h1 className="text-lg md:text-xl font-bold text-center text-ksb  w-full mx-auto rounded-lg underline ">
                        {subcategory.category_name}
                      </h1>
                      <ProductByCategory category={subcategory._id} />
                      <Link href={`/products/${subcategory._id}`} className="mb-3 underline text-ksb font-bold" title={subcategory.category_name}>See More...</Link>
                      <hr className="w-full border-ksb mx-auto "/>

                    </>
                  );
                })}
              </div>
              </div>
            </>
        }

        {/* {subcategories === "All" && subcategories.length > 0 && (
          <div className="w-full md:w-3/4 lg:w-11/12 m-auto flex flex-col md:flex-row md:gap-11 gap-4 mb-12 mt-10 justify-center items-center md:flex-wrap px-4">
            {products.map((product) => {
                return <>
                  <div className="">
                    <h1 className="text-sm my-3 md:text-lg font-semibold text-center bg-ksb  w-full mx-auto py-2 px-3 md:px-5 text-white rounded-lg ">{product.category.category_name}</h1>
                    <Product key={product._id} product={product} FRONTEND_URL={props.FRONTEND_URL} />
                  </div>
                </>
              })} */}
        {/* {categories.map((category) => {
                  return (
                    <>
                      <div className="">
                        <h1 className="text-sm my-3 md:text-lg font-semibold text-center bg-ksb  w-full mx-auto py-2 px-3 md:px-5 text-white rounded-lg ">
                          {category.category_name}
                        </h1>
                        <ProductByCategory category={category._id} />
                      </div>
                    </>
                  );
                  })
                } */}
        {/* </div>
        )} */}
        {/* {subcategories != "All" &&
          subcategories.length > 0 &&
          subcategories.map((subcategory) => {
            return (
              <>
                <h1 className="text-sm my-3 md:text-lg font-semibold text-center bg-ksb sm:w-1/4 w-3/4 mx-auto py-2 px-3 md:px-5 text-white rounded-lg ">
                  {subcategory.category_name}
                </h1>
                <ProductByCategory category={subcategory._id} />
              </>
            );
          })} */}
      </div>
    </>
  );
};

export default Index;
