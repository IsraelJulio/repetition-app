import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
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
  constructor(
    private quizService: QuizService,
    private categoryService: CategoryService
  ) {}
  ngOnInit() {
    this.items = [
      {
        label: 'Meus Pedidos',
        icon: PrimeIcons.CART_PLUS,
        badge: '2',
      },
      {
        label: 'Gestor de cardápio',
        icon: 'pi pi-fw pi-server',
        items: [
          {
            label: 'Produtos',
            icon: PrimeIcons.PENCIL,
            routerLink: ['/product'],
            routerLinkActiveOptions: {
              exact: true,
            },
          },
          {
            label: 'Visualização no app',
            icon: PrimeIcons.TABLET,
          },
          {
            label: 'Criar Pedido',
            icon: PrimeIcons.PLUS,
          },
        ],
      },
      {
        label: 'Cupons',
        icon: PrimeIcons.PERCENTAGE,
      },
      {
        label: 'Meu Desempenho',
        icon: PrimeIcons.CHART_LINE,
      },
      {
        label: 'Fidelidade',
        icon: PrimeIcons.STAR,
      },
      {
        label: 'Robo',
        icon: PrimeIcons.PRIME,
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus',
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
        ],
      },
      {
        label: 'Configurações',
        icon: PrimeIcons.COG,
      },
    ];
  }
}

// items: [
//   {
//     label: 'Nexi',
//     routerLink: ['/report/nexi'],
//     routerLinkActiveOptions: {
//       exact: true
//     },
//     styleClass: 'menucus'
//   },
//   {
//     label: 'Tico',
//     routerLink: ['/report/quisque'],
//     routerLinkActiveOptions: {
//       exact: true
//     },
//     styleClass: 'menucus'
//   }
// ]
