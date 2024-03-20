import { Component, OnInit } from '@angular/core';
import { QuizService } from '../service/quiz.service';
import { Question } from '../domain/question';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../domain/quiz';
import { MenuItem, MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.quiz = { id: 0, title: '', description: '', questions: [] };
  }
  disableButtons: boolean = false;
  quiz: Quiz;
  flipCard: boolean = false;
  front: string = '';
  back: string = '';
  index: number = 0;
  value: number = 0;
  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      let id = params.get('id') ?? '';

      this.quiz = await lastValueFrom(this.quizService.getById(id));

      this.front = this.quiz.questions[this.index].front;
      this.back = this.quiz.questions[this.index].back;
    });
  }

  toggleClick(): void {
    this.flipCard = !this.flipCard;
  }

  answer(ev: boolean) {
    if (ev) {
      this.quiz.questions[this.index].rightQuestions += 1;
    } else {
      this.quiz.questions[this.index].wrongQuestions += 1;
    }
    if (this.index < this.quiz.questions.length - 1) {
      this.index += 1;
      this.front = this.quiz.questions[this.index].front;
      this.back = this.quiz.questions[this.index].back;
    } else {
      this.disableButtons = true;
      let interval = setInterval(() => {
        this.value = this.value + Math.floor(Math.random() * 30) + 1;
        if (this.value >= 100) {
          this.value = 100;
          this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'Process Completed',
          });
          clearInterval(interval);
        }
      }, 200);
    }
  }
}
