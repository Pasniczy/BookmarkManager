# BookmarkManager

- [Tech Stack](#tech-stack)
- [Hosting](#hosting)
- [Local setup](#local-setup)
- [Contact](#contact)

## Tech Stack

- TypeScript
- Node.js + Express.js
- MySQL
- React
- Redux
- MaterialUI

![TypeScript Avatar icon by Icons8](https://img.icons8.com/color/48/typescript.png)
![Node.js Avatar icon by Icons8](https://img.icons8.com/fluency/48/node-js.png)
![MySQL Avatar icon by Icons8](https://img.icons8.com/color/48/mysql-logo.png)
![ReactJS Avatar icon by Icons8](https://img.icons8.com/office/48/react.png)
![Redux Avatar icon by Icons8](https://img.icons8.com/color/48/redux.png)
![MaterialUI Avatar icon by Icons8](https://img.icons8.com/color/48/material-ui.png)

[Avatar icons by Icons8](https://icons8.com/icons/)

## Hosting

You can preview this project [here](https://bookmark-manager.networkmanager.pl)

## Local setup

### 1. Create and run local MySQL database

### 2. Insert required tables

Create two required tables (users, bookmarks) using the following queries:

```
CREATE TABLE `users` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(320) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` char(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

```
CREATE TABLE `bookmarks` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(320) COLLATE utf8mb4_unicode_ci NOT NULL,
  `favorite` tinyint(1) NOT NULL DEFAULT 0,
  `user` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  CONSTRAINT `bookmarks_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### 3. Clone the repository

```
git clone https://github.com/Pasniczy/BookmarkManager.git
```

### 4. Set up the backend server

Navigate to `backend` directory and:

#### 4.1. Install backend dependencies

```
yarn install
```

#### 4.2. Create config environment variables

- in `backend` directory navigate to `config` folder and create `config.env` file
- in `config.env` create all the necessary environment variables (you can use `config.example` file as a guideline)

```
# config.example
FRONTEND_APP_URL=... # e.g. http://localhost:3000

APP_PORT=... # e.g. 3001
APP_URL=... # e.g. http://localhost:3001

DB_NAME=...
DB_HOST=...
DB_PORT=...
DB_USER=...
DB_PASSWORD=...

JWT_SECRET=... # random string
JWT_EXPIRE=30d # 30 days

SESSION_SECRET=... # random string
SESSION_EXPIRE=2592000000 # 30 days
```

#### 4.3. Start the server

```
yarn start # or yarn dev
```

If everything was set up properly, you should see the following message:

```
Server listening on http://localhost:3001
```

### 5. Set up the frontend app

Navigate to `frontend` directory and:

#### 5.1. Config environment variables

In `frontend` root, create `.env.local` file with `REACT_APP_API_URL_BASE` variable.

**Note:** backend server is running on `/api` endpoint, which you need to add to whatever URL you set as backend env variable `APP_URL`

```
REACT_APP_API_URL_BASE=... # e.g. http://localhost:3001/api
```

#### 5.2. Start the frontend app

```
yarn start
```

### Happy hacking!

## Contact

If you find any bugs or have any questions, you can contact me by email: bartoszpasnik@gmail.com
