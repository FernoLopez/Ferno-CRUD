import React from 'react'
import axios from 'axios'

const CardsOfUsers = ({user, getAllUser, URL, setObjectUpdate, setIsShowForm, reset}) => {

  const deleteUser = id => {
    const confirmation = confirm('Are you sure you want to delete the movie?');
    if(!confirmation){
      return
    }
    axios.delete(`${URL}${id}/`)
    .then(response => console.log(response.data))
      alert('The movie was removed successfully')
      getAllUser()
    .catch(error => console.log(error))
      alert('Could not delete the product correctly')
  }

  const updateUser = () => {
    setIsShowForm(true)
    
    const obj = {
      email: user.email,
      password: user.password,
      first_name: user.first_name,
      last_name: user.last_name,
      birthday: user.birthday
    }
    reset(obj)
    setObjectUpdate(user)
  }

  return (
    <article className='card'>
        <h2>{`#${user.id}`}</h2>
        <ul>
        <li><b>Email: </b>{user.email}</li>
        <li><b>Password: </b>{user.password}</li>
        <li><b>First Name: </b>{user.first_name}</li>
        <li><b>Last Name: </b>{user.last_name}</li>
        <li><b>Birthday: </b>{user.birthday}</li>
        </ul>
        <button className='size-button' onClick={()=>deleteUser(user.id)}>
        <i className="fa-solid fa-trash-can" /></button> 
         <button className='size-button' onClick={updateUser}>
          <i className="fa-solid fa-pen" /></button>
    </article>
  )
}

export default CardsOfUsers