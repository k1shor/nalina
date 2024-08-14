
export const getAllProduct = () => {
    return fetch("/api/product")
        .then(res => res.json())
        .catch(err => console.log(err))

}


export const getProductByCategory = (id) => {
    // console.log(id, "id from product API")
    return fetch(`/api/product?category=${id}`)
        .then(res => res.json())
        .catch(err => console.log(err))
}


export const getProductById = (id) => {
    return fetch(`/api/product?product=${id}`)
        .then(res => res.json())
        .catch(err => console.log(err))
}


// export const addProduct = (product) => {
//     return fetch(`/api/product`, {
//         method: "POST",
//         body: product
//     })
//         .then(res => res.json())
//         .catch(err => console.log(err))
// }


export const addProduct = (product) => {
    return fetch(`/api/product`, {
        method: "POST",
        // headers: {
        //     "Content-Type": "application/json"
        // },
        // body: JSON.stringify(product)
        body: product
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}


export const updateProduct = (id, product) => {
    console.log(product)
    return fetch(`/api/product?product=${id}`, {
        method: "PATCH",
        // headers: {
        //     accept: "Application/json",
        //     "Content-Type": "application/json",
        // },
        body: product
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}



export const deleteProduct = (id) => {
    return fetch(`/api/product?id=${id}`, {
        method: "DELETE",
        headers: {
            // accept: "Application/json",
            "Content-Type": "application/json",
        },
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}