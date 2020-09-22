import LocalizedStrings, { LocalizedStringsMethods } from "localized-strings";

/**
 * Interface describing localized strings
 */
export interface IStrings extends LocalizedStringsMethods {

  /**
   * Generic translations
   */
  comingSoon: string;
  errorDialog: {
    title: string;
    reloadPage: string;
    unsavedContents: string;
    reportIssue: string;
    technicalDetails: string;
    time: string;
    url: string;
    errorMessage: string;
    close: string;
    reload: string;
  };

  genericDialog: {
    confirm: string;
    cancel: string;
    save: string;
    delete: string;
    add: string;
  };

  generic: {
    add: string;
    save: string;
    delete: string;
    cancel: string;
    loadNew: string;
    name: string;
    confirmDelete: string;
    or: string;
    undefined: string;
    refresh: string;
  };

  /**
   * Translations related to items
   */
  items: {
    title: string;
    addItem: string;
  }

  /**
   * Translations related to categories
   */
  categories: {
    title: string;
    addCategory: string;
    addSubCategory: string;
  };

}

const strings: IStrings = new LocalizedStrings({
  en: require("./en.json"),
  fi: require("./fi.json")
});

export default strings;