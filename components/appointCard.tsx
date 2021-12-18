import { useState } from 'react';
import { appointmentFunc } from '../lib/firebase';
import styles from '../styles/Card.module.css';

const AppointCard = ({ name }: { name: string }) => {
  const [username, setUsername] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const handleAppoint = async () => {
    await appointmentFunc(username, date);
    console.log(
      '🚀 ~ file: index.tsx ~ line 11 ~ sendLine ~ username',
      username
    );
    console.log(
      '🚀 ~ file: appointCard.tsx ~ line 7 ~ AppointCard ~ date',
      date
    );
  };
  return (
    <section className={styles.card}>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1>{name}</h1>
          <br />
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
          <br />
          <input
            type="datetime-local"
            onChange={(e) => setDate(e.target.value)}
          />
          <br />
          <button onClick={handleAppoint}>予約</button>
        </main>
      </div>
    </section>
  );
};

export default AppointCard;
