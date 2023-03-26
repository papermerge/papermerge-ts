
import styles from './layout.module.css';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <ul>
        <li><Link href="/">Index</Link></li>
        <li><Link href="/inbox">Inbox</Link></li>
        <li><Link href="/home">Home</Link></li>
      </ul>
      {children}
    </div>
  );
}
