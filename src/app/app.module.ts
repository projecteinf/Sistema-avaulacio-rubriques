import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './projecte/components/header/header.component';
import { RowComponent } from './projecte/components/row/row.component';
import { CellComponent } from './projecte/components/cell/cell.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RowComponent,
    CellComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
