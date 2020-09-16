import produce from "immer";
import { Item } from "../generated/client";

/**
 * Utility class for generic modification operations
 */
export default class ModifyOperations {

  /**
   * Update item list
   *
   * @param oldList old list to be updated
   * @param newItem new item to be added or updated
   * @returns updated list of items
   */
  public static updateItemList = (oldList: Item[], newItem: Item): Item[] => {
    return produce(oldList, draft => {
      const itemIndex = oldList.findIndex(item => item.id === newItem.id);
      if (itemIndex > -1) {
        draft.splice(itemIndex, 1, newItem);
      } else {
        draft.push(newItem);
      }
    });
  }
}
