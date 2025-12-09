// src/app/services/toast.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: number;
  message: string;
  timeout?: number; // ms
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();
  private seq = 1;

  show(message: string, timeout = 3000) {
    const id = this.seq++;
    const t: Toast = { id, message, timeout };
    const curr = this.toastsSubject.getValue();
    this.toastsSubject.next([t, ...curr]);
    setTimeout(() => this.dismiss(id), timeout);
  }

  dismiss(id: number) {
    const filtered = this.toastsSubject.getValue().filter(t => t.id !== id);
    this.toastsSubject.next(filtered);
  }
}
