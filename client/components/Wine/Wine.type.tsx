export type CellarType = (WineType & { bottles: BottleType[] })[];

export type WineType = {
  id: number;
  blur: string;
  name: string;
  source: string;
  wineCategory: string;
  wineType: string;
  thumbnailFileName: string;
  pictureFileName: string;
  positionComment: string;
  isInBoxes: boolean;
  _deleted: boolean;
  isFavorite: boolean;
  bottleType: number;
  year: number;
  wineFamily: number;
  stock: number;
  count: number;
  created_at: Date;
};

export type BottleType = {
  id: number;
  wineId: number;
  box: number;
  cell: number;
};

export type WineFamilyType = {
  id: number;
  name: string;
};
