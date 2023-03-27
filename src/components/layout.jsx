
import CentralBar from './central_bar';
import styles from './layout.module.css'
import Sidebar from './sidebar/sidebar';


export default function Layout({ children }) {
  return (
    <main className={styles.main}>
      <Sidebar />
      <CentralBar>
        {children}
      </CentralBar>
    </main>
  );
}
