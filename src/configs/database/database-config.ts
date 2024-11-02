import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

export const DatabaseConfig = TypeOrmModule.forRootAsync({
  useFactory() {
    return {
      type: 'mysql',
      host: process.env['DATABASE_HOST'],
      port: +process.env['DATABASE_PORT'],
      username: process.env['DATABASE_USER'],
      password: process.env['DATABASE_PASS'],
      database: process.env['DATABASE_NAME'],
      entities: ['dist/**/*.entity{.ts,.js}'],
      // migrations: ['dist/src/database/migrations/*{.ts,.js}'],
      // migrationsRun: true,
      synchronize: true,
      // migrationsTransactionMode: 'all',
    //   useUTC: true,
      // logging: process.env['APP_ENV'] == 'local',
    };
  },
  // async dataSourceFactory(options) {
  //   return addTransactionalDataSource(new DataSource(options));
  // },
});
