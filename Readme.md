# Project Setup Guide

## Server

### Step One: Setup in the Local Environment

#### 1. Configure Environment Variables

Create a `.env` file in the `pesto-server/` directory of your project and add the following configurations:

```sh
PORT=<specify the port>
DB=<your mongodb connection string>
BASE_URL=http://localhost:<specified port>
APP_SECRET=<some random secret string for app secret>
R_APP_SECRET=<some random secret string for re-fresh token>
```

- To Generate the random secret key you can run `window.crypto.randomUUID();` in the browser console which will generate random key `string`

#### 2. Install Dependencies

Run the following command to install all the dependencies:

```sh
$ cd pesto-server
$ npm install
$ npm run dev
```

### Step Two: Setup in the Production Environment

Run the following command to build the project for production

#### 1. Configure Environment Variables

Create a `.env` file in the `pesto-server/` directory of your project and add the following configurations depenging on your production env:

```sh
PORT=<specify the port>
DB=<your mongodb connection string>
BASE_URL=http://localhost:<specified port>
APP_SECRET=<some random secret string for app secret>
R_APP_SECRET=<some random secret string for re-fresh token>
```

- To Generate the random secret key you can run `window.crypto.randomUUID();` in the browser console which will generate random key `string`

```sh
$ cd pesto-server
$ npm install
$ npm run build
$ npm run start
```

## Client Setup

#### 1. Configure Environment Variables (Development)

Create a `.env` file in the `pesto-rc/` directory of your project and add the following configurations:

`VITE_BASE_URL=<your server base url>`

to run the react app locally.

```ssh
$ cd pesto-rc
$ npm install
$ npm run dev
```

- Make sure your server is up and running and baseURL is specified on the .env file which is same on which the server is running

#### 2. Configure Environment Variables (Production)

Create a `.env` file in the `pesto-rc/` directory of your project and add the following configurations:

```sh
VITE_BASE_URL=<your server base url>
```

to run the react app locally.

```sh
$ cd pesto-rc
$ npm install
$ npm run build
```

This will generate a dist directory in the root move that root directory to pesto-server and rename it to public

or run the following command

```sh
$ npm run move:dist
```

This command will automatically move the dist directory to the server which then can be served using the express router
