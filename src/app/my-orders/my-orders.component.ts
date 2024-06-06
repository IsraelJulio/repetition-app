import { Component, OnInit } from '@angular/core';

import { Product } from '../domain/product';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  products: Product[] = [];
  constructor() {}
  ngOnInit() {}
}
