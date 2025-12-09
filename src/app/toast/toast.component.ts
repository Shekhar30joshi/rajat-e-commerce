import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Toast, ToastService } from '../toast.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  readonly toasts$: Observable<Toast[]>;

  constructor(private toast: ToastService, private cartService: CartService) {
    this.toasts$ = this.toast.toasts$;
  }

  addToCart(item: any) {
    this.cartService.add(item);
    this.toast.show(`${item.name} added to cart!`); // <-- Trigger toast here
  }
}
