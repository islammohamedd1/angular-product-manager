import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListComponent } from './product-list/product-list.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatPaginatorModule, MatSortModule, MatTableModule, MatFormFieldModule,
  MatInputModule, MatCardModule, MatDialogModule, MatButtonModule, MatListModule } from '@angular/material';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailsComponent,
    AddProductComponent,
    UpdateProductComponent,
    ConfirmDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatPaginatorModule, MatSortModule, MatTableModule, MatFormFieldModule,
    MatInputModule, MatCardModule, MatDialogModule, MatButtonModule, MatListModule
  ],
  entryComponents: [ProductDetailsComponent, AddProductComponent, UpdateProductComponent, ConfirmDeleteDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
