import { useState } from "react";
import ToDoForm from "./ToDoForm";
import ToDo from "./Todo";


const ToDoList = () => {
    const [todos,setTodos]=useState([])

    const addToDo=(todo)=>{
        if(!todo.text|| /^\s*$/.test(todo.text)){
            return
        }
        const newTodos=[todo,...todos]
        setTodos(newTodos)
        
    }

    const removeTodo= id =>{
        const removeArr=todos.filter(todo=>todo.id!==id)
        setTodos(removeArr)
    }
    const updateTodo= (todoId,newValue)=>{
        if(!newValue.text|| /^\s*$/.test(newValue.text)){
            return
        }
        setTodos(prev=>prev.map(item=>(item.id===todoId? newValue:item)))
        
    }

    const completeToDo=(id)=>{
        const updatedTodos=todos.map(todo=>{
            if (todo.id===id){
                todo.isComplete=!todo.isComplete
            }
            return todo
        })
        setTodos(updatedTodos)
    }

    return (
        <div>
            <h1>What's the plan for Today</h1>
            <ToDoForm onSubmit={addToDo}/>
            <ToDo todos={todos} completeToDo={completeToDo} removeTodo={removeTodo} updateTodo={updateTodo} setTodos={setTodos}/>
        </div>
    );
};

export default ToDoList;