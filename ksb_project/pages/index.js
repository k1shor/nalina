import { useEffect, useState } from "react";
import { getAllCategories } from "./api/categoryAPI";
import { getAllProduct, getProductByCategory } from "./api/productAPI";
import Product from "./Components/Product";
import Link from "next/link";
import MultiCarousal from "./Components/MultiCarousal";
import Sliders from "./Components/Carousel";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsBasedOnCategory, setProductsBasedOnCategory] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
    getAllProduct().then((data) => setProducts(data));
  }, []);

  const handleClick = (id) => {
    getProductByCategory(id).then((data) => setProductsBasedOnCategory(data));
  };

  return (
    <div>
      <Sliders />
      <div className="w-full md:w-3/4 m-auto mt-20 text-center relative mb-5 px-4">
        <h1 className="text-2xl md:text-4xl font-semibold">OUR PRODUCTS</h1>
        <hr className="w-24 md:w-30 h-1 mx-auto my-4 bg-ksb border-0 rounded md:my-2 dark:bg-gray-700" />
        <p className="text-lg md:text-xl text-gray-500">
          A comprehensive range of pumps and valves
        </p>
        <div className="flex flex-col md:flex-row mt-14 justify-center items-center gap-3 flex-wrap">
          {categories.map((category) => (
            <button
              key={category._id}
              className="block py-1 px-3 md:px-5 bg-white rounded-lg md:bg-transparent text-gray-700 md:py-1 dark:text-blue-500 hover:bg-ksb hover:text-white hover:duration-200 border-solid border-[1px] border-gray-700"
              onClick={() => handleClick(category._id)}
            >
              {category.category_name}
            </button>
          ))}
        </div>
        {productsBasedOnCategory.length > 0 ? (
          <div className="flex flex-col md:flex-row md:gap-4 mb-12 mt-10 justify-center items-center md:flex-wrap">
            {productsBasedOnCategory.slice(0, 2).map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:gap-4 mb-12 mt-10 justify-center items-center md:flex-wrap">
            {products.slice(0, 2).map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-20">
          <h1 className="text-2xl md:text-4xl font-semibold">ABOUT Nalina Group Nepal</h1>
          <hr className="w-24 md:w-30 h-1 mx-auto my-4 bg-ksb border-0 rounded md:my-2 dark:bg-gray-700" />
          <p className="text-lg md:text-xl text-gray-500">
            Authorized Dealer of Kirloskar Brother's Limited
          </p>
        </div>

        <div className="flex flex-col md:flex-row mt-10 gap-4 px-4 items-stretch">
          <div className="w-full md:w-1/2 bg-blue-500 text-white text-left p-8">
            <p className="text-justify">
              <span className="text-2xl font-bold">Nalina Machinery Suppliers</span>, located in Pokhara, Nepal, specializes in the sales of high-quality industrial machinery and equipment. Their extensive product range includes construction machinery, agricultural tools, and manufacturing equipment. Known for their reliable and durable products, Nalina Machinery Suppliers caters to a diverse clientele, ensuring they provide the best solutions to meet the needs of various industries. Their commitment to quality and customer satisfaction makes them a trusted name in the machinery sales market in Nepal.
            </p>
            <button className="rounded-md bg-orange-500 p-2 px-3 mt-3">
              <Link href="/about">Read More</Link>
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <iframe src="https://www.youtube.com/embed/aYsrcz937lk?si=nmOtEfOsHO4Xbnjq&amp;controls=0&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen className="w-full h-96 md:h-full"></iframe>
          </div>
        </div>

        <div className="flex flex-col mt-20 mb-10 text-center">
          <h1 className="text-2xl md:text-4xl font-semibold">OUR CLIENTS</h1>
          <hr className="w-24 md:w-30 h-1 mx-auto my-4 bg-ksb border-0 rounded md:my-2 dark:bg-gray-700" />
          <p className="text-lg md:text-xl text-gray-500">
            We are associated with
          </p>
        </div>

        <MultiCarousal />
      </div>
      <div className="h-36 w-full bg-ksb flex flex-col md:flex-row justify-center items-center gap-10 md:gap-32 p-4">
        <p className="text-white text-xl md:text-4xl">
          Want to be a part of our family?
        </p>
        <Link href="/contact">
          <button className="text-lg md:text-3xl block py-1 px-5 text-gray-100 bg-white rounded-lg bg-transparent dark:text-white md:dark:text-blue-500 hover:bg-white hover:text-ksb hover:duration-200 border-solid border-[1px] border-white">
            Contact us now
          </button>
        </Link>
      </div>
    </div>
  );
}
