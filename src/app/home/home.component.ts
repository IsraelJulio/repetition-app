import { Component } from '@angular/core';
import { DataViewLayoutOptions } from 'primeng/dataview';
import { QuizService } from '../service/quiz.service';
import { Quiz } from '../domain/quiz';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private quizService: QuizService, private router: Router) {}
  quizList: Quiz[] = [];
  ngOnInit() {
    this.quizService.get().subscribe({
      next: (response) => {
        console.log(response);
        this.quizList = response;
      },
      error: (error) => {},
    });
  }

  trackByTitle(_: number, item: Quiz): string {
    return item.title;
  }
  play(id: number) {
    this.router.navigate(['/quiz', { id: id }]);
  }
  edit(id: number) {
    this.router.navigate(['quiz', 'quizId', id]);
    console.log(id);
  }
}
