import { Component } from '@angular/core';
import { DataViewLayoutOptions } from 'primeng/dataview';
import { QuizService } from '../service/quiz.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private quizService: QuizService) {}

  ngOnInit() {}
}
