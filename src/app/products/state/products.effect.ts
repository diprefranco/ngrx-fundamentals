import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsService } from "../products.service";
import { ProductsAPIActions, ProductsPageActions } from "./products.action";
import { catchError, concatMap, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class ProductEffects {

  ngrxOnInitEffects() {
    return ProductsPageActions.loadProducts();
  }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      exhaustMap(() =>
        this.productsService.getAll().pipe(
          map((products) => ProductsAPIActions.productsLoadedSuccess({ products })),
          catchError((error) => of(ProductsAPIActions.productsLoadedFail({ message: error })))
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.addProduct),
      mergeMap(({ product }) =>
        this.productsService.add(product).pipe(
          map((newProduct) => ProductsAPIActions.productsAddedSuccess({ product: newProduct })),
          catchError((error) => of(ProductsAPIActions.productsAddedFail({ message: error })))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.updateProduct),
      concatMap(({ product }) =>
        this.productsService.update(product).pipe(
          map(() => ProductsAPIActions.productsUpdatedSuccess({ product })),
          catchError((error) => of(ProductsAPIActions.productsUpdatedFail({ message: error })))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productsService.delete(id).pipe(
          map(() => ProductsAPIActions.productsDeletedSuccess({ id })),
          catchError((error) => of(ProductsAPIActions.productsDeletedFail({ message: error })))
        )
      )
    )
  );

  redirectToProductsPage = createEffect(
    () => this.actions$.pipe(
      ofType(
        ProductsAPIActions.productsAddedSuccess,
        ProductsAPIActions.productsUpdatedSuccess,
        ProductsAPIActions.productsDeletedSuccess
      ),
      tap(() => this.router.navigate(['/products']))
    ),
    { dispatch: false } //the effect will listen for certain actions and do some work but it will not be returning new actions, as all we want to do is listen for success actions and navigate and not trigger more actions. 
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private router: Router
  ) { }
}
