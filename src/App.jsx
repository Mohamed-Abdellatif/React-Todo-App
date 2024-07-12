import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToDoList from './Components/ToDoList'


function App() {
  

  return (
    <div className='todo-app'>
      <ToDoList/>
    </div>
  )
}

export default App
