
import ActiveLink from './activelink';
import styles from './layout.module.css'

export default function Layout({ children }) {

  return (
    <main className={styles.main}>
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
        <h4 className='brand-text me-2'>Papermerge</h4>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className='nav-item'>
            <ActiveLink href="/home" className='nav-link text-white'>
              <i className='bi-house me-2'></i>Home
            </ActiveLink></li>
          <li className='nav-item'>
            <ActiveLink href="/inbox" className='nav-link text-white'>
              <i className='bi-inbox me-2'></i>
              Inbox
            </ActiveLink>
          </li>
        </ul>
      </div>
      <div className={styles.central_bar}>
        <nav className='navbar navbar-expand nav-top'>
          <div className='container-fluid'>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" role="button"><i className="bi bi-list"></i></a>
              </li>
            </ul>
          </div>
        </nav>
        <div className='container-fluid'>
          <div className='d-flex row'>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
