import type { NextPage } from 'next';
import styles from '../styles/StripeCard.module.css';

const StripeCard: NextPage = () => {
  return (
    <section className={styles.card}>
      <form action="/api/checkout_sessions" method="POST">
        <section>
          <button type="submit" role="link">
            Checkout
          </button>
        </section>
      </form>
    </section>
  );
};

export default StripeCard;
