import { Category } from "../generated/client";
import { CategoryDataHolder } from "../types";


export class TreeDataUtils {
  /**
   * Construct tree data for category provider
   *
   * @param categories list of categories
   * @returns promise with type CategoryDataHolder
   */
  public static constructTreeData = (categories: Category[]): CategoryDataHolder[] => {
    const rootCategories = categories.filter(category => !category.parentCategoryId);
    return TreeDataUtils.constructSingleLayer(categories, rootCategories);
  };

  /**
   * Construct single tree layer
   *
   * @param categories list of categories
   * @param parentCategories parent categories
   * @returns promise with type CategoryDataHolder
   */
  public static constructSingleLayer = (categories: Category[], parentCategories: Category[]): CategoryDataHolder[] => {

    return parentCategories.map(category => {
      const childCategories = categories.filter(c => c.parentCategoryId === category.id);

      return {
        category: category,
        childCategories: childCategories.length > 0 ?
          TreeDataUtils.constructSingleLayer(categories, childCategories) :
          []
      } as CategoryDataHolder;
    });
  };
}