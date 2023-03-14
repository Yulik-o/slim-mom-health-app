import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { omit } from 'lodash';

const $publicHost = axios.create({
  baseURL: 'https://slimmom-backend.goit.global/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const $privateHost = axios.create({
  baseURL: 'https://slimmom-backend.goit.global/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const token = {
  set: (token, token_type) => {
    $privateHost.defaults.headers.common.Authorization = `${token_type} ${token}`;
  },
  unSet: () => {
    $privateHost.defaults.headers.common.Authorization = '';
  },
};

//реєстрація користувача

// приклад тіла запиту {
//       email: 'userbob@example.com',
//       password: 'qwerty123',
//       username: 'Emma',
//     }

export async function register(userData) {
  const { data } = await $publicHost.post(`/auth/register`, userData);
  return data;
}

//логінізація користувача

// приклад тіла запиту {
//       email: 'userbob@example.com',
//       password: 'qwerty123',
//     }

export async function login(userData) {
  const { data } = await $publicHost.post(`/auth/login`, userData);
  return data;
}

//розлогінізація користувача

export async function logOut() {
  const { data } = await $privateHost.post(`/auth/logout`);
  return data;
}

// refresh користувача

// приклад тіла запиту {
//   "sid": "507f1f77bcf86cd799439011"
// }

export async function refresh(sid, refreshToken) {
  const { data } = await $privateHost({
    data: { sid },
    headers: { Authorization: refreshToken },
    method: 'post',
    url: `/auth/refresh`,
  });
  return data;
}

// getUser

export async function getUser() {
  const { data } = await $privateHost.get(`/user`);
  return data;
}

// daily-rate

// приклад тіла запиту  {
//   "weight": 100,
//   "height": 170,
//   "age": 30,
//   "desiredWeight": 60,
//   "bloodType": 1
// }

export async function dailyRate(credentials) {
  try {
    const { data } = await $publicHost.post('/daily-rate', credentials);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

// daily-rate-id

// приклад тіла запиту  {
//   "weight": 100,
//   "height": 170,
//   "age": 30,
//   "desiredWeight": 60,
//   "bloodType": 1
// }

export async function dailyRateId(credentials) {
  
  try {
    const { data } = await $privateHost.post(
      `/daily-rate/${credentials.userId}`,
      omit(credentials, ['userId'])
    );

    return data;
  } catch (error) {
    console.log(error.message);
  }
}

//Product-search
export async function productSearch(search) {
  try {
    const { data } = await $privateHost.get(`/product?search=${search}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

// day

// приклад тіла запиту  {
//   "date": "2020-12-31",
//   "productId": "5d51694802b2373622ff552c",
//   "weight": 100
// }

export async function day(credentials) {
  try {
    const { data } = await $privateHost.post('/day', credentials);
    return data;
  } catch (error) {
    console.log(error.message);
    alert('перейдіть')
  }
}

// day delete

// приклад тіла запиту  {
//   "dayId": "507f1f77bcf86cd799439011",
//   "eatenProductId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
// }

export async function dayDelete(dayId) {
  try {
    const { data } = await $privateHost.delete('/day', { data: dayId });
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function dayInfo(credentials) {
  try {
    const { data } = await $privateHost.post('/day/info', credentials);
    return data;
  } catch (error) {
    Notify.warning('Заповніть, будь ласка, форму на сторінці підрахунку!');
  }
}
