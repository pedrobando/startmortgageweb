import * as migration_20260426_150435_initial from './20260426_150435_initial';

export const migrations = [
  {
    up: migration_20260426_150435_initial.up,
    down: migration_20260426_150435_initial.down,
    name: '20260426_150435_initial'
  },
];
