import axios from "axios";

const authActions = {
  fetchCountrys: () => {
    return async (dispatch, getState) => {
      const res = await axios.get("https://restcountries.com/v3.1/all");
      dispatch({ type: "GET_COUNTRYS", payload: res.data });
    };
  },
  registerUser: (email, password, name, surname, imageURL, country, google) => {
    return async (dispatch, getState) => {
      try {
        const user = await axios.post("https://mytinerary-serato.herokuapp.com/api/auth/signup", {
          email,
          password,
          name,
          surname,
          imageURL,
          country,
          google,
        });
        if (user.data.success && !user.data.error) {
          localStorage.setItem("token", user.data.response.token);
          dispatch({
            type: "LOGIN_USER",
            payload: {
              name,
              surname,
              email,
              imageURL,
              country,
              google,
              token: user.data.response.token
            },
          });
        } else {
          return {message:user.data.response.details}
        }
      } catch (error) {
      }
    };
  },
  logInUser: (email, password, google) => {
    return async (dispatch, getState) => {
      try {
        const user = await axios.post("https://mytinerary-serato.herokuapp.com/api/auth/signin", {
          email,
          password,
          google,
        });
        if (user.data.success && !user.data.error) {
          localStorage.setItem("token", user.data.response.token);
          
          dispatch({
            type: "LOGIN_USER",
            payload: {...user.data.response.user,token:user.data.response.token },
          });
        } else {
        }
      } catch (error) {
      }
    };
  },
  signOut: () => {
    return async (dispatch, getState) => {
      dispatch({ type: "LOGOUT_USER" });
    };
  },
  forcedLog: (userLS) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.get(
          "https://mytinerary-serato.herokuapp.com/api/auth/signin",
          {
            headers: {
              Authorization: "Bearer " + userLS.token,
            },
          }
        );
        dispatch({
          type: "LOGIN_USER",
          payload: {
            ...response.data.response,
            token: userLS.token,
          },
        });
      } catch (error) {
        if (!error.response) {
          return 
        } else if (error.response.status === 401) {
          dispatch({ type: "LOG_OUT", payload: null });
        }
      }
    };
  },
  adminAuth:(userLS) => {
    return async(dispatch,getState) => {
      try {
        const response = await axios.get(
          "https://mytinerary-serato.herokuapp.com/api/auth/signin",
          {
            headers: {
              Authorization: "Bearer " + userLS.token,
            },
          }
        );
        if(response.data.response.email === 'admin@gmail.com'){
          dispatch({
            type: "ADMIN",
          });
        }
      } catch (error) {
        
      }
    }
  }
}

export default authActions;