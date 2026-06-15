import * as migration_20260615_151430 from './20260615_151430';

export const migrations = [
  {
    up: migration_20260615_151430.up,
    down: migration_20260615_151430.down,
    name: '20260615_151430'
  },
];
