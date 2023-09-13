import { Component } from '@angular/core';
import { Grocery } from './Grocery';
import { GroceryListService } from 'src/app/services/groceryservices/grocery-list.service';
import { UserAuthService } from 'src/app/services/userservices/user-auth.service';

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

  constructor(private groceriesService : GroceryListService, private userAuthService: UserAuthService) {
    
  }
  ngOnInit(): void {
    if (this.isLogged()) {
      this.groceriesService.getAllGroceries().subscribe({
        next: (groceries) => {
          this.groceries = groceries;
          for (const grocery of this.groceries) {
            if (grocery.id > this.lastId) {
              this.lastId = grocery.id;
            }
          }
        }
      });
    } else {
      this.loadFromLocal();
    }
  }

  addGrocery(name: string, type: string) {
    this.lastId++;
    const grocery = new Grocery(this.lastId, name, type, false);
    if (this.isLogged()) {
      this.groceriesService.addGrocery(grocery).subscribe({
        next: (grocery) => {
          this.groceries.push(grocery);
          this.ngOnInit();
        }
      });
    } else {
      this.saveToLocal(grocery);
      this.loadFromLocal();
    }
  }

  changeState(item: Grocery) {
    item.isBought = !item.isBought;
    if (this.isLogged()) {
      this.groceriesService.updateGrocery(item.id).subscribe({
        next: () => this.ngOnInit()
      });
    } else {
      this.saveToLocal(item);
      this.loadFromLocal();
    }
  }

  deleteGrocery(id: number) {
    if (this.isLogged()) {
      this.groceriesService.deleteGrocery(id).subscribe({
        next: () => this.ngOnInit()
      });
    } else {
      this.removeFromLocal(id);
      this.loadFromLocal();
    }
  }

  clearGroceries() {
    if (this.isLogged()) {
      this.groceriesService.deleteGroceries().subscribe({
        next: () => this.ngOnInit()
      });
    } else {
      localStorage.removeItem('groceries');
      this.groceries = [];
    }
  }

  saveToLocal(grocery: Grocery) {
    const groceries = JSON.parse(localStorage.getItem('groceries') || '[]');
    const index = groceries.findIndex((g: Grocery) => g.id === grocery.id);
    
    if (index !== -1) {
      groceries[index] = grocery;
    } else {
      groceries.push(grocery);
    }
    
    localStorage.setItem('groceries', JSON.stringify(groceries));
  }
  

  loadFromLocal() {
    this.groceries = JSON.parse(localStorage.getItem('groceries') || '[]');
  }

  removeFromLocal(id: number) {
    const groceries = JSON.parse(localStorage.getItem('groceries') || '[]');
    const index = groceries.findIndex((g: Grocery) => g.id === id);
    if (index !== -1) {
      groceries.splice(index, 1);
      localStorage.setItem('groceries', JSON.stringify(groceries));
    }
  }

  isLogged() : boolean {
    return this.userAuthService.isLoggedIn();
  }
}
