import { createActionGroup, emptyProps } from "@ngrx/store";

export const ProductsPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    'Toggle Show Product Code': emptyProps()
  }
});
