import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {

  items: any[] = [];
  address: string = '';

constructor(private cartService: CartService, private toast : ToastService) {}

ngOnInit() {
  this.items = this.cartService.getItems();
}

increase(item: any) { this.cartService.increase(item); }
decrease(item: any) { this.cartService.decrease(item); }
remove(item: any)   { this.cartService.decrease(item); }

get totalPrice() {
  return this.items.reduce((sum, i) => sum + i.qty * i.price, 0);
}

sendWhatsAppOrder() {
  if (!this.address.trim()) {
    this.toast.show('Please enter delivery address',3000);
    return;
  }

  let message = `🛒 *New Order*%0A%0A`;

  this.items.forEach((item: any, index: number) => {
    message += `${index + 1}. ${item.name}%0A`;
    message += `   Qty: ${item.qty} × ₹${item.price} = ₹${item.qty * item.price}%0A%0A`;
  });

  message += `💰 *Total:* ₹${this.totalPrice}%0A%0A`;
  message += `📍 *Delivery Address:*%0A${this.address}`;

  const phoneNumber = '919560389445'; // ← replace with your WhatsApp number
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  window.open(whatsappUrl, '_blank');
}
}
