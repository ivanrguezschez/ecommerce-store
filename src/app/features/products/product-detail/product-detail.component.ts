import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, OnInit, Signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ProductService } from '@api/product.service';
import { Product } from '@models/product.interface';
import { RatingComponent } from '@shared/components/rating/rating.component';
import { CartStore } from '@shared/store/shoping-cart.store';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, RatingComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export default class ProductDetailComponent implements OnInit {

  private readonly _productService = inject(ProductService);
  //private readonly _sanitizer = inject(DomSanitizer);

  productId = input<number>(0, { alias: 'id'});
  product!: Signal<Product | undefined>;
  starArray: number[] = new Array(5).fill(0);
  cartStore = inject(CartStore);

  ngOnInit(): void {
    this.product = this._productService.findById(this.productId());
  }

  onAddToCart(): void {
    this.cartStore.addToCart(this.product() as Product);
  }

  /*
  generateStarSvg(index: number): SafeHtml {
    let svgContent = null;
    const rate = this.product()?.rating.rate as number;

    if (index + 1 <= Math.floor(rate)) {
      svgContent = `
        <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-gray-500" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>`;
    } else if (index < rate) {
      svgContent = `
        <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-gray-500" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="partialFillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" style="stop-color:currentColor; stop-opacity:1" />
              <stop offset="50%" style="stop-color:currentColor; stop-opacity:0" />
            </linearGradient>
          </defs>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#partialFillGradient)"></path>
        </svg>
      `
    } else {
      svgContent = `
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-gray-500" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
        `;
    }

    return this._sanitizer.bypassSecurityTrustHtml(svgContent);
  }
  */
}
