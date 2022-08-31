import { useEffect } from 'react';

function Header() {
  function ClickHander() {
    localStorage.removeItem('userToken');
    document.location.href = '/';
  }
  return (
    <>
      {localStorage.getItem('userToken') !== null ? (
        <div className="flex justify-end">
          <button
            onClick={ClickHander}
            className="mx-[50px] py-3 px-5  font-semibold text-1xl rounded-lg shadow-md text-white bg-blue-500 hover:bg-blue-700"
          >
            로그아웃
          </button>
        </div>
      ) : null}
    </>
  );
}

export default Header;
