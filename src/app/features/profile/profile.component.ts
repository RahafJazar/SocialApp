import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { OnSalePipe } from '../../shared/pipes/on-sale-pipe';
import { Product } from '../../core/models/product.interface';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, UpperCasePipe, LowerCasePipe, TitleCasePipe, CurrencyPipe, DatePipe,
    SlicePipe, JsonPipe, AsyncPipe, OnSalePipe, SearchPipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  searchValue: string = '';
  myDate = new Date();
  productsList: Product[] = [


    {
      id: 6,
      title: "Woman Bordeaux Long Sleeve Blouse BORDEAUX",
      description: "ShellFabric1 Cotton 65% Polyester 35%",
      imageCover:
        "https://ecommerce.routemisr.com/Route-Academy-products/1680402411833-cover.jpeg",
      price: 499,
      quantity: 228,
      images: [
        "https://ecommerce.routemisr.com/Route-Academy-products/1680402411883-2.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680402411883-3.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680402411883-1.jpeg",
      ],
      onSale: true,
    },
    {
      id: 7,
      title: "Woman Brown Long Sleeve Tunic LT.CAMEL",
      description: "ShellFabric1 Cotton 65% Polyester 35%",
      imageCover:
        "https://ecommerce.routemisr.com/Route-Academy-products/1680402295928-cover.jpeg",
      price: 499,
      quantity: 229,
      images: [
        "https://ecommerce.routemisr.com/Route-Academy-products/1680402296306-3.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680402296305-1.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680402296305-2.jpeg",
      ],
      onSale: false,
    },
    {
      id: 8,
      title: "Woman Standart Fit Knitted Cardigan",
      description:
        "MaterialPolyester Blend\nColour NameBeige\nDepartmentWomen",
      imageCover:
        "https://ecommerce.routemisr.com/Route-Academy-products/1680401893316-cover.jpeg",
      price: 499,
      quantity: 222,
      images: [
        "https://ecommerce.routemisr.com/Route-Academy-products/1680401893496-2.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680401893496-1.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680401893497-4.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680401893496-3.jpeg",
      ],
      onSale: true,
    },
    {
      id: 9,
      title: "Relaxed Fit Knitted Joggers Lilac",
      description:
        "Colour NamePink\nDepartmentWomen\nMaterial CompositionPolyester Blend",
      imageCover:
        "https://ecommerce.routemisr.com/Route-Academy-products/1680401672268-cover.jpeg",
      price: 499,
      quantity: 222,
      images: [
        "https://ecommerce.routemisr.com/Route-Academy-products/1680401672624-2.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680401672623-1.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680401672624-3.jpeg",
      ],
      onSale: false,
    },
    {
      id: 10,
      title: "Woman Socks",
      description:
        "Colour NamePink\nDepartmentWomen\nMaterial CompositionPolyester Blend",
      imageCover:
        "https://ecommerce.routemisr.com/Route-Academy-products/1680401528864-cover.jpeg",
      price: 199,
      quantity: 117,
      images: [
        "https://ecommerce.routemisr.com/Route-Academy-products/1680401528923-1.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680401528924-2.jpeg",
      ],
      onSale: true,
    },
    {
      id: 11,
      title: "Woman Karma Socks Multicolour",
      description:
        "Soft and comfortable cotton fabric\nCrew neck and short sleeves\nComfortable, regular fit\nWash according to care label instructions",
      imageCover:
        "https://ecommerce.routemisr.com/Route-Academy-products/1680401176411-cover.jpeg",
      price: 199,
      quantity: 117,
      images: [
        "https://ecommerce.routemisr.com/Route-Academy-products/1680401176767-2.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680401176766-1.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680401176768-3.jpeg",
      ],
      onSale: false,
    },
    {
      id: 12,
      title: "Logo T-Shirt Green",
      description:
        "Soft and comfortable cotton fabric\nCrew neck and short sleeves\nComfortable, regular fit\nWash according to care label instructions",
      imageCover:
        "https://ecommerce.routemisr.com/Route-Academy-products/1680400287654-cover.jpeg",
      price: 744,
      quantity: 111,
      images: [
        "https://ecommerce.routemisr.com/Route-Academy-products/1680400287765-1.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680400287767-4.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680400287767-3.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680400287765-2.jpeg",
      ],
      onSale: true,
    },
    {
      id: 13,
      title: "Orca Leather Boots Anthracite",
      description:
        "Genuine and smooth leather upper\nSecure lace-ups with side zipper closure\nSlightly cushioned footbed provides comfort\nPatterned chunky outsole provides traction and grip",
      imageCover:
        "https://ecommerce.routemisr.com/Route-Academy-products/1680400120400-cover.jpeg",
      price: 4829,
      quantity: 273,
      images: [
        "https://ecommerce.routemisr.com/Route-Academy-products/1680400120770-2.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680400120771-3.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680400120769-1.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680400120771-4.jpeg",
      ],
      onSale: false,
    },
    {
      id: 14,
      title: "Softride Enzo NXT CASTLEROCK-High Risk R",
      description: "Sole MaterialRubber\nColour NameRED\nDepartmentMen",
      imageCover:
        "https://ecommerce.routemisr.com/Route-Academy-products/1680399913757-cover.jpeg",
      price: 2999,
      quantity: 173,
      images: [
        "https://ecommerce.routemisr.com/Route-Academy-products/1680399913850-1.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680399913851-4.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680399913850-2.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680399913851-3.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680399913851-5.jpeg",
      ],
      onSale: true,
    },
    {
      id: 15,
      title: "ESS Big Logo Hoodie TR Puma Black",
      description: "MaterialCombination\nColour Nameblack\nDepartmentMen",
      imageCover:
        "https://ecommerce.routemisr.com/Route-Academy-products/1680399661234-cover.jpeg",
      price: 2649,
      quantity: 200,
      images: [
        "https://ecommerce.routemisr.com/Route-Academy-products/1680399661306-2.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680399661306-4.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680399661306-3.jpeg",
        "https://ecommerce.routemisr.com/Route-Academy-products/1680399661305-1.jpeg",
      ],
      onSale: false,
    },
  ];

}
