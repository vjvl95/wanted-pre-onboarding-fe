import { React, useEffect, useState } from 'react';
import * as API from '../api/api';
function TodoBox({ todo, setTodolist }) {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateTodo, setUpdateTodo] = useState(todo.todo);
  async function DeleteHandler() {
    try {
      API.delete(`/todos/${todo.id}`);
      alert('삭제성공');
      const res = await API.get('/todos');
      setTodolist(res.data);
      setUpdateTodo('');
      setIsCompleted('');
    } catch (err) {
      alert('삭제실패');
    }
  }
  async function ClickHandler() {
    setIsCompleted(!todo.isCompleted);
    await API.put(`/todos/${todo.id}`, {
      todo: todo.todo,
      isCompleted: !todo.isCompleted,
    });

    const res = await API.get('/todos');
    setTodolist(res.data);
  }
  async function UpdateHandler() {
    await API.put(`/todos/${todo.id}`, {
      todo: updateTodo,
      isCompleted: todo.isCompleted,
    });
    const res = await API.get('/todos');
    setIsUpdate(false);
    setTodolist(res.data);
  }
  function RootDiv(e) {
    if (e.target.id === 'deleteButton') {
      DeleteHandler();
    } else if (e.target.id === 'checkbox') {
      ClickHandler();
    } else if (e.target.id === 'updateButton') {
      if (isUpdate === true) {
        UpdateHandler();
      } else {
        setIsUpdate(true);
        setUpdateTodo(todo.todo);
      }
    } else if (e.target.id === 'cancelButton') {
      setIsUpdate(false);
      setUpdateTodo(todo.todo);
    }
  }
  return (
    <div
      onClick={(e) => RootDiv(e)}
      className="mb-7 px-5 bg-red-100 rounded-md flex justify-between h-[50px] py-3"
    >
      <span className="mr-3  bg-green-300 rounded-lg text-xl px-5 ">
        {todo.id}
      </span>

      {isCompleted === true ? (
        <>
          <span className=" line-through">{todo.todo}</span>
          <input id="checkbox" type="checkbox" className="ml-7" checked></input>
        </>
      ) : (
        <>
          {isUpdate === true ? (
            <input
              className="border-4 w-[200px] border-yellow-300"
              value={updateTodo}
              onChange={(e) => setUpdateTodo(e.target.value)}
            ></input>
          ) : (
            <>
              <span>{todo.todo}</span>
              <input id="checkbox" type="checkbox" className="ml-7"></input>
            </>
          )}
        </>
      )}
      {isUpdate === false ? (
        <>
          {isCompleted === true ? null : (
            <button
              id="updateButton"
              className="ml-5 border-2 bg-pink-300 rounded-md border-red-300"
            >
              수정
            </button>
          )}

          <button
            id="deleteButton"
            className="ml-5 border-2 bg-red-500 rounded-md border-red-300"
          >
            삭제
          </button>
        </>
      ) : (
        <>
          <button
            id="cancelButton"
            className="ml-5 border-2 bg-pink-300 rounded-md border-red-300"
          >
            취소
          </button>
          <button
            id="updateButton"
            className="ml-5 border-2 bg-blue-500 rounded-md border-red-300"
          >
            수정
          </button>
        </>
      )}
    </div>
  );
}

export default TodoBox;
