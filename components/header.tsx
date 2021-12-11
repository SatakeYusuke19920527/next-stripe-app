import { useEffect } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Header.module.css';
import { googleSignIn, googleSignOut } from '../lib/firebase';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '../hooks/useRTK';
import { auth } from '../lib/firebase';
import { login, logout, selectUser } from '../features/userSlice';
import Avatar from '@mui/material/Avatar';

const Header: NextPage = () => {
  const router = useRouter();
  const userInfo = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoURL: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);
  const movePage = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push(`/`);
  };
  const handleLogin = async () => {
    await googleSignIn();
  };
  const handleLogout = async () => {
    await googleSignOut();
  };

  console.log('🚀 ~ file: header.tsx ~ line 14 ~ userInfo', userInfo);

  return (
    <section className={styles.container}>
      <h1 className={styles.logo} onClick={movePage}>
        logo
      </h1>
      {userInfo.uid !== '' ? (
        <div className={styles.avatarArea} onClick={handleLogout}>
          <Avatar alt={userInfo.displayName} src={userInfo.photoUrl} />
        </div>
      ) : (
        <div className={styles.loginbtn} onClick={handleLogin}>
          Login
        </div>
      )}
    </section>
  );
};

export default Header;
