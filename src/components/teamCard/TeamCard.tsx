import React from 'react';
import styles from './TeamCard.module.css';

export type TeamCardProps = {
  nom: string;
  prenom: string;
  picture?: string;
  class: number;
  groupeTD: number;
  fonction?: string;
};

export const TeamCard: React.FunctionComponent<TeamCardProps> = (props: TeamCardProps) => {
  return (
    <div className={styles.teamCardContainer}>
      <table>
        <thead className={styles.pictureContainer}>
          <tr>
            <img
              className={styles.teamCardPicture}
              src={props.picture}
              alt="team-member"
            />
          </tr>
        </thead>
        <tbody className={styles.informations}>
            <tr className={styles.personal}>
                {props.prenom + ' ' + props.nom} 
            </tr>
            <tr className={styles.fonction}>
                {props.fonction}
            </tr>
            <tr className={styles.class}>
                {'IG' + props.class + ' | TD' + props.groupeTD}
            </tr>
        </tbody>
    </table>
    </div>
  );
}