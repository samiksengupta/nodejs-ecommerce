## Node JS Ecommerce Backend Project

This is a NodeJS powered Web Application, Backend and API Resource hub for it's client interface.

## Installation

**Prepare a location for the project.** We will name the directory `ecommerce`. Inside the project directory, set up git and pull from the repository. Or alternatively, download the project to the location.

```bash
git init
git pull https://github.com/samiksengupta/nodejs-ecommerce.git
```

OR

```bash
git clone https://github.com/samiksengupta/nodejs-ecommerce.git .
```
**Install dependencies.** This may take a while.

```bash
npm install
```

**Create a `.env` file** at the project root and copy contents from here into it.

```
HOST=localhost
PORT=3000
NODE_ENV=development

APP_NAME=ecommerce

DEV_DB_HOSTNAME=localhost
DEV_DB_NAME=db_node_ecommerce
DEV_DB_USERNAME=<YOUR DB USERNAME HERE>
DEV_DB_PASSWORD=<YOUR DB PASSWORD HERE>
DEV_DB_DIALECT=mysql

TEST_DB_HOSTNAME=localhost
TEST_DB_NAME=db_node_ecommerce
TEST_DB_USERNAME=<YOUR DB USERNAME HERE>
TEST_DB_PASSWORD=<YOUR DB PASSWORD HERE>
TEST_DB_DIALECT=mysql

PROD_DB_HOSTNAME=localhost
PROD_DB_NAME=db_node_ecommerce
PROD_DB_USERNAME=<YOUR DB USERNAME HERE>
PROD_DB_PASSWORD=<YOUR DB PASSWORD HERE>
PROD_DB_DIALECT=mysql

JWT_SECRET=<YOUR JWT SECRET HERE>
JWT_LIFESPAN=600
```

When you have set up your database configuration, **run migrations and seeders** to generate tables from the schema and populate them with data. The following scripts can be used to quickly setup the server and run migrations/seeders.

**Run server using nodemon**

```bash
npm run server
```

**Create database and run migrations**

```bash
npm run setup
```

**Wipe db, run migrations and seeders**

```bash
npm run reset
```

### Todo

* Create api to regenerate token
* ~~Operate on a single cart entry per user~~
* Order features
    * Cart to Order
    * Order placement
    * Order fetch
* ~~Validation~~
* Unit tests
