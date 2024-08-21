import React, { useEffect, useState } from 'react'
import Product from '../Components/Product'
import { getProductByCategory } from '../api/productAPI'

export async function getStaticProps() {
    let FRONTEND_URL = process.env.FRONTEND_URL
    return { props: { FRONTEND_URL } }
}

const ProductByCategory = ({ FRONTEND_URL, category }) => {
    // console.log("subcategory selected:",category)
    let [products, setProducts] = useState([])
    useEffect(() => {
        getProductByCategory(category).then((data) => setProducts(data));
    }, [category]) // added dependency for the new category data to get loaded everytime the category is changed


    return (<>
        {products.length > 0 &&
            <div className="w-full md:w-3/4 lg:w-11/12 m-auto flex flex-col md:flex-row md:gap-11 mb-5 justify-center items-center md:flex-wrap px-4">
                {products.slice(0, 3).map((product) => (
                    <Product key={product._id} product={product} FRONTEND_URL={FRONTEND_URL} />
                ))}
            </div>
        }
    </>
    )
}

export default ProductByCategory