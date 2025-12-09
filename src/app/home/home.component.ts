import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private cartService: CartService, private toast: ToastService) {}

  products = [
    { id: 1, name: 'Shoes', price: 1200, image: 'https://via.placeholder.com/200', qty: 0 },
    { id: 2, name: 'Watch', price: 1800, image: 'https://via.placeholder.com/200', qty: 0 },
    { id: 3, name: 'Bag', price: 900, image: 'https://via.placeholder.com/200', qty: 0 },
    { id: 4, name: 'Shoes', price: 1200, image: 'https://via.placeholder.com/200', qty: 0 },
    { id: 5, name: 'Watch', price: 1800, image: 'https://via.placeholder.com/200', qty: 0 },
    { id: 6, name: 'Bag', price: 900, image: 'https://via.placeholder.com/200', qty: 0 },
    { id: 7, name: 'Shoes', price: 1200, image: 'https://via.placeholder.com/200', qty: 0 },
    { id: 8, name: 'Watch', price: 1800, image: 'https://via.placeholder.com/200', qty: 0 },
    { id: 9, name: 'Bag', price: 900, image: 'https://via.placeholder.com/200', qty: 0 },
  ];

  addToCart(item: any) {
    this.cartService.add(item);
    this.toast.show(`${item.name} added to cart!`);
  }

  increase(item: any) {
    this.cartService.increase(item);
  }

  decrease(item: any) {
    this.cartService.decrease(item);
  }
}
