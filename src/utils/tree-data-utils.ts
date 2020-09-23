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
 * @param categoriesApi categories api
 * @returns promise with type CategoryDataHolder
 */
export const constructSingleLayer = (allCategories: Category[], categories: Category[]): CategoryDataHolder[] => {

  return categories.map(category => {
    const subCategories = allCategories.filter(c => c.parentCategoryId === category.id);

    return {
      category: category,
      childCategories : subCategories.length > 0 ?
      constructSingleLayer(allCategories, subCategories) :
      []
    } as CategoryDataHolder;
  });
};