import axios from "axios";

const itinerariesActions = {
  fetchItineraries: () => {
    return async (dispatch, getState) => {
      const res = await axios.get("https://mytinerary-serato.herokuapp.com/api/itineraries");
      dispatch({ type: "GET_ITINERARIES", payload: res.data.response });
    };
  },
  likeItinerary: (itineraryId, user, like) => {
    return async (dispatch, getState) => {
      const res = await axios.put(
        "https://mytinerary-serato.herokuapp.com/api/like/" + itineraryId,
        { user, like }
      );
      if (res.data.success) {
        return res.data;
      }
    };
  },
  getCommentaries: (id) => {
      return async (dispatch, getState) => {
        const res = await axios.get(
          "https://mytinerary-serato.herokuapp.com/api/comments/" + id
        );
        if (res.data.success) {
          return res.data
        } else {
          
        }
      };
  },
  postCommentary: ( itineraryId, comment,user) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.post(
          "https://mytinerary-serato.herokuapp.com/api/comments/" + itineraryId,
          {comment,user},
          {
            headers: { Authorization: "Bearer " + user.token },
          }
        );
        if (res.data.success) {
          return res.data
        } else {
          
        }
      } catch {
        console.error("error");
      }
    };
  },

  deleteComment: (user, commentId) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.delete(
          "https://mytinerary-serato.herokuapp.com/api/comments/" + commentId,
          {
            headers: { Authorization: "Bearer " + user.token },
          }
        );
        if (res.data.success) {
          return res.data
        } else {
        }
      } catch {
        console.error("error");
      }
    };
  },

  editComment: (user, commentId, message) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.put(
          "https://mytinerary-serato.herokuapp.com/api/comments/" + commentId,
          {message},
          {
            headers: { Authorization: "Bearer " + user.token },
          }
        );

        if (res.data.success) {
          return res.data
        } else {
        }
      } catch {
        console.error("error");
      }
    };
  },
  fetchActivities: () => {
    return async (dispatch, getState) => {
      const res = await axios.get("https://mytinerary-serato.herokuapp.com/api/activities");
      dispatch({ type: "GET_ACTIVITIES", payload: res.data.response });
    };
  },
};
export default itinerariesActions;