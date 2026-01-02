import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ToastService } from '../toast.service';
import { NavigationStart, Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  activeTab = 'all';
  modalInstance: any;
  routerSub: any;

  constructor(
    private cartService: CartService,
    private toast: ToastService,
    private router: Router
  ) {}

  products = [
    { id: 1, name: 'Running Shoes', price: 1200, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=80', qty: 0, category: 'shoes' },
    { id: 2, name: 'Wrist Watch', price: 1800, image: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=400&q=80', qty: 0, category: 'watch' },
    { id: 3, name: 'Leather Bag', price: 900, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80', qty: 0, category: 'bag' },
    { id: 4, name: 'Sports Shoes', price: 1400, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80', qty: 0, category: 'shoes' },
    { id: 5, name: 'Smart Watch', price: 2200, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80', qty: 0, category: 'watch' },
    { id: 6, name: 'Travel Backpack', price: 1600, image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80', qty: 0, category: 'bag' },
    { id: 7, name: 'Bag', price: 1100, image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=400&q=80', qty: 0, category: 'bag' },
    { id: 8, name: 'Classic Watch', price: 2000, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80', qty: 0, category: 'watch' },
    { id: 9, name: 'Office Bag', price: 1300, image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=400&q=80', qty: 0, category: 'bag' }
  ];
  selectedItem: any;

  get filteredProducts() {
    if (this.activeTab === 'all') return this.products;
    return this.products.filter(p => p.category === this.activeTab);
  }

  ngOnInit() {
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.closeModal();
      }
    });
  }

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

  openDetails(item: any) {
    this.selectedItem = item;

    const modalEl = document.getElementById('productModal');
    this.modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
    this.modalInstance.show();
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.modalInstance = null;
    }

    // Safety cleanup
    document.body.classList.remove('modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    backdrop?.remove();
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }
}
