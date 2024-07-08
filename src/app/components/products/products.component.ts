import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plant } from 'src/app/models/plant';
import { PlantService } from 'src/app/services/plant.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: Plant[] = [];

  id: number = 0;

  currentProduct: Plant = new Plant();

  constructor(private plantService: PlantService, private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadProducts();

    const routeId = this.activatedRoute.snapshot.paramMap.get("id") ?? "";
    this.id = parseInt(routeId);
    this.plantService.viewProductById(this.id).subscribe(foundProduct => {
      console.log(foundProduct);
      this.currentProduct = foundProduct;
    });
  }

  onDelete(id: number) {
    this.plantService.removeProductById(id).subscribe(response => {
      console.log(response);
      this.loadProducts();
    })
  }

  loadProducts() {
    this.plantService.getAllProducts().subscribe(foundProducts => {
      console.log(foundProducts);
      this.productList = foundProducts;
    })
  }

  onClick() {
    this.plantService.getLowtoHigh().subscribe(foundProducts => {
      this.productList = foundProducts;
    })
  }

  // onClick() {
  //   this.plantService.getHightoLow().subscribe(foundProducts => {
  //     this.productList = foundProducts;
  //   })
  // }

  sortProducts(sortBy: string) {
    this.http.get<any[]>(`http://localhost:3000/plants?_sort=itemPrice&_order=${sortBy}`).subscribe(foundProducts => {
      this.productList = foundProducts;
    });
  }
}
