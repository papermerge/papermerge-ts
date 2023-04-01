import { useSession } from 'next-auth/react';

import CentralBar from './central_bar';
import { default as layout_styles } from './layout.module.css'
import Sidebar from './sidebar/sidebar';
import type { SimpleComponentArgs } from '@/types';


function Layout({ children }: SimpleComponentArgs) {

  const { data: session } = useSession();

  return (
    <main className={layout_styles.main}>
      <Sidebar />
      <CentralBar username={session?.username}>
        {children}
      </CentralBar>
    </main>
  );
}

export default Layout;
