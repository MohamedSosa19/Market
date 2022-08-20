import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl:'./cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartProducts:any[]=[]
  total:any=0
  Success:boolean=false


  constructor(private _CartService:CartService) { }

  getCartsProduct(){
    if("cart"in localStorage){
      this.cartProducts=JSON.parse(localStorage.getItem("cart")!)
  }
  this.getCartTotal()
}



  getCartTotal(){
    this.total=0
    for(let x in this.cartProducts){
      this.total+=this.cartProducts[x].item.price*this.cartProducts[x].quantity
    }

  }
  addAmount(index:number){
    this.cartProducts[index].quantity++;
    this.getCartTotal();
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));

  }
  minsAmount(index:number){
    this.cartProducts[index].quantity--;
    this.getCartTotal();
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));
  }
  detectChange(){
    this.getCartTotal();
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));
  }
  deleteProduct(index:number){
    this.cartProducts.splice(index,1);
    this.getCartTotal();
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));



  }
  clearCart(){
    this.cartProducts=[];
    this.getCartTotal();
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));
  }

  addCart(){
    let product=this.cartProducts.map(item=>{
      return {productId:item.item.id,quantity:item.quantity}
    })
    let Model={
      userId:4,
      date:new Date(),
      products:product
    }
    this._CartService.createNewProduct(Model).subscribe((res)=>{
      this.Success=true

    })
  }

  ngOnInit(): void {
    this.getCartsProduct()
  }

}
