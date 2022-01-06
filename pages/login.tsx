import { useEffect } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import liff from '@line/liff';

const Login: NextPage = () => {
  /**
   * LIFFの初期化を行う
   * 初期化完了. 以降はLIFF SDKの各種機能を利用できる
   *  =>初期化前でも使用できる機能もある（liff.isInClient()など）
   */
  const initLiff = () => {
    liff
      .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
      .then(() => {
        console.log('hello world========');
        //ログインしていなければログインさせる
        if (liff.isLoggedIn() === false) liff.login({});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * LINEで保持しているユーザー情報取得
   */
  const getUserInfo = () => {
    liff
      .getProfile()
      .then((profile) => {
        alert(JSON.stringify(profile));
      })
      .catch((error) => {});
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Hello world</h1>
        {/* LIFF内以外からアクセス */}
        {liff.isInClient() === false ? (
          <p>
            ブラウザからはお使いいただけません。LINE内アプリ（LIFF）からご利用ください。
          </p>
        ) : (
          <p>こんにちは</p>
        )}
        <button onClick={initLiff}>login</button>
        <button onClick={getUserInfo}>button</button>
      </main>
    </div>
  );
};

export default Login;
