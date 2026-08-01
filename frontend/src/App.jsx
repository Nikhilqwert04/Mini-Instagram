import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/authentication/signup'
import Signin from './components/authentication/signin'
import Admin from './components/authentication/admin'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </div>
  )
}

export default App
