export interface ISubCamPaign {
  name: string;
  ads: IAds[];
  status: boolean;
  id: number;
}

export interface IAds {
  name: string;
  quantity: number;
  id: number;
}
