import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { Category } from '../domain/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryList: Category[] = [];
  constructor(private categoryService: CategoryService) {}
  async ngOnInit() {
    this.categoryService.get().subscribe((c) => (this.categoryList = c));
  }
  createCategory() {}
}
