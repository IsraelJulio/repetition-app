import { Component, OnInit } from '@angular/core';
import { Product } from '../domain/product';
import { ProductService } from '../service/product.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { Category } from '../domain/category';
import { CategoryService } from '../service/category.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public productDialog: boolean = false;
  public isActiveEnabled: boolean | null = true;
  productForm!: FormGroup;
  products: Product[] = [];
  dt: any;
  product = new Product();
  categories: Category[] = [];
  selectedProducts: Product[] | null | undefined;

  submitted: boolean = false;

  statuses: any[] = [];

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private fb: UntypedFormBuilder,
    private confirmationService: ConfirmationService,
    private categoryService: CategoryService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      id: [''],
      description: [''],
      price: [''],
      isActive: [''],
      category: [''],
      image: [],
      rating: [''],
      categoryId: [''],
      status: [''],
    });
  }

  async ngOnInit() {
    this.productService.getProducts().then((data) => (this.products = data));

    this.statuses = [
      { label: 'ATIVADO', value: 'ativado' },
      { label: 'DESATIVADO', value: 'desativado' },
    ];
    this.categories = await lastValueFrom(this.categoryService.get());
  }
  onIsActiveSwitchChange(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.isActiveEnabled = event.target.checked;
    }
  }
  onUpload(value: any) {}
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(
          (val) => !this.selectedProducts!.includes(val)
        );
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productForm.patchValue(this.product);
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {};
        this.productForm.patchValue(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product && this.product.name && this.product.name.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'ATIVADO':
        return 'success';
      case 'DESATIVADO':
        return 'danger';
      default:
        return 'default';
    }
  }

  onInput(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const inputValue = (event.target as HTMLInputElement).value;
      this.dt.filterGlobal(inputValue, 'contains');
    }
  }
}
