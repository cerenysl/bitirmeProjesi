import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../store/auth-context';
import { Rating } from 'react-native-ratings'; // Yıldız derecelendirme kütüphanesi

export default function CommentScreen({ route, navigation }) {
  const { placeId } = route.params;
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});
  const { token } = useContext(AuthContext);
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  useEffect(() => {
    const loadUserEmail = async () => {
      const email = await AsyncStorage.getItem('user_email');
      setCurrentUserEmail(email);
    };

    loadUserEmail();
  }, []);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const storedComments = await AsyncStorage.getItem(`comments_${placeId}`);
        if (storedComments) {
          setComments(JSON.parse(storedComments));
        }
      } catch (error) {
        console.error('Error loading comments:', error);
      }
    };

    loadComments();
  }, [placeId]);

  const saveCommentsToStorage = async (commentsData) => {
    try {
      await AsyncStorage.setItem(`comments_${placeId}`, JSON.stringify(commentsData));
    } catch (error) {
      console.error('Error saving comments:', error);
    }
  };

  const addComment = async () => {
    try {
      const currentUserEmail = await AsyncStorage.getItem('user_email');
      const updatedComments = [...comments, { id: Date.now().toString(), comment: newComment, rating: Number(newRating), userEmail: currentUserEmail }];
      setComments(updatedComments);
      await saveCommentsToStorage(updatedComments);
      setNewComment('');
      setNewRating(0);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const editComment = async () => {
    try {
      const updatedComments = comments.map(comment => {
        if (comment.id === editCommentId) {
          return { ...comment, comment: newComment, rating: Number(newRating) };
        } else {
          return comment;
        }
      });
      setComments(updatedComments);
      await saveCommentsToStorage(updatedComments);
      setEditMode(false);
      setNewComment('');
      setNewRating(0);
      setEditCommentId(null);
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleEdit = (commentId, initialComment, initialRating) => {
    setEditMode(true);
    setEditCommentId(commentId);
    setNewComment(initialComment);
    setNewRating(initialRating);
  };

  const deleteComment = async (commentId) => {
    try {
      const updatedComments = comments.filter(comment => comment.id !== commentId);
      setComments(updatedComments);
      await saveCommentsToStorage(updatedComments);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const calculateAverageRating = () => {
    if (comments.length === 0) {
      return 0;
    }

    const totalRating = comments.reduce((sum, comment) => {
      if (!isNaN(comment.rating)) {
        return sum + parseFloat(comment.rating);
      } else {
        return sum;
      }
    }, 0);

    return (totalRating / comments.length).toFixed(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Yorumlar:</Text>
      {comments.map((comment, index) => (
        <Pressable
          key={index}
          onPress={() => {
            setSelectedComment(comment);
            setShowModal(true);
          }}
          disabled={comment.userEmail !== currentUserEmail} // Yalnızca kendi yorumlarını seçilebilir yap
        >
          <View style={styles.commentContainer}>
            <Text style={styles.commentEmail}>{comment.userEmail.replace(/@.*$/, '@*****')}</Text>
            <Text style={styles.comment}>{comment.comment}</Text>
            <Rating
              imageSize={20}
              readonly
              startingValue={comment.rating}
            />
          </View>
        </Pressable>
      ))}
      <Text style={styles.averageRating}>Ortalama Puan: {calculateAverageRating()}</Text>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalComment}>{selectedComment.comment}</Text>
            <Rating
              imageSize={20}
              readonly
              startingValue={selectedComment.rating}
            />
            {token && <Text style={styles.modalUser}>Kullanıcı: {selectedComment.userEmail}</Text>}
            {selectedComment.userEmail === currentUserEmail && (
              <View style={styles.modalButtons}>
                <Button color="#C8A2C8" title="Düzenle" onPress={() => { handleEdit(selectedComment.id, selectedComment.comment, selectedComment.rating); setShowModal(false); }} />
                <Button color="#C8A2C8" title="Sil" onPress={() => { deleteComment(selectedComment.id); setShowModal(false); }} />
              </View>
            )}
            <Button color="#C8A2C8" title="Kapat" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
      {editMode ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Yorumunuzu düzenleyin"
            value={newComment}
            onChangeText={(text) => setNewComment(text)}
          />
          <Rating
            imageSize={20}
            startingValue={newRating}
            onFinishRating={(rating) => setNewRating(rating)}
          />
          <Button color="#C8A2C8" title="Kaydet" onPress={editComment} />
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            color="#000" 
            placeholder="Yorumunuzu girin"
            value={newComment}
            onChangeText={(text) => setNewComment(text)}
          />
          <Rating
            imageSize={20}
            startingValue={newRating}
            onFinishRating={(rating) => setNewRating(rating)}
          />
          <Button color="#C8A2C8" title="Yorum Ekle" onPress={addComment} />
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5DC',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentContainer: {
    backgroundColor: '#C8A2C8',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  comment: {
    fontSize: 16,
  },
  commentEmail: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  user: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  averageRating: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalComment: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalUser: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  editContainer: {
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 20,
  },
  textInput: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
  },
});
