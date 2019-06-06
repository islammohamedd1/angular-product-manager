import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  newProduct: Product;
  addedState: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    private formBuilder: FormBuilder,
    private productsService: ProductService
    ) {
      this.addedState = false;
      this.addProductForm = formBuilder.group({
        sku: '',
        name: '',
        image: '', // image path
        categories: '',
        price: '',
        date: '',
      });

      console.log(this.addProductForm.errors);
      console.log(this.addProductForm.pristine);
      console.log(this.addProductForm.untouched);
    }

  ngOnInit() {
  }

  onSubmit(): void {
    console.log(this.addProductForm.status);
    if (this.addProductForm.status === 'VALID') {

      //TODO: UPDATE THE CATEGORIES TO BE IN AN ARRAY
      const categories = this.addProductForm.get('categories').value.split(',');
      const newProduct = {
        sku: this.addProductForm.get('sku').value,
        name: this.addProductForm.get('name').value,
        image: this.addProductForm.get('image').value,
        categories: categories,
        price: this.addProductForm.get('price').value,
        date: new Date(this.addProductForm.get('date').value),
      }
      this.productsService.addProduct(newProduct);
      this.addedState = true;
      this.addProductForm.reset();
      this.addProductForm.updateValueAndValidity();
      this.addProductForm.disable();
      // this.addProductForm.;
      console.log(this.addProductForm.controls);
    }
  }

}
