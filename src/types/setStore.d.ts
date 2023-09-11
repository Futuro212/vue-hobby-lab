import type { legoSet } from '@/types/set';

export interface rebrickableResult {
    count: number;
    next?: string,
    previous?: string
    results?: legoSet[]
  }