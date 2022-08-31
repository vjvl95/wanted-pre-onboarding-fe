import { React, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import * as API from '../api/api';
import Modal from './Modal';
import { registerModalState } from '../core/atoms/modalState';

const RegisterModal = () => {
  const [showModal, setShowModal] = useRecoilState(registerModalState);
  const modalTitle = 'Register';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonAct, setButtonAct] = useState(false);

  useEffect(() => {
    if (isEmailValid && isPasswordValid) {
      setButtonAct(true);
    } else {
      setButtonAct(false);
    }
  }, [email, password]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', {
        email,
        password,
      });

      console.log('회원가입 성공!');
      setShowModal(false);
    } catch (err) {
      console.log('회원가입에 실패', err);
    }
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 8;

  return (
    <div>
      {showModal && (
        <Modal title={modalTitle}>
          <div>
            <form className="space-y-6 w-[500px]" onSubmit={submitHandler}>
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  이메일
                </label>
                <input
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isEmailValid && (
                  <p className="text-red-500 text-xs italic px-2.5">
                    이메일이 유효하지 않습니다.
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  비밀번호
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isPasswordValid && (
                  <p className="text-red-500 text-xs px-2.5 italic">
                    비밀번호가 유효하지 않습니다.
                  </p>
                )}
              </div>
              {buttonAct === true ? (
                <button
                  type="button"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={submitHandler}
                >
                  회원가입
                </button>
              ) : (
                <div className="flex justify-center text-red-300">
                  이메일 및 비밀번호 조건이 충족되면 버튼이 생깁니다.
                </div>
              )}
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RegisterModal;
const validateEmail = (email) => {
  if (email !== '') {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
  return false;
};
