import React, { useState, useEffect } from 'react';
import styles from './ProfilePage.module.css';
import { Helmet } from 'react-helmet';
import { getUsers } from '../../api/user.api';
import { User_Interface } from '../../interfaces/User.interface';

export function ProfilePage(): JSX.Element {
  const [users, setUsers] = useState<User_Interface[]>([]);

  useEffect(() => {
    getUsers().then((u) => {
      u.forEach((user) => {
        users.push(user);
        setUsers(users.slice(0));
      }); 
    });
  },[]);

  return(
    <>
      <Helmet>
        <title>{'AWI | Profil'}</title>
      </Helmet>
      <div className={styles.profileContainer}>
        <table>
          <thead>
          <tr>
              <td>ID</td>
              <td>Email</td>
              <td>Prenom</td>
              <td>Nom</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{users[0].user_id}</td>
              <td>{users[0].user_email}</td>
              <td>{users[0].prenom}</td>
              <td>{users[0].nom}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}