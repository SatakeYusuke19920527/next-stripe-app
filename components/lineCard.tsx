import { useState } from 'react';
import styles from '../styles/Card.module.css';

const lineCard = ({ name }: { name: string }) => {
  // const [text, setText] = useState<string>('');
  // const sendLine = async () => {
  //   const response = await fetch(`http://localhost:3000/api/${text}`);
  //   const data = await response.json();
  //   console.log('🚀 ~ file: index.tsx ~ line 11 ~ sendLine ~ data', data);
  //   console.log('🚀 ~ file: lineCard.tsx ~ line 7 ~ lineCard ~ text', text);
  // };
  return (
    <section className={styles.card}>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1>{name}</h1>
          <br />
          {/* <input type="text" onChange={(e) => setText(e.target.value)} />
          <button onClick={sendLine}>送信</button> */}
        </main>
      </div>
    </section>
  );
};

export default lineCard;
