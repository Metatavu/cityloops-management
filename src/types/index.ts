import { Category } from "../generated/client";

/**
 * Interface describing an access token
 */
export interface AccessToken {
  token: string;
  userId: string;
}

/**
 * Interface describing an category data holder
 */
export interface CategoryDataHolder {
  category: Category;
  childCategories: CategoryDataHolder[];
}