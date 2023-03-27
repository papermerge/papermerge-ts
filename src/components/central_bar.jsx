import styles from './layout.module.css'


export default function CentralBar({children}) {
  return (
    <div className={styles.central_bar}>
      <nav className='navbar navbar-expand nav-top'>
        <div className='container-fluid'>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" role="button"><i className="bi bi-list"></i></a>
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
  );
}