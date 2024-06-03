import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { PlayComponent } from './play/play.component';
import { CategoryComponent } from './category/category.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  {
    path: '',
    component: MyOrdersComponent,
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: 'quiz/:id',
    component: QuizComponent,
  },
  {
    path: 'play',
    component: PlayComponent,
  },
  {
    path: 'play/:id',
    component: PlayComponent,
  },
  {
    path: 'play/:id/top/:top/category/:categoryId',
    component: PlayComponent,
  },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
