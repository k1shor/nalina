import Link from "next/link";
import React from "react";

const Product = ({ product }) => {
    // const URL = process.env.FRONTEND_URL
  return (
    // <div >
    //     <div className='h-48 w-96 md:border-solid md:border-[1px] md:border-y-gray-700 rounded-md md:shadow-2xl relative p-5'>
    //         <img src={`http://localhost:3000/${product.image}`} alt="" className='h-full mx-auto' />
    //         <Link href={`/products/${product._id}`}>
    //             <div className='h-[40px] w-[300px] text-white bg-blue-900 flex md:justify-center md:items-center font-bold absolute -bottom-5 left-12' >

    //                 {product?.product_title}

    //             </div>
    //         </Link>
    //     </div>
    // </div>
    <div className="h-48 w-72 md:border-solid md:border-[1px] md:border-y-gray-700 rounded-md md:shadow-2xl p-5">
      <img
        src={`http://localhost:3000/${product.image}`}
        // src={`${URL}/${product.image}`}
        alt=""
        className="h-full mx-auto"
      />
      <Link
        href={`/products/product/${product._id}`}
        className="w-full h-[40px] text-white bg-blue-900 flex justify-center items-center font-bold rounded-lg"
      >
        {product?.product_title}
      </Link>
    </div>
  );
};

export default Product;
