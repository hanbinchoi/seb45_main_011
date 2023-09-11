export type Point = { score: number };

export type Product = {
  productId: number;
  name: string;
  korName: string;
  imageUrlTable: {
    sm: string;
    lg: string;
  };
  price: number;
};

export type PlantObj = {
  productId: number;
  plantObjId: number;
  productName: string;
  korName: string;
  imageUrlTable: {
    sm: string;
    lg: string;
  };
  price: number;
  location: {
    locationId: number;
    isInstalled: boolean;
    x: number;
    y: number;
  };
  leafDto: {
    id: number;
    name: string;
    imageUrl: string;
    journalCount: number;
  } | null;
};

export interface RawGardenInfo {
  point: Point;
  plantObjs: PlantObj[];
  products: Product[];
}

export interface PurchaseInfo {
  point: Point;
  plantObj: PlantObj;
}

export interface PlantLocation {
  plantObjId: number;
  locationDto: {
    locationId: number;
    isInstalled: boolean;
    x: number;
    y: number;
  };
}

export interface LeafsDataInfo {
  leafId: number;
  leafName: string;
  createAt: string;
  leafImageUrl: string;
}

export interface DiaryDataInfo {
  journalId: number;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

export interface LeafDataInfo {
  leafId: number;
  leafName: string;
  leafImageUrl: string;
  content: string;
  createdAt: string;
}

export interface BoardDataInfo {
  title: string;
  imageUrl: string;
  likesNum: number;
  commentsNum: number;
  boardId: number;
}
