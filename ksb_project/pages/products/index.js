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

  const handleClick = (id) => {
    if(id === "all"){
      setReset(true)
      setSubCategories("All")
      setBtnBg('all')
    }
    else{
      getSubCategories(id).then((data) => setSubCategories(data));
      setBtnBg(id)
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
          <button
// <li className={`py-2 px-4 rounded-l-full text-base ${bgcolor === 'all' || bgcolor === ''  ? 'bg-[#5ce1e6] text-white':'hover:bg-[#5ce1e6] hover:text-white'}`} onClick={()=>handleFilter('all')}>All</li>

            className={`block py-1 px-3 md:px-5 md:border-solid md:border-[1px] rounded-lg md:border-gray-700 ${btnbg ==='all' || btnbg === '' ? 'bg-ksb text-white': 'text-gray-700 bg-white md:bg-transparent md:text-gray-700 dark:text-white md:dark:text-blue-500 hover:md:bg-ksb hover:md:text-white hover:duration-200'}`}
            onClick={() => handleClick("all")}
          >
            ALL
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              className={`block py-1 px-3 md:px-5 md:border-solid md:border-[1px] rounded-lg md:border-gray-700 ${btnbg === category._id ? 'bg-ksb text-white': 'text-gray-700 bg-white md:bg-transparent md:text-gray-700 dark:text-white md:dark:text-blue-500 hover:md:bg-ksb hover:md:text-white hover:duration-200'}`}
              onClick={() => handleClick(category._id)}
            >
              {category.category_name}
            </button>
          ))}
        </div>
        {
          subcategories === "All" ?
          <>
          <div className="w-full md:w-3/4 lg:w-11/12 m-auto flex flex-col md:flex-row md:gap-11 gap-4 mb-12 mt-10 justify-center items-center md:flex-wrap px-4">
            {products.map((product) => {
                return <>
                  <div className="">
                    <h1 className="text-sm my-3 md:text-lg font-semibold text-center bg-ksb  w-full mx-auto py-2 px-3 md:px-5 text-white rounded-lg ">{product.category.category_name}</h1>
                    <Product key={product._id} product={product} FRONTEND_URL={props.FRONTEND_URL} />
                  </div>
                </>
              })}
              </div>
          </>
          :
          <>
          {subcategories.map((subcategory) => {
            return (
              <>
                <h1 className="text-sm my-3 md:text-lg font-semibold text-center bg-ksb sm:w-1/4 w-3/4 mx-auto py-2 px-3 md:px-5 text-white rounded-lg ">
                  {subcategory.category_name}
                </h1>
                <ProductByCategory category={subcategory._id} />
              </>
            );
          })}
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
