export const addMessage = (contact) => {
  return fetch('/api/contact', {
    method: "POST",
    headers: {
      accept: "Application/json",
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(contact)
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}


export const getAllMessages = () => {
  return fetch('/api/contact')
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const deleteMessage = (id) => {
  return fetch(`/api/contact?id=${id}`, {
    method: "DELETE",
    headers: {
      accept: "Application/json",
      "Content-Type": "Application/json",
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}


export const getMessageById = (id) => {
  return fetch(`/api/contact?id=${id}`)
    .then(res => res.json())
    .catch(err => console.log(err))
}

