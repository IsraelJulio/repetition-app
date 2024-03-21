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
      menuItem.icon = 'pi pi-file-o';
      menuItem.url = `quiz/${quiz.id}`;
      menuItem.id = quiz.id.toString();
      this.quizItens.push(menuItem);
    });

    this.items = [
      {
        label: 'Play',
        icon: 'pi pi-android',
        items: [
          {
            label: 'Games',
            icon: 'pi pi-fw pi-plus',
            items: this.quizItens.map((item) => {
              return { ...item, url: `play/${item.id}` };
            }),
          },
        ],
      },
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              { label: 'Quiz', icon: 'pi pi-file-o', url: 'quiz' },
              { label: 'Category', icon: 'pi pi-sitemap', url: 'category' },
            ],
          },
        ],
      },
      {
        label: 'Archieve',
        icon: 'pi pi-fw pi-calendar-times',
        items: [
          {
            label: 'Edit Quiz',
            icon: 'pi pi-fw pi-calendar-minus',
            url: 'home',
            items: this.quizItens,
          },
        ],
      },
    ];
  }
}
