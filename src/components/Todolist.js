import { React, useEffect } from 'react';
import TodoBox from './TodoBox';
function Todolist({ todolist, setTodolist }) {
  return (
    <div>
      {todolist?.map((todo, index) => {
        return (
          <TodoBox
            setTodolist={setTodolist}
            todolist={todolist}
            key={index}
            todo={todo}
          />
        );
      })}
    </div>
  );
}

export default Todolist;
