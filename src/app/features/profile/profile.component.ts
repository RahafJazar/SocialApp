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
  username: string = 'Rahaf Jazar'


  changeUserName() {
    this.username = 'alaaa maadi';
    setTimeout(() => {
      this.username = 'dania ff';
    }, 2000);
  }














  // searchValue: string = '';
  // myDate = new Date();
  // productsList: Product[] = [


  //   {
  //     id: 6,
  //     title: "Woman Bordeaux Long Sleeve Blouse BORDEAUX",
  //     description: "ShellFabric1 Cotton 65% Polyester 35%",
  //     imageCover:
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680402411833-cover.jpeg",
  //     price: 499,
  //     quantity: 228,
  //     images: [
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680402411883-2.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680402411883-3.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680402411883-1.jpeg",
  //     ],
  //     onSale: true,
  //   },
  //   {
  //     id: 7,
  //     title: "Woman Brown Long Sleeve Tunic LT.CAMEL",
  //     description: "ShellFabric1 Cotton 65% Polyester 35%",
  //     imageCover:
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680402295928-cover.jpeg",
  //     price: 499,
  //     quantity: 229,
  //     images: [
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680402296306-3.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680402296305-1.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680402296305-2.jpeg",
  //     ],
  //     onSale: false,
  //   },
  //   {
  //     id: 8,
  //     title: "Woman Standart Fit Knitted Cardigan",
  //     description:
  //       "MaterialPolyester Blend\nColour NameBeige\nDepartmentWomen",
  //     imageCover:
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680401893316-cover.jpeg",
  //     price: 499,
  //     quantity: 222,
  //     images: [
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680401893496-2.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680401893496-1.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680401893497-4.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680401893496-3.jpeg",
  //     ],
  //     onSale: true,
  //   },
  //   {
  //     id: 9,
  //     title: "Relaxed Fit Knitted Joggers Lilac",
  //     description:
  //       "Colour NamePink\nDepartmentWomen\nMaterial CompositionPolyester Blend",
  //     imageCover:
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680401672268-cover.jpeg",
  //     price: 499,
  //     quantity: 222,
  //     images: [
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680401672624-2.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680401672623-1.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680401672624-3.jpeg",
  //     ],
  //     onSale: false,
  //   },
  //   {
  //     id: 10,
  //     title: "Woman Socks",
  //     description:
  //       "Colour NamePink\nDepartmentWomen\nMaterial CompositionPolyester Blend",
  //     imageCover:
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680401528864-cover.jpeg",
  //     price: 199,
  //     quantity: 117,
  //     images: [
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680401528923-1.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680401528924-2.jpeg",
  //     ],
  //     onSale: true,
  //   },
  //   {
  //     id: 11,
  //     title: "Woman Karma Socks Multicolour",
  //     description:
  //       "Soft and comfortable cotton fabric\nCrew neck and short sleeves\nComfortable, regular fit\nWash according to care label instructions",
  //     imageCover:
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680401176411-cover.jpeg",
  //     price: 199,
  //     quantity: 117,
  //     images: [
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680401176767-2.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680401176766-1.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680401176768-3.jpeg",
  //     ],
  //     onSale: false,
  //   },
  //   {
  //     id: 12,
  //     title: "Logo T-Shirt Green",
  //     description:
  //       "Soft and comfortable cotton fabric\nCrew neck and short sleeves\nComfortable, regular fit\nWash according to care label instructions",
  //     imageCover:
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680400287654-cover.jpeg",
  //     price: 744,
  //     quantity: 111,
  //     images: [
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680400287765-1.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680400287767-4.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680400287767-3.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680400287765-2.jpeg",
  //     ],
  //     onSale: true,
  //   },
  //   {
  //     id: 13,
  //     title: "Orca Leather Boots Anthracite",
  //     description:
  //       "Genuine and smooth leather upper\nSecure lace-ups with side zipper closure\nSlightly cushioned footbed provides comfort\nPatterned chunky outsole provides traction and grip",
  //     imageCover:
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680400120400-cover.jpeg",
  //     price: 4829,
  //     quantity: 273,
  //     images: [
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680400120770-2.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680400120771-3.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680400120769-1.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680400120771-4.jpeg",
  //     ],
  //     onSale: false,
  //   },
  //   {
  //     id: 14,
  //     title: "Softride Enzo NXT CASTLEROCK-High Risk R",
  //     description: "Sole MaterialRubber\nColour NameRED\nDepartmentMen",
  //     imageCover:
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680399913757-cover.jpeg",
  //     price: 2999,
  //     quantity: 173,
  //     images: [
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680399913850-1.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680399913851-4.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680399913850-2.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680399913851-3.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680399913851-5.jpeg",
  //     ],
  //     onSale: true,
  //   },
  //   {
  //     id: 15,
  //     title: "ESS Big Logo Hoodie TR Puma Black",
  //     description: "MaterialCombination\nColour Nameblack\nDepartmentMen",
  //     imageCover:
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680399661234-cover.jpeg",
  //     price: 2649,
  //     quantity: 200,
  //     images: [
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680399661306-2.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680399661306-4.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680399661306-3.jpeg",
  //       "https://ecommerce.routemisr.com/Route-Academy-products/1680399661305-1.jpeg",
  //     ],
  //     onSale: false,
  //   },
  // ];

}



