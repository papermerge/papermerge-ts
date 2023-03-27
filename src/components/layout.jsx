
import Link from 'next/link';
import styles from './layout.module.css'


export default function Layout({ children }) {
  return (
    <main className={styles.main}>
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
        <h4 className='brand-text me-2'>Papermerge</h4>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className='nav-item'><Link href="/home" className='nav-link active'>Home</Link></li>
          <li className='nav-item'><Link href="/inbox" className='nav-link'>Inbox</Link></li>
        </ul>
      </div>
      <div className={styles.central_bar}>
        {children}
      </div>
    </main>
  );
}
