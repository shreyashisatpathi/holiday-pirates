import { FC } from 'react';
import Header from './Header';
import classes from './Layout.module.css';

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={classes.main}>{children}</main>
    </>
  );
};

export default Layout;
