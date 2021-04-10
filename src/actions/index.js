import * as Types from "../constants/ActionTypes";

export const actSearchProduct = keyword => {
  return {
    type: Types.SEARCH,
    keyword
  };
};
