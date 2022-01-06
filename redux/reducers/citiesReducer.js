const initialState = {
    cities:[],
    auxiliar:[],
    loading:true,
}

const citiesReducer = (state = initialState,action) => {
    switch(action.type){
        case 'GET_CITIES':
            return{
                ...state,
                cities: action.payload,
                auxiliar: action.payload,
                loading:false
            }
        case 'FILTER_CITIES':
            let filtrado = action.payload.cities.filter((city => city.title.toLowerCase().startsWith(action.payload.value.toLowerCase().trim())))
            return{
                ...state,
                auxiliar: filtrado,
            }
        
        default:
            return state
    }
}

export default citiesReducer