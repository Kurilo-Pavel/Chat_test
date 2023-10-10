import {TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import MyButton from "../MyButton";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {logIn} from "../../../store/users/userListSlice";
import styles from "../../../styles";

const Login = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.users.name);

  useEffect(() => {
    if(user){
      navigation.goBack();
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input}/>
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input}/>
      <View>
        <MyButton
          title="Login"
          onPress={() => {
            dispatch(logIn({email: email, password: password}));
          }}/>
      </View>
    </View>
  );
};

export default Login;