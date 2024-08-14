export const registerUser = (user) => {
  return fetch('/api/user', {
    method: "POST",
    headers: {
      accept: "Application/json",
      "Content-Type": "Application/json"
    },
    body: JSON.stringify(user)
  })

    .then(res => { return res.json() })
    .catch(err => console.log(err))

}

export const login = (user) => {
  return fetch('/api/user', {
    method: "POST",
    headers: {
      accept: "Application/json",
      "Content-Type": "Application/json"
    },
    body: JSON.stringify(user)
  })

    .then(res => { return res.json() })
    .catch(err => console.log(err))

}


export const getUser = () => {
  return fetch('/api/user')

    .then(res => res.json())
    .catch(err => console.log(err))

}

export const authenticate = (data) => {
  localStorage.setItem("jwt", JSON.stringify(data))
  // let authenticated = await JSON.parse(localStorage.getItem('jwt'))

}

export const isAuthenticated = async () => {
  // if(typeof windows !== "undefined"){
  return localStorage.getItem("jwt") ? await JSON.parse(localStorage.getItem('jwt')) : false
  // }
}

export const verifyUser = (id) => {
  return fetch(`/api/user?id=${id}`, {
    method: "PATCH",
    headers: {
      accept: "Application/json",
      "Content-Type": "application/json",
    },

  })
    .then(res => res.json())
    .catch(err => console.log(err))
}