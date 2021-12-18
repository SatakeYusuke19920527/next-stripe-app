import type { NextPage } from 'next';
import styles from '../styles/Card.module.css';

const StCard = ({ name }: { name: string }) => {
  return (
    <section className={styles.card}>
      <form action="/api/checkout_sessions" method="POST">
        <section>
          <button type="submit" role="link">
            {name}
          </button>
        </section>
      </form>
    </section>
  );
};

export default StCard;
