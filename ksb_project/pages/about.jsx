import React from 'react';
import Link from 'next/link';

const AboutUs = () => {
    return (
        <div>
            <div className='relative'>
                <div className="banner absolute top-0 left-0 h-full w-full bg-blue-400"></div>
                <img src="/one.jpg" alt="" className='h-40 w-full object-cover' />
                <p className='absolute text-white top-6 left-4 md:left-20 lg:left-52 text-2xl md:text-4xl font-semibold heading-bg'>About Us</p>
                <p className='absolute text-white top-16 left-4 md:left-20 lg:left-52 text-sm md:text-base'>
                    <Link href="/">Home</Link>/<span className='text-orange-500'>About Us</span>
                </p>
            </div>
            <div className='flex flex-col w-full md:w-1/2  m-auto my-8 md:my-16 px-4 justify-center items-center'>
                <img src="/logo.jpg" alt="" className='h-auto w-1/2 max-w-[700px] mb-8 md:mb-14' />
                <p className='text-sm md:text-base lg:text-lg leading-relaxed text-justify'>
                    Nalina Machinery Suppliers, located in Pokhara, Nepal, specializes in the sales of high-quality industrial machinery and equipment. Their extensive product range includes construction machinery, agricultural tools, and manufacturing equipment. Known for their reliable and durable products, Nalina Machinery Suppliers caters to a diverse clientele, ensuring they provide the best solutions to meet the needs of various industries. Their commitment to quality and customer satisfaction makes them a trusted name in the machinery sales market in Nepal.
                </p>
            </div>
        </div>
    );
}

export default AboutUs;
