import React from "react";
import { NavLink } from "react-router-dom";
import styles from './NavigationBar.module.css';

export type NavigationButtonProps = {
    to: string;
};

export const NavigationButton: React.FunctionComponent<NavigationButtonProps> = (props: NavigationButtonProps) => {
  return(
    <NavLink exact to={`/${props.to}`} className={styles.navButton}>
      <div>
        <p>{props.to[0].toUpperCase() + props.to.slice(1)}</p>
      </div>
    </NavLink>
  );
}
