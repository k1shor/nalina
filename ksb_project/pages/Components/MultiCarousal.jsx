import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const MultiCarousal = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    let [clients, setClients] = useState([])
    useEffect(() => {
        fetch(`/api/client`, {
            method: "GET"
        }).then(res => res.json())
            .then(data => setClients(data))
    }, [])
    return (
        <div>
            <Carousel
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                responsive={responsive}
                swipeable={true}
            >
                {/* <div className="flex "> */}

                {
                    clients.map(item => {
                        return (
                            <div className="h-[150px]">
                                <img src={item.image} alt={item.name} className="h-full  " />
                            </div>
                        )
                    })
                }




            </Carousel>
        </div>
    );
};

export default MultiCarousal;