export class Grocery {
  id:number;  
  name: string;
  type: string;
  isBought: boolean;
  constructor(id:number, name: string, type: string, isBought: boolean) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.isBought =  isBought;
  }
}