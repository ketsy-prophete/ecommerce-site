import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plant } from 'src/app/models/plant';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  productList: Plant[] = [];

  id: number = 0;

  currentProduct: Plant = new Plant();

  constructor(private plantService: PlantService, private activatedRoute: ActivatedRoute, private router: Router) { }

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
      this.router.navigateByUrl("/products")
    });
  }

  loadProducts() {
    this.plantService.getAllProducts().subscribe(foundProducts => {
      console.log(foundProducts);
      this.productList = foundProducts;
    })
  }
}
