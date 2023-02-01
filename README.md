# Messenger Server v2

## Setup MongoDB replica set on Windows

- Stop MongoDB service

- Open CMD as Administrator and access C:\Program Files\MongoDB\Server&#92;&lt;version&gt;\bin

```bash
mongod --dbpath "C:\Program Files\MongoDB\Server\<version>\data" --logpath "C:\Program Files\MongoDB\Server\<version>\log\mongod.log" --port 27017 --storageEngine=wiredTiger --journal --replSet myset
```

- Open other CMD and enable replica set (just run for the first time)

```bash
mongo --port 27017
```

```bash
rs.initiate()
```

## Installation

```bash
$ yarn install
```

## Database

- Prepare database (Whenever prisma schema is updated)
  Note that this command generates the prisma client as well.

```shell
$ npx prisma generate
```

- Push the initial schema to the database

```shell
$ npx prisma db push
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
