import React, { useEffect, useState } from 'react';
import styles from './SidebarMenu.module.css';
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
    document.addEventListener('click', function(event) {
      if (event.target !== document.getElementById('sidebar')) {
        setX(-props.width);
      }
      if (event.target === document.getElementById('buttonSidebar')) {
        toggleMenu();
      }
    });
  });

  return (
    <>
      <div
        id={'sidebar'}
        className={styles.sideBar}
        style={{
          transform: `translatex(${xPosition}px)`,
          width: props.width,
          minHeight: props.height
        }}
      >
        <button
          id={'buttonSidebar'}
          onClick={() => toggleMenu()}
          className={styles.toggleMenu}
          style={{
            transform: `translate(${props.width}px, 20vh)`
          }}
        ></button>
        <div className={styles.content}>
          {
            props.to.map((to) => 
              <SideBarButton key={to.name} to={to.to} name={to.name} />
            )
          }
        </div>
      </div>
    </>
  );
}
