export class Aircraft {
  id: number;
  name: string;
  type: Type;
  manufacturer: String;
}

export enum Type {
  NA = 'NA',
  WB = 'Wide_body',
  NB = 'Narrow_body'
}
