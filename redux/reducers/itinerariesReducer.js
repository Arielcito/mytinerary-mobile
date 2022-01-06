const initialState = {
    loading: true,
    itineraries: [],
    comments:[],
    activities:[]
  };
  
  const itinerariesReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_ITINERARIES":
        return {
          ...state,
          itineraries: action.payload,
          loading: false,
        };
      case 'GET_COMMENTS':
        return{
          ...state,
          comments:action.payload.response
        }
      case 'GET_ACTIVITIES':
        return{
          ...state,
          activities: action.payload
        }
      default:
        return state;
    }
  };
  
  export default itinerariesReducer;