/*
   <!-- Header -->
        <div class="mb-10 text-center">
            <span class="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                Our Collection
            </span>

            <h1 class="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                Explore Our Products
            </h1>

            <p class="mx-auto mt-3 max-w-2xl text-slate-500">
                Discover our latest fashion products and exclusive offers.
            </p>
        </div>
        <div class=" w-full max-w-md my-3 flex gap-4 items-center ">
            <p class="md:text-2xl/30 font-semibold  ">Search </p>
            <div class="relative">

                <svg class="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
                </svg>

                <input type="search" placeholder="Search..." aria-label="Search" [(ngModel)]="searchValue"
                    class="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" />
            </div>
        </div>
        <!-- Products grid -->
        <div class="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            @for (product of productsList |search:searchValue; track product.id) {
            <article
                class="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <!-- Product image -->
                <div class="relative h-80 overflow-hidden bg-slate-100">
                    <img [src]="product.imageCover" [alt]="product.title | uppercase"
                        class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />

                    <!-- Sale badge -->
                    @if (product.onSale) {
                    <span
                        class="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-md">
                        Sale
                    </span>
                    }

                    <!-- Quantity -->
                    <span
                        class="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow backdrop-blur">
                        {{ product.quantity }} left
                    </span>

                    <!-- Add button overlay -->
                    <div
                        class="absolute inset-x-0 bottom-0 translate-y-full p-4 transition duration-300 group-hover:translate-y-0">
                        <button type="button"
                            class="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-600">
                            Add to Cart
                        </button>
                    </div>
                </div>

                <!-- Product content -->
                <div class="flex flex-1 flex-col p-5">
                    <p class="mb-2 text-xs font-semibold uppercase text-emerald-600">
                        Product #{{ product.id }}
                    </p>
                    <!-- Sale title -->
                    @if (product.onSale) {

                    }
                    <h2 class="line-clamp-2 min-h-14 text-lg font-bold leading-7 text-slate-900"
                        [title]="product.title">
                        {{ product.title | uppercase |onSale : product.onSale? true :false}}
                    </h2>

                    <p class="mt-2 line-clamp-2 whitespace-pre-line text-sm leading-6 text-slate-500"
                        [title]="product.description">
                        {{ product.description }}
                    </p>

                    <!-- Small product images -->
                    <div class="mt-4 flex gap-2">
                        @for (image of product.images.slice(0, 4); track image) {
                        <div
                            class="h-12 w-12 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 transition hover:border-emerald-500">
                            <img [src]="image" [alt]="product.title" class="h-full w-full object-cover" />
                        </div>
                        }
                    </div>
                    <!-- Date -->
                    <p class="my-4"> Date: {{myDate | date: "short" }}</p>
                    <!-- Price -->
                    <div class="mt-auto flex items-end justify-between border-t border-slate-100 pt-5">
                        <div>
                            <p class="text-xs text-slate-400">Price</p>

                            <p class="text-2xl font-extrabold text-slate-900">
                                {{ product.price |currency:'EUR'}}
                                <span class="text-sm font-semibold text-emerald-600">
                                    EGP
                                </span>
                            </p>
                        </div>

                        <button type="button" aria-label="Add product to favorites"
                            class="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-xl text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500">
                            ♡
                        </button>
                    </div>
                </div>
            </article>
            } @empty {
            <div class="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <p class="text-lg font-semibold text-slate-700">
                    No products available
                </p>

                <p class="mt-2 text-sm text-slate-500">
                    Products will appear here when they are added.
                </p>
            </div>
            }
        </div>


*/