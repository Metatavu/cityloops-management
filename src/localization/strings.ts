import LocalizedStrings, { LocalizedStringsMethods } from "localized-strings";

/**
 * Interface describing localized strings
 */
export interface IStrings extends LocalizedStringsMethods {

  comingSoon: string;
  browseProducts: string;

  /**
   * Translations related to error dialog
   */
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

  /**
   * Translations related to errors
   */
  error: {
    emptyField: string;
    invalidEmail: string;
    itemNotFound: string;
  };

  /**
   * Translations for generic dialogs
   */
  genericDialog: {
    confirm: string;
    cancel: string;
    save: string;
    delete: string;
    add: string;
  };

  /**
   * Generic translations
   */
  generic: {
    selectLanguage: string;
    yes: string;
    no: string;
    successfulOperation: string;
    close: string;
    add: string;
    save: string;
    delete: string;
    edit: string;
    cancel: string;
    clear: string;
    loadNew: string;
    name: string;
    type: string;
    defaultText: string;
    defaultValue: string;
    mandatoryField: string;
    customConfirmDelete: string;
    confirmDeleteText: string;
    or: string;
    undefined: string;
    refresh: string;
    search: string;
    imageAlt: string;
    proceed: string;
    dataChanged: string;
    noPermissions: string;
    saveSuccessful: string;
    saveError: string;
    fetching: string;
  };

  /**
   * Translations related to search
   */
  search: {
    category: string;
    agency: string;
    noFilter: string;
    type: string;
  };

  /**
   * Translations related to items
   */
  items: {
    title: string;
    item: string;
    addItem: string;
    addPosting: string;
    newPosting: string;
    editPosting: string;
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
    createdAt: string;
    deletionSuccessful: string;
    deletionError: string;
    returnToFrontPage: string;
    latest: string;
    addSuccessful: string;
    addError: string;
    navigateToItem: string;
    noItems: string;
    price: string;
    priceUnit: string;
    paymentMethod: string;
    delivery: {
      title: string;
      yes: string;
      no: string;
    };
    deliveryPrice: string;
    noDeliveryPrice: string;
    showAsList: string;
    showAsGrid: string;
    renew: string;
    renewSuccessful: string;
    userInfo: string;
  };

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
    contactInformation: string;
    changePassword: string;
    businessId: string;
    officeInfo: string;
    confirmTerms: string;
    privacyPolicies: string;
    description: string;
    logo: string;
  };

  /**
   * Translations related to categories
   */
  categories: {
    title: string;
    category: string;
    addCategory: string;
    addSubCategory: string;
    movables: string;
    buildingMaterials: string;
    soilAndRockMaterials: string;
    noProperties: string;
    newProperty: string;
    addProperty: string;
    propertyTypes: {
      text: string;
      textarea: string;
      number: string;
    };
  };

  /**
   * Translations related to adding items
   */
  addItem: {
    chooseCategory: string;
    chooseCategoryInstructions: string;
  };

  /**
   * Translations related to user page
   */
  userPage: {
    categories: string;
    myInfo: string;
    myProducts: string;
    searchHounds: string;
    noUserItems: string;
  };

  /**
   * Translations related to search hounds
   */
  searchHounds: {
    searchHound: string;
    newHound: string;
    addSearchHound: string;
    category: string;
    minPrice: string;
    maxPrice: string;
    notificationOn: string;
    expires: string;
    noHounds: string;
    activeHounds: string;
  };

  /**
   * Translations related to footer contents
   */
  footer: {
    privacyStatement: string;
    copyRight: string;
    infoLink: string;
    eu: {
      text1: string;
      disclaimer: string;
      text2: string;
    };
  };

  /**
   * Translations related to info page contents
   */
  info: {
    title: string;
    first: string;
    second: string;
    third: string;
    fourth: string;
    thisLink: string;
    companies: {
      materiaalitori: string;
      purkutori: string;
      purkukolmio: string;
      kiertonet: string;
    };
  };
}

const strings: IStrings = new LocalizedStrings({
  en: require("./en.json"),
  fi: require("./fi.json")
});

export default strings;