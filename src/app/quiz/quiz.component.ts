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
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  addQuestionForm(): FormGroup {
    return this.fb.group({
      front: ['', Validators.required],
      back: ['', Validators.required],
    });
  }
  quizForm!: FormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private quizService: QuizService
  ) {}
  ngOnInit(): void {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      questions: this.fb.array([this.addQuestionForm()]),
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
    quiz.id = 0;
    console.log(quiz);
    this.quizService.post(quiz).subscribe((x) => console.log('salvou'));
  }
  getControls() {
    return (this.quizForm.get('questions') as FormArray).controls;
  }
}
