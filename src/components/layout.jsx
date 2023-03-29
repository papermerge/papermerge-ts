
import CentralBar from './central_bar';
import styles from './layout.module.css'
import Sidebar from './sidebar/sidebar';


function Layout({ children }) {
  return (
    <main className={styles.main}>
      <Sidebar />
      <CentralBar>
        {children}
      </CentralBar>
    </main>
  );
}

Layout.requires_auth = true;

export default Layout;
