import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { QuizService } from '../service/quiz.service';
import { Quiz } from '../domain/quiz';
import { lastValueFrom } from 'rxjs';
import { CategoryService } from '../service/category.service';
import { Category } from '../domain/category';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  items: MenuItem[] = [];
  quizItens: MenuItem[] = [];
  categoryItens: MenuItem[] = [];
  quizzes: Quiz[] = [];
  categories: Category[] = [];
  constructor(
    private quizService: QuizService,
    private categoryService: CategoryService
  ) {}
  async ngOnInit() {
    this.quizzes = await lastValueFrom(this.quizService.get());
    this.categories = await lastValueFrom(
      this.categoryService.getAvailableCategory()
    );

    this.quizzes.forEach((quiz) => {
      let menuItem: MenuItem = {};
      menuItem.label = quiz.title;
      menuItem.icon = 'pi pi-file-o';
      menuItem.url = `quiz/${quiz.id}`;
      menuItem.id = quiz.id.toString();
      this.quizItens.push(menuItem);
    });

    this.categories.forEach((category) => {
      let menuItem: MenuItem = {};
      menuItem.label = category.name;
      menuItem.icon = 'pi pi-tags';
      menuItem.id = category.id.toString();
      this.categoryItens.push(menuItem);
    });

    this.items = [
      {
        label: 'Play',
        icon: 'pi pi-android',
        items: [
          {
            label: 'Quiz',
            icon: 'pi pi-file-o',
            items: this.quizItens.map((item) => {
              return { ...item, url: `play/${item.id}` };
            }),
          },
          {
            label: 'Category',
            icon: 'pi pi-sitemap',
            url: 'category',
            items: [
              {
                label: 'Top 10',
                icon: 'pi pi-clock',
                items: this.categoryItens.map((item) => {
                  return {
                    ...item,
                    url: `play/${item.id}/top/10/category/${item.id}`,
                  };
                }),
              },
              {
                label: 'Top 25',
                icon: 'pi pi-clock',
                items: this.categoryItens.map((item) => {
                  return {
                    ...item,
                    url: `play/${item.id}/top/25/category/${item.id}`,
                  };
                }),
              },
              {
                label: 'Top 50',
                icon: 'pi pi-clock',
                items: this.categoryItens.map((item) => {
                  return {
                    ...item,
                    url: `play/${item.id}/top/50/category/${item.id}`,
                  };
                }),
              },
              {
                label: 'Top 100',
                icon: 'pi pi-clock',
                items: this.categoryItens.map((item) => {
                  return {
                    ...item,
                    url: `play/${item.id}/top/100/category/${item.id}`,
                  };
                }),
              },
            ],
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
