import * as migration_20260426_143955_initial from './20260426_143955_initial';

export const migrations = [
  {
    up: migration_20260426_143955_initial.up,
    down: migration_20260426_143955_initial.down,
    name: '20260426_143955_initial'
  },
];
