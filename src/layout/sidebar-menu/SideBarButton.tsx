import React from "react";
import { NavLink } from "react-router-dom";
import styles from './SideBarButton.module.css';

export type SideBarButtonProps = {
    to: string;
    name: string;
};

export const SideBarButton: React.FunctionComponent<SideBarButtonProps> = (props: SideBarButtonProps) => {
  return(
    <NavLink exact to={`${props.to}`} className={styles.navButton}>
      <div>
        <p>✨ <span className={styles.text}>{props.name[0].toUpperCase() + props.name.slice(1)}</span></p>
      </div>
    </NavLink>
  );
}
