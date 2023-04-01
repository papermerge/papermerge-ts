import React from 'react';

import styles from './layout.module.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { signOut } from 'next-auth/react';


type PropsType = {
  children: React.ReactNode;
  username: string | undefined | null;
}

export default function CentralBar({username, children}: PropsType) {
  return (
    <div className={styles.central_bar}>
      <nav className='navbar navbar-expand nav-top'>
        <div className='container-fluid'>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" role="button"><i className="bi bi-list"></i></a>
            </li>
            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {username}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#" onClick={ () => signOut() }>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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