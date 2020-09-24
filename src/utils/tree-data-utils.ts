import { Category } from "../generated/client";
import { CategoryDataHolder } from "../types";

/**
 * Construct tree data for category provider
 *
 * @param categories list of categories
 * @returns promise with type CategoryDataHolder
 */
export const constructTreeData = (categories: Category[]): CategoryDataHolder[] => {
  const rootCategories = categories.filter(category => !category.parentCategoryId);
  return constructSingleLayer(categories, rootCategories);
};

/**
 * Construct single tree layer
 *
 * @param categories list of categories
 * @param parentCategories parent categories
 * @returns promise with type CategoryDataHolder
 */
export const constructSingleLayer = (categories: Category[], parentCategories: Category[]): CategoryDataHolder[] => {

  return parentCategories.map(category => {
    const childCategories = categories.filter(c => c.parentCategoryId === category.id);

    return {
      category: category,
      childCategories: childCategories.length > 0 ?
        constructSingleLayer(categories, childCategories) :
        []
    } as CategoryDataHolder;
  });
};
