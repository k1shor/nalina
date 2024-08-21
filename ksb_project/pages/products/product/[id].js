import React, { useEffect, useState } from 'react';
import { getProductById } from '../../api/productAPI';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';


// export async function getStaticPaths() {
  const URL = `https://nalina.indexithub.com`
//   const products = await getAllProduct()
//   console.log(products)
//   const paths = await products?.map(product=>{
//     return {params: {...product, image: `${FRONTEND_URL}/${product.image}` }}
//    })
//   return {
//      paths,
//      fallback: false
//   }
// }
// export async function getStaticProps({ params }) {
//   const product = await getProductById(params.id)
//      return {
//      props: {
//         product
//      }
//   }
// }


// const Products = ({product}) => {
const Products = () => {
  let params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState({});
  let { product_title, about, application, head, temperature, motor_rating, capacity, image } = product;
  const router = useRouter()
  useEffect(() => {

    getProductById(id)
      .then(data => setProduct(data))
      .catch(err => console.log(err));
  }, [id]);

  const onBtnClick = ()=>{
    router.back()
  }

  return (
    <div>
      <div className='relative'>
        <img src="/one.jpg" alt="" className='h-40 w-full object-cover' />
        <p className='absolute text-white top-6 left-4 md:left-20 lg:left-52 text-2xl md:text-4xl font-semibold'>{product_title}</p>
        <p className='absolute text-white top-16 left-4 md:left-20 lg:left-52 text-sm md:text-base'>
          Home/<span className='text-orange-500'>{product_title}</span>
        </p>
      </div>

      <div className='w-full md:w-3/4 lg:w-[60%] mx-auto mt-10 px-4'>
        <img src={`${URL}/${image}`} alt={product_title} className='h-48 w-full object-contain m-auto' />
        <hr />
        <h1 className='mt-3 mb-2 text-lg md:text-xl'>{product_title}</h1>
        <h4 className='text-base md:text-lg'><u>About:</u></h4>
        <p className='mb-4 text-sm md:text-base' dangerouslySetInnerHTML={{ __html: about }}></p>
        <h4 className='text-base md:text-lg'><u>Application:</u></h4>
        <p className='mb-4 text-sm md:text-base'>{application}</p>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Capacity
                </th>
                <td className="px-6 py-4">
                  {capacity}
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Head
                </th>
                <td className="px-6 py-4">
                  {head}
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Temperature
                </th>
                <td className="px-6 py-4">
                  {temperature}
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Motor Rating
                </th>
                <td className="px-6 py-4">
                  {motor_rating}
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
        </div>
        <div className='flex justify-between mt-4'>
          {/* <button type="button" className="text-gray-900 bg-white border border-black border-solid focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 font-bold">
            &lt; Light
          </button>
          <button type="button" className="text-gray-900 bg-white border border-black border-solid focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 font-bold">
            Night &gt;
          </button> */}
          <button type="button" className="text-gray-900 bg-white border border-black border-solid focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 font-bold " onClick={()=>onBtnClick()}>
            &lt; Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;
