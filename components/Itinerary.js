import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  View,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import Comments from "./Comments";
import { showMessage, hideMessage } from "react-native-flash-message";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Itinerary = (props) => {
  const [visible, setVisible] = useState(false);
  const [comentaries, setComentaries] = useState([]);
  const [inputComment, setInputComment] = useState({ comment: "" });
  const [likesArray, setLikeArray] = useState(Itinerary.like);
  const [likeNumber, setLikeNumber] = useState(Itinerary.like.length);
  const [like, setLike] = useState(
    user && likesArray.find((like) => like.user === userData._id)
  );
  const {
    likeItinerary,
    userData,
    getCommentaries,
    Itinerary,
    user,
    editComment,
    deleteComment,
  } = props;

  const handleLike = (itineraryId) => {
    if (user) {
      likeItinerary(itineraryId, userData, like).then((res) => {
        setLikeArray(res.response);
        setLikeNumber(res.response.length);
        setLike(!like);
      });
    } else {
      showMessage({
        message: "You must be logged to like",
        type: "error",
        position: "top",
      });
    }
  };

  const viewMoreLess = () => {
    getCommentaries(Itinerary._id).then((res) => setComentaries(res.response));
    setVisible(!visible);
    props.fetchActivities();
  };

  const handleDelete = (commentId) => {
    deleteComment(userData, commentId).then((res) =>
      setComentaries(res.response)
    );
    showMessage({
      message: "Comment deleted",
      type: "success",
      position: "top",
    });
  };

  const handleEdit = (value, commentId, edit) => {
    if (edit) {
      editComment(userData, commentId, value).then((res) =>
        setComentaries(res.response)
      );
    }
  };

  const inputHandler = (e, campo, value) => {
    setInputComment({
      ...inputComment,
      [campo]: e || value,
    });
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (props.user) {
      if (inputComment.current.value.trim() !== "") {
        props
          .postCommentary(Itinerary._id, inputComment.current.value, userData)
          .then((res) => setComentaries(res.response));
        inputComment.current.value = "";
      } else {
        showMessage({
          message: "Type something first!",
          type: "error",
          position: "top",
        });
      }
    } else {
      showMessage({
        message: "You must be logged to comment!",
        type: "error",
        position: "top",
      });
    }
  };

  let arrayActivities = props.activities.filter(
    (activity) => activity.itinerary._id === Itinerary._id
  );

  return (
    <>
      <View style={styles.containAll}>
        <View style={styles.itineraryContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{Itinerary.title}</Text>
          </View>
          <ImageBackground
            resizeMode="cover"
            source={{
              uri: `https://gillone-mytinerary.herokuapp.com/${Itinerary.src}`,
            }}
            style={styles.imageHeader}
          ></ImageBackground>
          <View>
            <View style={styles.profileAndLike}>
              <View style={styles.profile}>
                <Image
                  resizeMode="cover"
                  source={{
                    uri: `${Itinerary.userAvatar}`,
                  }}
                  style={styles.userPic}
                />
                <Text style={styles.authorName}>{Itinerary.user}</Text>
              </View>
              <View style={styles.likes}>
                <Text onPress={() => likeItinerary()}>{condition}</Text>
                <Text>{itinerariesLikes.length}</Text>
              </View>
            </View>
            <View style={styles.descriptionContainer}>
              <View style={styles.hashtagContainer}>
                {Itinerary["hashtags"].map((hashtag) => (
                  <Text style={styles.hashtag}>#{hashtag}</Text>
                ))}
              </View>
              <View style={styles.information}>
                <View>
                  <Text>🕓 {Itinerary.duration} hs</Text>
                </View>
                <View>
                  <Text style={styles.p}>💲</Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            {!visible && (
              <View>
                <Text style={styles.activitiesTitle}>Activities</Text>
                <ScrollView style={styles.carouselActivity} horizontal={true}>
                  {arrayActivities.map((activity) => {
                    return (
                      <View style={styles.activitiesContainer}>
                        <ImageBackground
                          key={activity._id}
                          source={{
                            uri: `${activity.src}`,
                          }}
                          style={styles.activities}
                        />
                        <Text style={styles.activityTitle}>
                          {activity.activity}
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
                <View style={styles.commentContainer}>
                  <ScrollView style={styles.comments}>
                    <Comments
                      id={Itinerary._id}
                      comments={comentaries}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                    />
                  </ScrollView>
                  <View style={styles.containInput}>
                    <TextInput
                      placeholder={
                        props.userToken
                          ? "Leave a coment!"
                          : "You have to log in to comment"
                      }
                      placeholderTextColor="#333333"
                      color="black"
                      style={styles.inputComment}
                      value={inputComment.comment}
                      onChangeText={(e) => inputHandler(e, "comment")}
                    />
                    <Pressable onPress={() => handlePost()}>
                      <Ionicons name="send" size={24} color="black" />
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
            <View style={styles.button}>
              <Pressable onPress={viewMoreLess}>
                <Text style={styles.button}>
                  {collapse ? "View More" : "View Less"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.authReducers.userData,
  };
};

const mapDispatchToProps = {
  fetchActivities: itinerariesActions.fetchActivities,
  likeItinerary: itinerariesActions.likeItinerary,
  postCommentary: itinerariesActions.postCommentary,
};

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);

const styles = StyleSheet.create({
  containAll: {
    width: "100%",
    alignItems: "center",
    padding: 5,
    paddingBottom: 25,
  },

  imageHeader: {
    height: 300,
    width: "100%",
    alignItems: "center",
    overflow: "hidden",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
    marginBottom: 15,
  },

  titleContainer: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 3,
  },

  itineraryContainer: {
    width: "95%",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  hashtagContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    flexDirection: "row",
    padding: 15,
    width: "100%",
    justifyContent: "space-between",
  },

  hashtag: {
    fontSize: 12,
  },

  information: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    marginVertical: 10,
    alignItems: "flex-start",
  },

  carouselActivity: {
    height: 430,
  },

  activityTitle: {
    textAlign: "center",
    fontSize: 20,
  },

  activitiesTitle: {
    textAlign: "center",
    fontSize: 25,
  },

  profileAndLike: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
    alignItems: "center",
  },

  userPic: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },

  send: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },

  profile: {
    flexDirection: "row",
    alignItems: "center",
  },

  authorName: {
    marginLeft: 10,
    fontSize: 18,
  },

  descriptionContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    paddingBottom: 5,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
  },

  title: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },

  description: {
    fontSize: 14,
    marginLeft: 10,
  },

  inputComment: {
    backgroundColor: "lightgrey",
    width: "80%",
    borderRadius: 30,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    fontSize: 15,
  },

  containInput: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  commentContainer: {
    paddingTop: 10,
    paddingBottom: 15,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0.5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 1.5,
    borderRadius: 2,
    marginBottom: 15,
  },

  activities: {
    height: 400,
    width: 350,
    marginRight: 15,
  },

  likes: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 30,
  },

  button: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "underline",
    backgroundColor: "black",
    width: "50%",
    alignSelf: "center",
    paddingVertical: 4,
    borderRadius: 3,
    textDecorationLine: "none",
  },
});
