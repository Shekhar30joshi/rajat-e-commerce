import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {

  items: any[] = [];

constructor(private cartService: CartService) {}

ngOnInit() {
  this.items = this.cartService.getItems();
}

increase(item: any) { this.cartService.increase(item); }
decrease(item: any) { this.cartService.decrease(item); }
remove(item: any)   { this.cartService.decrease(item); }

get totalPrice() {
  return this.items.reduce((sum, i) => sum + i.qty * i.price, 0);
}

}
