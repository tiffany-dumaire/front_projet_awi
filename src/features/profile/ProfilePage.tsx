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
        {users.length > 0 ? 
          (<table>
            <thead className={styles.thead}>
              <tr>
                <td>ID</td>
                <td>Email</td>
                <td>Prenom</td>
                <td>Nom</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User_Interface) => (
                <tr>
                  <td>{user.user_id}</td>
                  <td>{user.user_email}</td>
                  <td>{user.prenom}</td>
                  <td>{user.nom}</td>
                </tr>
              ))
              }
            </tbody>
          </table>) : null
        }
      </div>
    </>
  );
}