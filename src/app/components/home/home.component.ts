import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/models/plant';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: Plant[] = [];
  displayLimit: number = 3;

  constructor(private plantService: PlantService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.plantService.getAllProducts().subscribe(foundProducts => {
      console.log(foundProducts);
      this.productList = foundProducts;
    })
  }
}