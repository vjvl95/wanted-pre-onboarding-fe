import { React, useEffect, useState } from 'react';
import TodoList from '../components/Todolist';
import * as API from '../api/api';

function Todo() {
  const [todo, setTodo] = useState('');
  const [todolist, setTodolist] = useState([]);
  useEffect(() => {
    if (sessionStorage.getItem('userToken') === null) {
      document.location.href = '/';
    }

    async function getTodolist() {
      const res = await API.get('/todos');
      setTodolist(res.data);
    }

    getTodolist();
  }, []);
  async function ClickHandler() {
    try {
      await API.post('/todos', { todo });
      const res = await API.get('/todos');
      setTodolist(res.data);
      setTodo('');
    } catch (err) {
      alert('추가 실패');
    }
  }
  return (
    <>
      <div className="flex justify-center">
        <div>
          <input
            placeholder="할일을 추가하세요"
            className="mt-[30px] border-4 w-[300px]"
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            value={todo}
            maxlength="50"
          ></input>
          <p className="text-gray-300">최대글자 50자</p>
        </div>
        <button
          onClick={ClickHandler}
          className="ml-[20px] mt-[30px] w-10 h-[32px] font-extrabold rounded-md bg-blue-300"
        >
          추가
        </button>
      </div>
      <div className="flex justify-center mt-[50px]">
        <TodoList todolist={todolist} setTodolist={setTodolist} />
      </div>
    </>
  );
}

export default Todo;
