import React, { useContext, useEffect } from 'react';
import Link from 'next/link'
import { logout } from '../utils/auth'
import { store } from './store';

const Header = () => {
  const { state: storeState, dispatch } = useContext(store)

  useEffect(() => {
    const user = window.localStorage.getItem('user');
    if (user) {
    dispatch({ type: 'SET_PROFILE', user });
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    dispatch({ type: 'SET_PROFILE', user: null });
  };

  return (
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
  )
}

export default React.memo(Header);
