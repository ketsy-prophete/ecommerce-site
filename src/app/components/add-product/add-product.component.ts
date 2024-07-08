import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plant } from 'src/app/models/plant';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  newProduct: Plant = new Plant();

  constructor(private plantService: PlantService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit() {
    this.plantService.addNewProduct(this.newProduct).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl("/products")
    });
  }
}
