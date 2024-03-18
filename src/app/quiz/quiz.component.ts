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
let quiz: Quiz;
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  addQuestionForm(front: string = '', back: string = ''): FormGroup {
    return this.fb.group({
      front: [front, Validators.required],
      back: [back, Validators.required],
    });
  }
  quizForm!: FormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private quizService: QuizService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      id: [0],
      questions: this.fb.array([this.addQuestionForm()]),
    });
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.quizService.getById(id).subscribe({
          next: (response) => {
            this.quizForm.patchValue(response);
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
      } else {
      }
    });
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
  onSubmit() {
    let quiz: Quiz = this.quizForm.getRawValue();
    if (quiz.id != 0) {
      this.quizService.put(quiz).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Created',
            life: 4000,
          });

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
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Created',
            life: 4000,
          });

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
      console.log(this.quizForm);
      return (this.quizForm.get('questions') as FormArray).controls;
    }
    return (this.quizForm.get('questions') as FormArray).controls;
  }
}
