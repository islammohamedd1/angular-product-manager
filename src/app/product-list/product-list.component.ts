import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../Product';
import { PRODUCTS } from '../mock-products';
import { MatDialog } from '@angular/material';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { ProductService } from '../product.service';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  displayedColumns: string[] = ['sku', 'name', 'categories', 'price', 'date', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog, private productsService: ProductService) {
    this.dataSource = new MatTableDataSource();
    this.getProducts();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProducts(): void {
    this.products = this.productsService.getAll();
    this.dataSource.data = this.products;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showDetails(p: Product): void {
    const product: Object = PRODUCTS.find(prod => prod == p);
    this.dialog.open(ProductDetailsComponent, { data: product, maxWidth: '100%' });
  }

  addProductClicked(): void {
    this.dialog.open(AddProductComponent, { minWidth: '60%' });
  }

  updateClicked(product: Product): void {
    const dialogRef = this.dialog.open(UpdateProductComponent, {minWidth: '60%', data: {product}});
    dialogRef.afterClosed().subscribe(r => {this.getProducts()});
  }

  deleteClicked(sku: Number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {minWidth: '60%', data: {sku}});
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.productsService.deleteProduct(sku);
        this.getProducts();
      }
    });
  }

}
