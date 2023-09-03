import { Component } from '@angular/core';
import { Grocery } from './Grocery';
import { GroceryListService } from 'src/app/services/grocery-list.service';

//maybe use this in db
enum GroceryType {
  Meat = 'Meat',
  Bakery = 'Bakery',
  Dairy = 'Dairy',
  Beverages = 'Beverages',
  Other = 'Other',
}

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent {
  groceryTypes = GroceryType;
  groceries: Grocery[] = [];
  lastId = 0;

  constructor(private groceriesService : GroceryListService) {
    
  }
  ngOnInit(): void {
    this.groceriesService.getAllGroceries()
    .subscribe({
      next: (groceries) => {
        this.groceries = groceries;
        for (const grocery of this.groceries) {
          if (grocery.id > this.lastId) {
            this.lastId = grocery.id;
          }
        }
      }
    });
  }
  addGrocery(name: string, type: string) {
    this.lastId++;
    const grocery = new Grocery(this.lastId, name, type, false);
    this.groceriesService.addGrocery(grocery)
    .subscribe({
      next: (grocery) => {
        this.groceries.push(grocery);
        this.ngOnInit();
      }
    });
  }
  changeState(item: Grocery) {
    item.isBought = !item.isBought;
    this.groceriesService.updateGrocery(item.id)
    .subscribe(
      {next: () => this.ngOnInit()}
    );
  }
  deleteGrocery(id: number) {
    this.groceriesService.deleteGrocery(id)
    .subscribe(
      {next: () => this.ngOnInit()}
    );
  }

  clearGroceries() {
    this.groceriesService.deleteGroceries()
    .subscribe(
      {next: () => this.ngOnInit()}
    );
  }
}
