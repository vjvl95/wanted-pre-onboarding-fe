import { React, useEffect } from 'react';
import TodoBox from './TodoBox';
function Todolist({ todolist, setTodolist }) {
  useEffect(() => {
    console.log(todolist);
  }, []);
  return (
    <div>
      {todolist.map((todo, index) => {
        return <TodoBox setTodolist={setTodolist} key={index} todo={todo} />;
      })}
    </div>
  );
}

export default Todolist;
