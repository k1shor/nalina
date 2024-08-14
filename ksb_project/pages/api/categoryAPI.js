

export const getAllCategories = () => {
  return fetch("/api/category")
    .then(res => res.json())
    .catch(err => console.log(err))

}

export const getSubCategories = (id) => {
  return fetch(`/api/category?parent_id=${id}`)
    .then(res => res.json())
    .catch(err => console.log(err))

}


export const addCategory = (category_name, parent_category) => {
  
  return fetch('/api/category', {
    method: "POST",
    headers: {
      accept: "Application/json",
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({ category_name, parent_category })
  })
    .then(response => response.json())
    .catch(error => console.log(error))
}



export const updateCategory = (id, category_name) => {
  return fetch(`/api/category?id=${id}`, {
    method: "PATCH",
    headers: {
      accept: "Application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category_name })
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}


export const getCategoryById = (id) => {
  return fetch(`/api/category?id=${id}`)
    .then(res => res.json())
    .catch(err => console.log(err))


}


export const deleteCategory = (id) => {
  return fetch(`/api/category?id=${id}`, {
    method: "DELETE",
    headers: {
      accept: "Application/json",
      "Content-Type": "application/json",
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}





