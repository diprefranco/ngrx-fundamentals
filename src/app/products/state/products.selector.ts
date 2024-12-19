import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./products.reducer";
import { sumProducts } from "src/app/utils/sum-products";
import { getRouterSelectors } from "@ngrx/router-store";

const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(
  selectProductsState,
  (productsState) => productsState.products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (productsState) => productsState.loading
);

export const selectProductsShowProductCode = createSelector(
  selectProductsState,
  (productsState) => productsState.showProductCode
);

export const selectProductsErrorMessage = createSelector(
  selectProductsState,
  (productsState) => productsState.errorMessage
);

export const selectProductsTotal = createSelector(
  selectProducts,
  //the signature of the projector function is the same as the sumProducts. So we can just pass the function only.
  // (products) => sumProducts(products)
  sumProducts
);

const { selectRouteParams } = getRouterSelectors(); //we are destructuring a collection of route selectors from NgRx by calling getRouterSelectors.

export const selectProductById = createSelector(
  selectProducts,
  selectRouteParams,
  (products, { id }) => products.find(product => product.id === parseInt(id))
  //we are destructuring the id property from selectRouteParams.
);
