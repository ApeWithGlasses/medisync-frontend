import { ReactNode } from 'react';
import Navbar from './Navbar';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout-main">{children}</main>
      <footer className="layout-footer">
        <p>&copy; 2026 MediSync. Sistema de Gestión de Citas Médicas.</p>
      </footer>
    </div>
  );
};

export default Layout;
