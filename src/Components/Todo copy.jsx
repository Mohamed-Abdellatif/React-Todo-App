import { Fragment, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import ToDoForm from "./ToDoForm";

const ToDo = ({todos,completeToDo,removeTodo,updateTodo}) => {
    const [edit,setEdit]=useState({
        id:null,
        value:""
    });
    const submitUpdate=(value)=>{
        updateTodo(edit.id,value)
        setEdit({
            id:null,
            value:""
        })
    }

    if (edit.id){
        return <ToDoForm edit={edit} onSubmit={submitUpdate}/>
    }
    return (
        <>
        {todos && todos.map((todo,index)=> (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div className={todo.isComplete?"todo-row complete":"todo-row"}key={index}  ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      
                      ...provided.draggableProps.style,
                    }}>
                        <div className="" key={todo.id} onClick={()=>completeToDo(todo.id)}>
                            {todo.text}
                        </div>
                        <div className="icons">
                            <RiCloseCircleLine onClick={()=>removeTodo(todo.id)} className="delete-icon"/>
                            <TiEdit onClick={()=>setEdit({id:todo.id,value:todo.text})} className="edit-icon"/>
                        </div>
                    </div>
                  )}
                </Draggable>
              ))}
        {todos && todos.map((todo,index)=>(
                <div className={todo.isComplete?"todo-row complete":"todo-row"}key={index}>
                    <div className="" key={todo.id} onClick={()=>completeToDo(todo.id)}>
                        {todo.text}
                    </div>
                    <div className="icons">
                        <RiCloseCircleLine onClick={()=>removeTodo(todo.id)} className="delete-icon"/>
                        <TiEdit onClick={()=>setEdit({id:todo.id,value:todo.text})} className="edit-icon"/>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ToDo;