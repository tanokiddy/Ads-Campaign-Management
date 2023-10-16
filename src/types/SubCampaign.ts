export interface ISubCamPaign {
  name: string;
  ads: IAds[];
  status: boolean;
}

export interface IAds {
  name: string;
  quantity: number;
}
