import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SidebarMenu.module.css';
import { NavigationButton } from '../navigation-menu/NavigationButton';
import logo from '../../assets/img/logo3.png';
import { SideBarButton } from './SideBarButton';

export type SidebarMenuProps = {
    width: number; 
    height: string; 
    to: To[];
}

export type To = {
    to: string;
    name: string;
}

export const SidebarMenu: React.FunctionComponent<SidebarMenuProps> = (props: SidebarMenuProps) => {

    const [xPosition, setX] = useState<number>(- props.width);

    const toggleMenu = () => {
        if (xPosition < 0) {
            setX(0);
        } else {
            setX(- props.width);
        }
    };

  useEffect(() => {
    setX(0);
  }, []);
  
  return (
    <>
      <div
        className={styles.sideBar}
        style={{
          transform: `translatex(${xPosition}px)`,
          width: props.width,
          minHeight: props.height
        }}
      >
        <button
            onClick={() => toggleMenu()}
            className={styles.toggleMenu}
            style={{
                transform: `translate(${props.width}px, 20vh)`
            }}
        ></button>
        <div className={styles.content}>
            {
                props.to.map((to) => 
                    <SideBarButton to={to.to} name={to.name} />
                )
            }
        </div>
      </div>
    </>
  );
}
