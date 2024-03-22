import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Quiz } from '../domain/quiz';
import { QuizService } from '../service/quiz.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../domain/category';
import { lastValueFrom } from 'rxjs';
import { CategoryService } from '../service/category.service';

let quiz: Quiz;
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  providers: [MessageService],
})
export class QuizComponent implements OnInit {
  addQuestionForm(front: string = '', back: string = ''): FormGroup {
    return this.fb.group({
      front: [front, Validators.required],
      back: [back, Validators.required],
    });
  }
  quizForm!: FormGroup;
  sendForm: boolean = false;
  value: number = 0;
  categories: Category[] = [];
  visible: boolean = false;
  title: string = 'Create Quiz';
  constructor(
    private fb: UntypedFormBuilder,
    private quizService: QuizService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}
  async ngOnInit() {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      id: [0],
      categoryId: ['', Validators.required],
      questions: this.fb.array([this.addQuestionForm()]),
    });
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.quizService.getById(id).subscribe({
          next: (response) => {
            this.quizForm.patchValue(response);
            this.title = response.title;
            const questionsArray = this.quizForm.get('questions') as FormArray;
            while (questionsArray.length !== 0) {
              questionsArray.removeAt(0);
            }
            quiz = response;
            response.questions.forEach((question) => {
              (this.quizForm.get('questions') as FormArray).push(
                this.addQuestionForm(question.front, question.back)
              );
            });
          },
          error: (error) => {},
        });
      }
    });
    this.categories = await lastValueFrom(this.categoryService.get());
  }

  addNewRow(): void {
    (<FormArray>this.quizForm.get('questions')).push(this.addQuestionForm());
  }

  removeRow(): void {
    if ((<FormArray>this.quizForm.get('questions')).length > 1) {
      (<FormArray>this.quizForm.get('questions')).removeAt(
        (<FormArray>this.quizForm.get('questions')).length - 1
      );
    }
  }
  async onSubmit() {
    let quiz: Quiz = this.quizForm.getRawValue();
    this.sendForm = true;
    if (quiz.id != 0) {
      this.quizService.put(quiz).subscribe({
        next: async (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Quiz updated',
          });
          await this.delay(1000);
          this.router.navigate(['']);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Unable to create',
            detail: err.error,
            life: 4000,
          });
        },
      });
    } else {
      this.quizService.post(quiz).subscribe({
        next: async (response) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'Quiz Created',
          });
          await this.delay(1000);
          this.router.navigate(['']);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Unable to create',
            detail: err.error,
            life: 4000,
          });
        },
      });
    }
  }
  getControls() {
    if (quiz) {
      return (this.quizForm.get('questions') as FormArray).controls;
    }
    return (this.quizForm.get('questions') as FormArray).controls;
  }
  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  handleDelete() {
    this.quizService.delete(quiz.id).subscribe({
      next: async (response) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Success',
          detail: 'Quiz Deleted',
        });
        await this.delay(1000);
        this.router.navigate(['']);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Unable to delete',
          detail: err.error,
          life: 4000,
        });
      },
    });
  }
  showDialog() {
    this.visible = true;
  }
}
