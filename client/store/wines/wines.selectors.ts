import { MapType } from './wines.reducer';

export const getWineById = (state: MapType, id: number) => state[id];
