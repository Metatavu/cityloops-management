import strings from "../localization/strings";

// TODO: Add proper confirmation dialog

/**
 * Ask confirmation for anything
 *
 * @param customText custom confirmation text to be displayed
 * @returns returns confirmation value
 */
export const askConfirmation = (customText?: string): boolean => {
  return window.confirm(customText || strings.generic.confirmDeleteText);
};