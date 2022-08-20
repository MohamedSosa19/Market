import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products.service';



@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
id:any
data:any={}
  constructor(private _ActivatedRoute:ActivatedRoute,private _ProductsService:ProductsService) {
    
   }

  ngOnInit(): void {
    this.id=this._ActivatedRoute.snapshot.paramMap.get('id');
    this.getDetails()
  }
getDetails(){
  this._ProductsService.getProductById(this.id).subscribe((res)=>{
    this.data=res
  })
}
}
