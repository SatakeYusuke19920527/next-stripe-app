import type { NextPage } from 'next';
import styles from '../styles/Layout.module.css';

import Footer from '../components/footer';
import Header from '../components/header';

const Layout: NextPage = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
