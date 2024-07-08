import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plant } from 'src/app/models/plant';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  id: number = 0;

  currentProduct: Plant = new Plant()

  constructor(private plantService: PlantService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const routeId = this.activatedRoute.snapshot.paramMap.get("id") ?? "";
    this.id = parseInt(routeId);
    this.plantService.viewProductById(this.id).subscribe(foundProduct => {
      console.log(foundProduct);
      this.currentProduct = foundProduct;
    })
  }

  onSubmit() {
    this.plantService.editProductById(this.id, this.currentProduct).subscribe(edittedProduct => {
      console.log(edittedProduct);
      this.router.navigateByUrl("/products");
    })
  }
}