[
  {
    type: 'postgres',
    host: 'localhost',
    port: 35432,
    username: 'postgres',
    password: 'ASD587WER1889',
    database: 'gostack-postgres2',
    entities: ['./dist/modules/**/infra/typeorm/entities/*.js'],
    migrations: ['./dist/shared/infra/typeorm/migrations/*.js'],
    cli: {
      migrationsDir: './dist/shared/infra/typeorm/migrations/*.js',
    },
  },
  {
    name: 'mongo',
    type: 'mongodb',
    user: 'mongodb',
    password: 'UXALELE17Q8',
    host: 'localhost',
    port: 47017,
    database: 'gostack-mongodb',
    useUnifiedTopology: true,
    entities: ['./dist/modules/**/infra/typeorm/schemas/*.js'],
  },
];
