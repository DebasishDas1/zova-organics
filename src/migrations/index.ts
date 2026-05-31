import * as migration_20260531_180334 from './20260531_180334';

export const migrations = [
  {
    up: migration_20260531_180334.up,
    down: migration_20260531_180334.down,
    name: '20260531_180334'
  },
];
