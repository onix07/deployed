const fetchInitialData = ({
  field,
  data,
}: {
  field: string;
  data: Array<any> | object;
}) => {
  return {
    type: "FETCH_INITIAL_DATA",
    payload: {
      field,
      data,
    },
  };
};

export default {
  fetchInitialData,
};
