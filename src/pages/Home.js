import { React, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import { loginModalState, registerModalState } from '../core/atoms/modalState';

function Home() {
  const [showLoginModal, setShowLoginModal] = useRecoilState(loginModalState);
  const [showRegisterModal, setShowRegisterModal] =
    useRecoilState(registerModalState);
  function onClickLogin() {
    setShowLoginModal(true);
  }
  function onClickRegister() {
    setShowRegisterModal(true);
  }
  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      document.location.href = '/todo';
    }
  });
  return (
    <>
      <div className="mt-[450px] flex justify-center">
        <button
          onClick={onClickLogin}
          className="mx-[50px] py-5 px-5  font-semibold text-3xl rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
        >
          로그인
        </button>
        <button
          onClick={onClickRegister}
          className="mx-5 py-5 px-5 text-3xl  font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
        >
          회원가입
        </button>
        {showLoginModal && <LoginModal />}
        {showRegisterModal && <RegisterModal />}
      </div>
    </>
  );
}

export default Home;
