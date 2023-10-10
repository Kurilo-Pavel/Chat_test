import styles from "../../../styles";
import {View, Text, SectionList, TextInput} from "react-native";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {deleteUser, getAllUsers, getUser} from "../../../store/users/userListSlice";
import {useEffect, useState} from "react";
import MyButton from "../MyButton";
import {RootStackParamList} from "../../Chat";
import {NativeStackScreenProps} from "react-native-screens/native-stack";

type ChatPageProps = NativeStackScreenProps<RootStackParamList, "Home">;

const Users = ({navigation}: ChatPageProps) => {
  const users = useAppSelector(state => state.users.users);
  const user = useAppSelector(state => state.users);
  const [name, setName] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    if (name) {
      dispatch(getUser(name));
    } else {
      dispatch(getAllUsers());
    }
  }, [name]);

  return (
    <View style={styles.userWrapper}>
      {!user.name && <View style={styles.userView}>
        <MyButton title="LogIn" onPress={() => navigation.navigate("Login")}/>
        <MyButton title="Registration" onPress={() => navigation.navigate("Registration")}/>
      </View>}
      {!!user.name && <View style={styles.userView}>
        <View style={styles.userView}>
          <MyButton title="Change" onPress={() => navigation.navigate("Change_name")}/>
          <MyButton title="Delete" onPress={() => dispatch(deleteUser(user.email))}/>
        </View>
        <Text style={styles.userName}>{user.name}</Text>
      </View>}
      <TextInput style={styles.input} placeholder="Search" value={name} onChangeText={setName}/>
      {users.map((data, index) => user.name === data.name ? null :
        <View key={index} style={styles.userView}>
          <Text style={styles.userText}>{data.name}</Text>
          {!!user.name && <MyButton title="Chat" onPress={() => {
            // @ts-ignore
            navigation.navigate("User_chat", {name: data.name, email: data.email});
          }}/>}
        </View>
      )}

    </View>
  )
};

export default Users;