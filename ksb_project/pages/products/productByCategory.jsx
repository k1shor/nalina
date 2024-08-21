import React, { useEffect, useState } from 'react'
import Product from '../Components/Product'
import { getProductByCategory } from '../api/productAPI'

export async function getStaticProps() {
    let FRONTEND_URL = process.env.FRONTEND_URL
    return { props: { FRONTEND_URL } }
}

const ProductByCategory = ({FRONTEND_URL,  category }) => {
    // console.log("subcategory selected:",category)
    let [products, setProducts] = useState([])
    useEffect(() => {
        getProductByCategory(category).then((data) => setProducts(data));
    }, [category]) // added dependency for the new category data to get loaded everytime the category is changed

    // // static data for product for checking
    // products = [
    //     {
    //         id:1,
    //         image:"./assets/uploads/1720425774355_KDI.png",
    //         product_title:"producttest1"
    //     },
    //     {
    //         id:2,
    //         image:"./assets/uploads/1720425774355_KDI.png",
    //         product_title:"producttest2"
    //     },
    //     {
    //         id:3,
    //         image:"./assets/uploads/1720425774355_KDI.png",
    //         product_title:"producttest3"
    //     },
    //     {
    //         id:4,
    //         image:"./assets/uploads/1720425774355_KDI.png",
    //         product_title:"producttest4"
    //     },
    //     {
    //         id:5,
    //         image:"./assets/uploads/1720425774355_KDI.png",
    //         product_title:"producttest5"
    //     },
    // ]

    return (<>
        {products.length > 0 &&
            // (
            //   <div className="w-full md:w-3/4 lg:w-[1200px] m-auto flex flex-col md:flex-row md:gap-4 mb-12 mt-10 justify-center items-center md:flex-wrap px-4">
            //     {productsBasedOnCategory.map((product) => (
            //       <Product key={product._id} product={product} FRONTEND_URL={props.FRONTEND_URL} />
            //     ))}
            //   </div>
            // ) : (
            <div className="w-full md:w-3/4 lg:w-11/12 m-auto flex flex-col md:flex-row md:gap-11 mb-12 justify-center items-center md:flex-wrap px-4">
                {products.slice(0, 4).map((product) => (
                    <Product key={product._id} product={product} FRONTEND_URL={FRONTEND_URL} />
                ))}
            </div>
        }
    </>
    )
}

export default ProductByCategory