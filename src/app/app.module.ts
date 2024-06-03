import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { MenubarModule } from 'primeng/menubar';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { PlayComponent } from './play/play.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { CategoryComponent } from './category/category.component';
import { TableModule } from 'primeng/table';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { BadgeModule } from 'primeng/badge';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';
@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    HomeComponent,
    LayoutComponent,
    PlayComponent,
    CategoryComponent,
    CategoryEditComponent,
    MyOrdersComponent,
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    TagModule,
    RatingModule,
    DataViewModule,
    CardModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProgressBarModule,
    ToastModule,
    TableModule,
    DynamicDialogModule,
    DropdownModule,
    DialogModule,
    BadgeModule,
    SplitterModule,
    PanelModule,
  ],
  providers: [MessageService, DialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
