import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: any[] = [];

  private countSource = new BehaviorSubject<number>(0);
  cartCount$ = this.countSource.asObservable();

  constructor() {}

  getItems() {
    return this.items;
  }

  add(item: any) {
    let existing = this.items.find(i => i.id === item.id);

    if (existing) {
      existing.qty++;
    } else {
      this.items.push({ ...item, qty: 1 });
    }

    this.updateCount();
  }

  increase(item: any) {
    item.qty++;
    this.updateCount();
  }

  decrease(item: any) {
    item.qty--;
    if (item.qty === 0) {
      this.items = this.items.filter(i => i.id !== item.id);
    }
    this.updateCount();
  }

  updateCount() {
    const total = this.items.reduce((sum, i) => sum + i.qty, 0);
    this.countSource.next(total);
  }
}
