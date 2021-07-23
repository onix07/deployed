const initialState = {
  dataTest: [],
};
const dataReducers = (state: any = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_INITIAL_DATA":
      return {
        ...state,
        [action.payload.field]: action.payload.data,
      };
    default:
      return state;
  }
};

export default dataReducers;
