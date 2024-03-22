import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { Category } from '../domain/category';
import { DialogService } from 'primeng/dynamicdialog';
import { CategoryEditComponent } from './category-edit/category-edit.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryList: Category[] = [];
  constructor(
    private categoryService: CategoryService,
    public dialogService: DialogService
  ) {}
  async ngOnInit() {
    this.reload();
  }
  reload() {
    this.categoryService.get().subscribe((c) => (this.categoryList = c));
  }
  createCategory() {
    const dialogRef = this.dialogService.open(CategoryEditComponent, {
      header: 'Create Category',
      width: '50%',
      dismissableMask: true,
      data: {
        id: 0,
        dialogMode: 'Create',
      },
    });

    dialogRef.onClose.subscribe(() => {
      this.reload();
    });
  }
  btnAction(id: number, action: string) {
    if (action === 'edit') {
      const dialogRef = this.dialogService.open(CategoryEditComponent, {
        header: 'Edit Category',
        width: '50%',
        dismissableMask: true,
        data: {
          id: id,
          dialogMode: 'Edit',
        },
      });
      dialogRef.onClose.subscribe(() => {
        this.reload();
      });
    } else {
      const dialogRef = this.dialogService.open(CategoryEditComponent, {
        header: 'Delete Category',
        width: '50%',
        dismissableMask: true,
        data: {
          id: id,
          dialogMode: 'Delete',
        },
      });
      dialogRef.onClose.subscribe(() => {
        this.reload();
      });
    }
  }
}
