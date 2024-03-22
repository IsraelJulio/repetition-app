import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { lastValueFrom } from 'rxjs';
import { Category } from 'src/app/domain/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent implements OnInit {
  categoryForm!: FormGroup;
  categoryId: number = 0;
  category: Category = { name: '', id: 0 };
  dialogMode: string = '';
  constructor(
    private categoryService: CategoryService,
    private fb: UntypedFormBuilder,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    public ref: DynamicDialogRef
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      id: [''],
    });
    this.categoryId = config.data.id;
    this.dialogMode = config.data.dialogMode;
    if (this.dialogMode === 'Delete') this.categoryForm.disable();

    this.categoryForm.patchValue({ id: this.categoryId });
  }
  async ngOnInit() {
    if (this.categoryId !== 0) {
      this.category = await lastValueFrom(
        this.categoryService.getById(this.categoryId.toString())
      );
      this.categoryForm.patchValue(this.category);
    }
  }
  handleSave() {
    this.category = this.categoryForm.getRawValue();
    if (this.dialogMode === 'Create') this.create(this.category);
    else if (this.dialogMode === 'Edit') this.update(this.category);
  }
  create(category: Category) {
    this.categoryService.post(category).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'The category was successfuly created',
          life: 4000,
        });

        this.ref.close();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Unable to create the category',
          detail: `Unable to create the category. This name is already in use`,
          life: 4000,
        });
      },
    });
  }
  update(category: Category) {
    this.categoryService.put(category).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'The category was successfuly updated',
          life: 4000,
        });

        this.ref.close();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Unable to update the category',
          detail: `Unable to update the category. This name is already in use`,
          life: 4000,
        });
      },
    });
  }
  handleDelete() {
    this.category = this.categoryForm.getRawValue();
    this.categoryService.delete(this.category.id).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'The category was deleted updated',
          life: 4000,
        });

        this.ref.close();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Unable to delete the category',
          detail: err.message,
          life: 4000,
        });
      },
    });
  }
}
