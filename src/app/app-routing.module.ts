import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { PlayComponent } from './play/play.component';
import { CategoryComponent } from './category/category.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductComponent } from './product/product.component';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [{ path: '', component: MyOrdersComponent }],
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
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
