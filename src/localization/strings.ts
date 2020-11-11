import LocalizedStrings, { LocalizedStringsMethods } from "localized-strings";

/**
 * Interface describing localized strings
 */
export interface IStrings extends LocalizedStringsMethods {

  /**
   * Generic translations
   */
  browseProducts: string;
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

  error: {
    emptyField: string;
    invalidEmail: string;
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
    clear: string;
    loadNew: string;
    name: string;
    confirmDelete: string;
    or: string;
    undefined: string;
    refresh: string;
    search: string;
    imageAlt: string;
    proceed: string;
  };

  /**
   * Translations related to items
   */
  items: {
    title: string;
    addItem: string;
    addPosting: string;
    newPosting: string;
    postings: string;
    deletePosting: string;
    itemTitle: string;
    images: string;
    location: string;
    locationInfo: {
      address: string;
      description: string;
      email: string;
      phone: string;
    };
  },

  /**
   * Translations related to users
   */
  user: {
    registration: string;
    registrationSuccessful: string;
    login: string;
    loginShort: string;
    logout: string;
    account: string;
    username: string;
    password: string;
    name: string;
    address: string;
    email: string;
    phoneNumber: string;
    isCompanyAccount: string;
    rememberMe: string;
    register: string;
    forgotPassword: string;
  }

  /**
   * Translations related to categories
   */
  categories: {
    title: string;
    addCategory: string;
    addSubCategory: string;
    movables: string;
    buildingMaterials: string;
    soilAndRockMaterials: string;
  };

  /**
   * Translations related to adding items
   */
  addItem: {
    chooseCategory: string;
  };

}

const strings: IStrings = new LocalizedStrings({
  en: require("./en.json"),
  fi: require("./fi.json")
});

export default strings;