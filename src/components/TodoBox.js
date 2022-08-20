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
    } catch (err) {
      alert('삭제실패');
    }
  }
  async function ClickHandler() {
    setIsCompleted(!todo.isCompleted);
    await API.put(`/todos/${todo.id}`, {
      todo: todo.todo,
      isCompleted: !todo.isCompleted
    });

    const res = await API.get('/todos');
    setTodolist(res.data);
  }
  async function UpdateHandler() {
    await API.put(`/todos/${todo.id}`, {
      todo: updateTodo,
      isCompleted: todo.isCompleted
    });
    const res = await API.get('/todos');
    console.log(res);
    setIsUpdate(false);
    setTodolist(res.data);
  }
  return (
    <div className="mb-7">
      <span className="mx-3  bg-green-300 rounded-lg text-xl px-5 py-1">
        {todo.id}
      </span>

      {isCompleted === true ? (
        <>
          <span className=" line-through">{todo.todo}</span>
          <input
            type="checkbox"
            className="ml-7"
            onChange={ClickHandler}
            checked
          ></input>
        </>
      ) : (
        <>
          {isUpdate === true ? (
            <input
              className="border-4 w-[200px] border-yellow-300"
              value={updateTodo}
              onChange={e => setUpdateTodo(e.target.value)}
            ></input>
          ) : (
            <>
              <span>{todo.todo}</span>
              <input
                type="checkbox"
                className="ml-7"
                onClick={ClickHandler}
              ></input>
            </>
          )}
        </>
      )}
      {isUpdate === false ? (
        <>
          <button
            onClick={() => setIsUpdate(true)}
            className="ml-5 border-2 bg-pink-300 rounded-md border-red-300"
          >
            수정
          </button>

          <button
            onClick={DeleteHandler}
            className="ml-5 border-2 bg-red-500 rounded-md border-red-300"
          >
            삭제
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setIsUpdate(false);
              setUpdateTodo(todo.todo);
            }}
            className="ml-5 border-2 bg-pink-300 rounded-md border-red-300"
          >
            취소
          </button>
          <button
            onClick={UpdateHandler}
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
