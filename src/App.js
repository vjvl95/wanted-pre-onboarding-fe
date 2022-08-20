import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Todo from './pages/Todo';
import { RecoilRoot } from 'recoil';
import React from 'react';
import Header from './components/Header';

function App() {
  return (
    <>
      <RecoilRoot>
        <Header />

        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/todo" element={<Todo />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
