import axios, { AxiosRequestConfig } from 'axios';
import { User_Interface } from '../interfaces/User.interface';

export async function getUsers(): Promise<User_Interface[]> {
  return new Promise((resolve, reject) => {
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/users/all`;
      const config: AxiosRequestConfig = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      };
      axios.get(url, config).then((users) => {
        console.log(users);
        const userList: User_Interface[] = new Array<User_Interface>();
        users.data.forEach((user: User_Interface) => {
          userList.push(user);
        });
        resolve(userList);
      });
    } catch (err) {
      reject(err);
    }
  });
}