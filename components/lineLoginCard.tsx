import React, { useState, useEffect } from 'react';
import styles from '../styles/Card.module.css';
import type Liff from '@line/liff';
import { useAppSelector, useAppDispatch } from '../hooks/useRTK';
import { lineLogin } from '../features/userSlice';

const lineLoginCard = ({ name }: { name: string }) => {
  const dispatch = useAppDispatch();
  const [liff, setLiff] = useState<typeof Liff>();
  const initLiff = async () => {
    let unmounted = false;
    const liff = (await import('@line/liff')).default;
    console.log('import liff');
    await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });
    if (!unmounted) {
      setLiff(liff);
    }
    liff
      .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
      .then(async () => {
        //ログインしていなければログインさせる
        if (liff.isLoggedIn() === false) liff.login({});
        const user = await liff.getProfile();
        dispatch(
          lineLogin({
            uid: user.userId,
            displayName: user.displayName,
            photoUrl: user.pictureUrl,
          })
        );
        console.log(user);
      })
      .catch((error) => {
        console.log(error, '===');
      });
  };
  /**
   * LINEで保持しているユーザー情報取得
   */
  // const getUserInfo = () => {
  //   liff
  //     .getProfile()
  //     .then((profile) => {
  //       alert(JSON.stringify(profile));
  //     })
  //     .catch((error) => {});
  // };
  const linelogin = () => {};
  return (
    <section className={styles.card}>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1>{name}</h1>
          <br />
          <button onClick={initLiff}>line login</button>
        </main>
      </div>
    </section>
  );
};

export default lineLoginCard;
