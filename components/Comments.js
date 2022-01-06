import React, { useEffect, useState } from "react"
import { Text, StyleSheet, Pressable, ImageBackground, View, ScrollView } from 'react-native'
import { connect } from "react-redux"
import itinerariesActions from "../redux/actions/itinerariesActions"
import Comment from "./Comment"


const Comments = (props) => {

    const {deleteComment, editComment, comments, setComments, itineraryId} = props
    const [render, setRender] = useState(false)

    
    const deleteConfirmation = async (itinerary_id, commentId, token) => {
        try{
            let response = await deleteComment (itinerary_id, commentId, token)
            if(response.success) setComments(comments.filter(comment => comment._id !== commentId))
            else {
                throw new Error
            }
        } catch (e) {
            console.log(e)
        }
    }

    const editConfirmation = (commentId, comment, token) => {
        editComment(commentId, comment, token)
        .then((res) => {
            if(res.success){
                comments.forEach((singleComment) => {
                    if(singleComment._id === commentId) {
                        comment.comment = singleComment
                    }
                })
                setComments(comments)
                setRender(!render)
            }
        })
        .catch((error) => console.log(error))
    }

  return(
    <>
        <View>
            <ScrollView style={styles.commentContainer} vertical={true}>
                {props.comments.map(comment =>{
                    return(
                        <Comment key={comment._id} updateComment={editConfirmation} deleteComment={deleteConfirmation} comment={comment} itineraryId={itineraryId} render={render}/>
                    )
                })}
            </ScrollView>
        </View>
    </>  
  )
}

const mapDispatchToProps = {
    deleteComment: itinerariesActions.deleteComment,
    editComment: itinerariesActions.editComment
}    

export default connect(null, mapDispatchToProps)(Comments)

const styles = StyleSheet.create({
    commentContainer:{
        height: 280,
        padding: 15,
    }, 
})