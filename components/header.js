import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { store } from './store';
import { withAuthSync, fetcher, logout } from '../utils/auth';
import Loader from 'react-loader-spinner';

const Header = () => {
  const { state: storeState, dispatch } = useContext(store);
  const [mounted, setMounted] = useState(false);
  const { data: userSv } = useSWR(mounted ? '/api/profile': '', fetcher);

  useEffect(() => {
    const user = window.localStorage.getItem('user');
    setMounted(true);
    if (userSv) {
      dispatch({ type: 'SET_PROFILE', user: user });
    }
  }, [userSv]);

  const handleLogout = async () => {
    await logout();
    dispatch({ type: 'SET_PROFILE', user: null });
  };

  return (
    <>
      {
        storeState.loading &&
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          className="loading-loader"
        /> 
      }
      
      <header>
      <nav>
        <ul>
          {
            storeState.user &&
            <li>
              {`Chào ${storeState.user}`}
            </li>
          }
          <li>
            <Link href="/">
              <a>Trang chủ</a>
            </Link>
          </li>
          {
            !storeState.user &&
            <li>
              <Link href="/login">
                <a>Đăng nhập</a>
              </Link>
            </li>
          }
          {
            storeState.user &&
            <>
              <li>
                <Link href="/signup">
                  <a>Tạo tài khoản</a>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Đăng xuất</button>
              </li>
            </>
          }
        </ul>
      </nav>    
      <style jsx>{`
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }

        li {
          margin-right: 1rem;
        }

        li:first-child {
          margin-left: auto;
        }

        a {
          color: #fff;
          text-decoration: none;
        }

        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
      `}</style>
    </header>
    </>
  )
};

export default React.memo(withAuthSync(Header));
