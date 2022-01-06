import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  View,
  Image,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { AntDesign } from '@expo/vector-icons';
const Comment = (props) => {
  const {
    updateComment,
    deleteComment,
    comment,
    itineraryId,
    render,
    user_id,
    token,
  } = props;
  const [changeInput, setChangeInput] = useState(false);
  const [commentRender, setCommentRender] = useState(comment.comment);
  const [newComment, setNewComment] = useState({
    comment: comment.comment,
  });

  useEffect(() => {
    setChangeInput(false);
  }, [render]);

  const changeState = () => {
    setChangeInput(!changeInput);
  };

  const modifyButtons = user_id === comment.userId._id && (
    <View style={styles.modifyComment}>
      <Pressable style={styles.button} onPress={() => changeState()}>
      <AntDesign name="close" size={24} color="black" />
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => deleteComment(itineraryId, comment._id, token)}
      >
        <AntDesign name="delete" size={24} color="black" />
      </Pressable>
    </View>
  );

  const inputHandler = (e, field, value) => {
    setNewComment({
      ...newComment,
      [field]: e || value,
    });
  };

  return (
    <>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 15 }}
      >
        <Image style={styles.userImage} source={{ uri: comment.userId.src }} />
        <View>
          <Text>{comment.userId.firstName}</Text>
        </View>
      </View>
      <View style={styles.commentContainer}>
        {changeInput ? (
          <View style={styles.commentBox}>
            <TextInput
              defaultValue={commentRender}
              color="black"
              onChangeText={(e) => inputHandler(e, "comment")}
              style={styles.inputComment}
            />
            <View style={styles.editionIcons}>
              <Pressable
                onPress={() => {
                  updateComment(comment._id, newComment.comment, token);
                  setCommentRender(newComment.comment);
                }}
              >
                <AntDesign name="check" size={24} color="black" />
              </Pressable>
              <Pressable
                onPress={() => {
                  changeState();
                }}
              >
                <AntDesign name="close" size={24} color="black" />
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.comment}>
            <Text>{commentRender}</Text>
          </View>
        )}
        {modifyButtons && modifyButtons}
      </View>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.authReducer.userData
  };
};

export default connect(mapStateToProps)(Comment);

const styles = StyleSheet.create({
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "lightgrey",
  },

  comment: {
    width: "90%",
    alignSelf: "flex-end",
    height: 35,
    justifyContent: "center",
    backgroundColor: "grey",
    borderTopEndRadius: 25,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    paddingLeft: 15,
    marginTop: 5,
  },

  commentBox: {},

  modifyComment: {
    flexDirection: "row",
    width: "30%",
    height: 50,
    alignSelf: "flex-end",
    paddingBottom: 15,
  },

  button: {
    paddingVertical: 10,
    marginHorizontal: 5,
  },

  inputComment: {
    backgroundColor: "white",
    borderWidth: 1,
    paddingLeft: 15,
    marginLeft: 15,
  },

  commentIcons: {
    width: 25,
    height: 25,
  },

  confirmEdition: {
    width: 25,
    height: 25,
    marginHorizontal: 7,
  },

  editionIcons: {
    flexDirection: "row",
    paddingLeft: 35,
  },
});
