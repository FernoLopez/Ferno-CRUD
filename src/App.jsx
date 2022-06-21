import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import CardOfUsers from './Components/CardsOfUsers'
import Form from './Components/Form'
import { useForm } from 'react-hook-form'

const URL = 'https://users-crud1.herokuapp.com/users/'

function App() {

  const {handleSubmit, register, reset} = useForm()

  const [users, setUsers] = useState()
  const [isShowForm, setIsShowForm] = useState(false)
  const [objectUpdate, setObjectUpdate] = useState()

  const getAllUser =()=> {
  axios.get(URL)
  .then(response => setUsers(response.data))
  .catch(error => console.log(error))
  }
  
  useEffect(() => {
    getAllUser()
  }, [])

   const createNewUser = newUser => {
    axios.post(URL, newUser)
    .then(response => {
      console.log(response.data)
      getAllUser()
    })
    .catch(error => console.log(error))
}
   
  const updateUserById = (id, userUpdate) => {

    axios.patch(`${URL}${id}/`, userUpdate)
    .then((response)=>{
      console.log(response.data)
      getAllUser()
      setObjectUpdate()
      setIsShowForm(false)
    })
    .catch((error) => {
      console.log(error)
    })
    
  }

  const showForm = () => {
  const obj = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    birthday: ''
  }
  reset(obj)
  setIsShowForm(!isShowForm)
 }

  return (
    <div className="App">
     <button className='button' onClick={showForm}>{ isShowForm ? 
        'Hide Form': 'Create new user'}</button>
      {
        isShowForm && 
        <Form 
        createNewUser={createNewUser}
        updateUserById={updateUserById}
        objectUpdate={objectUpdate}
        handleSubmit={handleSubmit}
        register={register}
        reset={reset}
        />
      }
      <div>
    {
      users?.map(user => (
        <CardOfUsers
        key={user.id}
        user={user}
        URL={URL}
        getAllUser={getAllUser}
        setObjectUpdate={setObjectUpdate}
        setIsShowForm={setIsShowForm}
        reset={reset}
        />
      ))
    }
    </div>
    </div>
  )
}

export default App
