import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Css/chat.css";
import firebase from "../firebase";
import Message from "./Message";
import { useHistory } from "react-router-dom";

const Chat = () => {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [value, setValue] = useState("");
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const [displayName, setDisplayName] = useState("");
  const [url, setUrl] = useState("");
  const [input, setInput] = useState("");

  ///create post//
  const addPost = (e) => {
    e.preventDefault();
    if (input) {
      firebase
        .firestore()
        .collection("rooms")
        .doc(roomId)
        .collection("posts")
        .add({
          name: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
    }
  };

  useEffect(() => {
    if (roomId) {
      firebase
        .firestore()
        .collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomDetails(snapshot.data()?.name);
        });
    }
    firebase
      .firestore()
      .collection("rooms")
      .doc(roomId)
      .collection("posts")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => {
            return {
              name: doc.data().name,
              id: doc.id,
              timestamp: doc.data()?.timestamp,
            };
          })
        );
      });

    var user = firebase.auth().currentUser;
    if (user) {
      setDisplayName(user.displayName);
      setUrl(user.photoURL);
    }
  }, [roomId]);

  // console.log(posts)

  const submit = (e) => {
    e.preventDefault();
    if (roomId) {
      if (value) {
        firebase
          .firestore()
          .collection("rooms")
          .doc(roomId)
          .collection("messages")
          .add({
            image: url,
            message: value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: displayName,
          });
      }
    }
    setValue("");
  };

  const selectPost = (post) => {
    // console.log(post.id)
    history.push(`/rooms/${roomId}/${post.id}`);
  };

  //console.log(value)
  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: "4" }}>
      <div className="mt-5 ml-2">
        <p className="h3">Chat Section</p>
        <strong className="mt-5"># {roomDetails}</strong>
        <Message roomId={roomId} />
        <form className="App float-left">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Comment here"
          ></input>
          <button
            type="submit"
            onClick={(e) => submit(e)}
            style={{ display: "none" }}
          >
            send
          </button>
        </form>
        <hr></hr>
        <p className="h3 mt-5">Post Section </p>
        {posts.map((post, id) => {
          return (
            <p
              style={{
                background: "#83a1cc",
                borderBlockStyle: "double",
                cursor: "pointer",
                width: "50%",
              }}
              key={id}
              onClick={() => selectPost(post)}
              className="h6"
            >
              {post.name} ?
            </p>
          );
        })}
        <form className="App float-left">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Post your question here"
          ></input>
          <button type="submit" onClick={(e) => addPost(e)}>
            create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
