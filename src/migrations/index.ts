import * as migration_20260617_052826 from './20260617_052826';
import * as migration_20260617_090533 from './20260617_090533';
import * as migration_20260617_163050 from './20260617_163050';

export const migrations = [
  {
    up: migration_20260617_052826.up,
    down: migration_20260617_052826.down,
    name: '20260617_052826',
  },
  {
    up: migration_20260617_090533.up,
    down: migration_20260617_090533.down,
    name: '20260617_090533',
  },
  {
    up: migration_20260617_163050.up,
    down: migration_20260617_163050.down,
    name: '20260617_163050'
  },
];
