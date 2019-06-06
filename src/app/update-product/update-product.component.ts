import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../Product';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product: Product;
  updateProductForm: FormGroup;
  updateState: boolean;

  constructor(
    public dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public productService: ProductService,
    private formBuilder: FormBuilder) {
      this.product = data.product;
      this.updateProductForm = this.formBuilder.group({
        name: this.product.name,
        image: this.product.image,
        categories: this.product.categories,
        price: this.product.price,
        date: `${this.product.date.getFullYear()}-${this.product.date.getMonth() < 10 ? "0" + this.product.date.getMonth() : this.product.date.getMonth()}-${this.product.date.getDate() < 10 ? "0" + this.product.date.getDate() : this.product.date.getDate()}`, // CHECK AGAIN
      });
    }

  ngOnInit() {
  }

  getProduct(sku: Number): void {
    this.product = this.productService.get(sku);
  }

  onSubmit(): void {
    let updated = false;
    if (this.updateProductForm.status === 'VALID') {
      if (this.updateProductForm.get('name').value != this.product.name) {
        updated = true;
        this.product.name = this.updateProductForm.get("name").value;
      }
      if (this.updateProductForm.get('image').value != this.product.image) {
        updated = true;
        this.product.image = this.updateProductForm.get("image").value;
      }
      if (this.updateProductForm.get('categories').value != this.product.categories) {
        updated = true;
        this.product.categories = this.updateProductForm.get("categories").value;
      }
      if (this.updateProductForm.get('price').value != this.product.price) {
        updated = true;
        this.product.price = this.updateProductForm.get("price").value;
      }
      if (this.updateProductForm.get('date').value != this.product.date) {
        updated = true;
        this.product.date = new Date(this.updateProductForm.get("date").value);
      }
  
      if (updated) {
        this.productService.updateProduct(this.product);
      }
      this.updateState = true;
    }
  }

}
