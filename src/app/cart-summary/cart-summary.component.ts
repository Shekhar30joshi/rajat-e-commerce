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
  paymentMethod: string = '';
  customerName: string = '';


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

  // Name validation
  if (!this.customerName.trim()) {
    this.toast.show('Please enter your name', 3000);
    return;
  }

  // Address validation
  if (!this.address.trim()) {
    this.toast.show('Please enter delivery address', 3000);
    return;
  }

  // Payment validation ONLY for mobile
  if (this.isMobile() && !this.paymentMethod) {
    this.toast.show('Please select payment method', 3000);
    return;
  }

  // WhatsApp message
  let message = `🛒 *New Order*%0A`;
  message += `👤 *Customer:* ${this.customerName}%0A%0A`;

  this.items.forEach((item: any, index: number) => {
    message += `${index + 1}. ${item.name}%0A`;
    message += `Qty: ${item.qty} × ₹${item.price} = ₹${item.qty * item.price}%0A%0A`;
  });

  message += `💰 *Total:* ₹${this.totalPrice}%0A`;

  if (this.isMobile()) {
    message += `💳 *Payment:* ${this.paymentMethod}%0A%0A`;
  } else {
    message += `💳 *Payment:* To be discussed on WhatsApp%0A%0A`;
  }

  message += `📍 *Address:*%0A${this.address}`;
  const upiLink =
  `upi://pay?pa=9560389445@ybl&pn=My Veg Store&am=${this.totalPrice}&cu=INR`;

  message += `%0A💸 *Pay using UPI:*%0A${encodeURIComponent(upiLink)}`;


  const phone = '919560389445';
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');

  // Trigger UPI ONLY on mobile + non-COD
  if (this.isMobile() && this.paymentMethod !== 'COD') {
    this.payWithUPI();
  }
}


isMobile(): boolean {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}


payWithUPI() {
  const upiId = '9560389445@ybl';
  const name = 'My Veg Store';
  const amount = this.totalPrice;

  const upiUrl =
    `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;

  window.location.href = upiUrl;
}

}
