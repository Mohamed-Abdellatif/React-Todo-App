import { Fragment, useState } from "react";
import { RiCloseCircleLine  } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import ToDoForm from "./ToDoForm";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { RxDragHandleHorizontal } from "react-icons/rx";

const ToDo = ({ todos, completeToDo, removeTodo, updateTodo, setTodos }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });
  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <ToDoForm edit={edit} onSubmit={submitUpdate} />;
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const updatedtodos = reorder(
      todos,
      result.source.index,
      result.destination.index
    );
    setTodos(updatedtodos);
  };
  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable-todos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todos &&
                todos.map((todo, index) => (
                  <Draggable
                    key={todo.id}
                    draggableId={String(todo.id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className={
                          todo.isComplete ? "todo-row complete" : "todo-row"
                        }
                        key={index}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        
                        style={{
                          ...provided.draggableProps.style,
                        }}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="todo-handle"
                        >
                          <RxDragHandleHorizontal size={"30px"}/>
                        </div>
                        <div
                          className="todo-text"
                          key={todo.id}
                          onClick={() => completeToDo(todo.id)}
                        >
                          {todo.text}
                        </div>
                        <div className="icons">
                          <RiCloseCircleLine
                            onClick={() => removeTodo(todo.id)}
                            className="delete-icon"
                          />
                          <TiEdit
                            onClick={() =>
                              setEdit({ id: todo.id, value: todo.text })
                            }
                            className="edit-icon"
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
    </>
  );
};

export default ToDo;
