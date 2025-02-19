import React from 'react';
import { IconBrandGithub, IconHeart, IconLogout, IconMoon, IconSun } from '@tabler/icons';
import Image from 'next/image';
import clsx from 'clsx';
import router from 'next/router';
import Link from 'next/link';
import { getUrl } from '../../../core/helpers/url-helpers';
import { useUIStore } from '../../../state/uiStore';
import { NavBar } from '../NavBar';
import { useLogoutMutation } from '../../../generated/graphql';

interface IProps {
  isUpdateAvailable?: boolean;
}

export const Header: React.FC<IProps> = ({ isUpdateAvailable }) => {
  const { setDarkMode } = useUIStore();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('token');
    router.reload();
  };

  return (
    <header className="navbar navbar-expand-md navbar-dark navbar-overlap d-print-none">
      <div className="container-xl">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
          <span className="navbar-toggler-icon" />
        </button>
        <Link href="/" passHref>
          <h1 className="navbar-brand d-none-navbar-horizontal pe-0 pe-md-3">
            <Image
              priority
              alt="Tipi logo"
              className={clsx('navbar-brand-image me-3')}
              width={100}
              height={100}
              src={getUrl('tipi.png')}
              style={{
                width: '30px',
                maxWidth: '30px',
                height: 'auto',
              }}
            />
            Tipi
          </h1>
        </Link>
        <div className="navbar-nav flex-row order-md-last">
          <div className="nav-item d-none d-lg-flex me-3">
            <div className="btn-list">
              <a href="https://github.com/meienberger/runtipi" target="_blank" rel="noreferrer" className="btn btn-dark">
                <IconBrandGithub data-testid="icon-github" className="me-1 icon" size={24} />
                Source code
              </a>
              <a href="https://github.com/meienberger/runtipi?sponsor=1" target="_blank" rel="noreferrer" className="btn btn-dark">
                <IconHeart className="me-1 icon text-pink" size={24} />
                Sponsor
              </a>
            </div>
          </div>
          <div className="d-flex">
            <div onClick={() => setDarkMode(true)} role="button" aria-hidden="true" className="nav-link px-0 hide-theme-dark cursor-pointer" data-tip="Dark mode">
              <IconMoon data-testid="icon-moon" size={24} />
            </div>
            <div onClick={() => setDarkMode(false)} aria-hidden="true" className="nav-link px-0 hide-theme-light cursor-pointer" data-tip="Light mode">
              <IconSun data-testid="icon-sun" size={24} />
            </div>
            <div onClick={handleLogout} tabIndex={0} onKeyPress={handleLogout} role="button" className="nav-link px-0 cursor-pointer" data-tip="Log out">
              <IconLogout size={24} />
            </div>
          </div>
        </div>
        <NavBar isUpdateAvailable={isUpdateAvailable} />
      </div>
    </header>
  );
};
