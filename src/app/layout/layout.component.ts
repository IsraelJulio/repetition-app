import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { QuizService } from '../service/quiz.service';
import { Quiz } from '../domain/quiz';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  items: MenuItem[] = [];
  quizItens: MenuItem[] = [];
  quizzes: Quiz[] = [];
  constructor(private quizService: QuizService) {}
  async ngOnInit() {
    this.quizzes = await lastValueFrom(this.quizService.get());

    this.quizzes.forEach((quiz) => {
      let menuItem: MenuItem = {};
      menuItem.label = quiz.title;
      menuItem.icon = 'pi pi-fw pi-plus';
      menuItem.url = `quiz/${quiz.id}`;
      this.quizItens.push(menuItem);
    });

    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            url: 'quiz',
          },
        ],
      },
      {
        label: 'Archieve',
        icon: 'pi pi-fw pi-calendar-times',
        items: [
          {
            label: 'Quiz',
            icon: 'pi pi-fw pi-calendar-minus',
            url: 'home',
            items: this.quizItens,
          },
        ],
      },
    ];
  }
}
