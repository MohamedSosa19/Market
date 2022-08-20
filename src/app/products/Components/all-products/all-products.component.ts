import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products:any[]=[]
  categories:any[]=[]
  loading:boolean=false
  cartProducts:any[]=[]
  constructor(private _ProductsService:ProductsService) { }


  ngOnInit(): void {
    this.getProducts();
    this.getAllCategory();
  }
  getProducts(){
    this.loading=true
    this._ProductsService.getAllProducts().subscribe((res)=>{
      this.products=res;
      this.loading=false
      console.log(res)
    },(error=>{
      alert(error)

    })
    )
    
  }

  getAllCategory(){
    this.loading=true
    this._ProductsService.getAllCategories().subscribe((res=>{
      this.categories=res
      this.loading=false

    }))
  }

  filterCategories(event:any){
    let value=event.target.value;
    (value=="all")?this.getProducts():this.getproductCategory(value)
    
  }
  getproductCategory(keyword:string){
    this.loading=true
    this._ProductsService.getProductByCategory(keyword).subscribe((res)=>{
      this.products=res;
      this.loading=false

    })

  }
  addtoCart(event:any){
    if("cart"in localStorage){
      this.cartProducts=JSON.parse(localStorage.getItem("cart")!)
      let exist=this.cartProducts.find(item=> item.item.id==event.item.id)
      if(exist){
        alert("Product is already in your carts")
      }
      else{
        this.cartProducts.push(event)
        localStorage.setItem("cart",JSON.stringify(this.cartProducts))
      }
    }
    else{
      this.cartProducts.push(event)
      localStorage.setItem("cart",JSON.stringify(this.cartProducts))
    }

  }
}
