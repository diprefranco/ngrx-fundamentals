import { createReducer, on } from "@ngrx/store";
import { ProductsAPIActions, ProductsPageActions } from "./products.action";
import { Product } from "../product.model";

export interface ProductsState {
  showProductCode: boolean;
  loading: boolean;
  products: Product[];
  errorMessage: string;
}

const initialState: ProductsState = {
  showProductCode: true,
  loading: false,
  products: [],
  errorMessage: ''
}

export const productsReducer = createReducer(
  initialState,

  on(ProductsPageActions.toggleShowProductCode, (state) => ({
    ...state,
    showProductCode: !state.showProductCode
  })),

  on(ProductsPageActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    products: [],
    errorMessage: ''
  })),
  on(ProductsAPIActions.productsLoadedSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products
  })),
  on(ProductsAPIActions.productsLoadedFail, (state, { message }) => ({
    ...state,
    products: [],
    errorMessage: message,
    loading: false
  })),

  on(ProductsPageActions.addProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),
  on(ProductsAPIActions.productsAddedSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: [...state.products, product] //we must never mutate the returned state. Using push here to push the new product onto the array, essentially mutating it, will not work and break the principle of immutability. You should always return all new state slices.
  })),
  on(ProductsAPIActions.productsAddedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),

  on(ProductsPageActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),
  on(ProductsAPIActions.productsUpdatedSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: state.products.map(existingProduct => existingProduct.id === product.id ? product : existingProduct) //we're using the non‑mutation map array method to make sure we return a new slice of state.
  })),
  on(ProductsAPIActions.productsUpdatedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),

  on(ProductsPageActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),
  on(ProductsAPIActions.productsDeletedSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    products: state.products.filter(existingProduct => existingProduct.id !== id) //we're using the non‑mutation filter array method to make sure we return a new slice of state.
  })),
  on(ProductsAPIActions.productsDeletedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  }))
)
