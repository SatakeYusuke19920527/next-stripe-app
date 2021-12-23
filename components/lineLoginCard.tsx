import React, { useState, useEffect } from 'react';
import styles from '../styles/Card.module.css';
import { lineLogin } from '../features/userSlice';
import { Liff } from '@line/liff';

const LineLoginCard = ({ name, dispatch }: { name: string; dispatch: any }) => {
  const [stliff, setStLiff] = useState<Liff>();
  useEffect(() => {
    const unSub = async () => {
      const liff = (await import('@line/liff')).default;
      setStLiff(liff);
    };
    unSub();
  }, []);
  const initLiff = async () => {
    console.log('import liff');
    if (stliff) {
      await stliff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });
      stliff
        .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
        .then(async () => {
          //ログインしていなければログインさせる
          if (stliff.isLoggedIn() === false) stliff.login({});
          const user = await stliff.getProfile();
          console.log(
            '🚀 ~ file: lineLoginCard.tsx ~ line 16 ~ .then ~ user',
            user
          );

          dispatch(
            lineLogin({
              lineuid: user.userId,
              displayName: user.displayName,
              photoUrl: user.pictureUrl,
            })
          );
          console.log(user);
        })
        .catch((error) => {
          console.log(error, '===');
        });
    }
  };
  /**
   * LINEで保持しているユーザー情報取得
   */
  const getUserInfo = async () => {
    /* 追加: UserProfileをAlertで表示 */
    if (stliff) {
      stliff.init({ liffId: process.env.REACT_APP_LIFF_ID as string });
      stliff.ready.then(() => {
        console.log(
          '🚀 ~ file: lineLoginCard.tsx ~ line 43 ~ getUserInfo ~ stliff',
          stliff?.isInClient()
        );
        if (!stliff.isLoggedIn()) {
          stliff.login({}); // ログインしていなければ最初にログインする
        } else if (stliff.isInClient()) {
          stliff
            .getProfile() // ユーザ情報を取得する
            .then((profile) => {
              const userId: string = profile.userId;
              const displayName: string = profile.displayName;
              alert(`Name: ${displayName}, userId: ${userId}`);
            })
            .catch(function (error) {
              window.alert('Error sending message: ' + error);
            });
        }
      });
    }
  };
  return (
    <section className={styles.card}>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1>{name}</h1>
          <br />
          <button onClick={initLiff}>line login</button>
          <button onClick={getUserInfo}>get user info</button>
        </main>
      </div>
    </section>
  );
};

export default LineLoginCard;
