import {View, Text, TextInput} from "react-native";
import styles from "../../../styles";
import MyButton from "../MyButton";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {chatting, getMessage} from "../../../store/users/userListSlice";

const UserChat = ({route}) => {
  const dispatch = useAppDispatch();
  const companion = route.params;
  const [message, setMessage] = useState("");
  const usersMessage = useAppSelector(state => state.users.message);
  const myEmail = useAppSelector(state => state.users.email);

  useEffect(() => {
    dispatch(getMessage({userEmail: companion.email, myEmail: myEmail}));
  }, []);

  return (
    <View style={styles.userChat}>
      <Text style={styles.userText}>{companion.name}</Text>
      <View style={styles.fieldMessages}>
        {usersMessage.map((users, index) => <View key={index} style={styles.message}>
          <Text style={styles.messageName}>{users.name}</Text>
          <Text style={styles.messageText}>{users.message}</Text>
        </View>)}
      </View>
      <TextInput style={styles.input} value={message} placeholder="Message" onChangeText={setMessage}/>
      <MyButton title="Send" onPress={() => {
        if (message) {
          dispatch(chatting({message: message, name: companion.name, email: companion.email, myEmail: myEmail}));
        }
      }}/>
    </View>
  );
};

export default UserChat;