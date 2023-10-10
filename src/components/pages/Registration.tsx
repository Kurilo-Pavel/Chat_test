import {TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import MyButton from "../MyButton";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {registration} from "../../../store/users/userListSlice";
import styles from "../../../styles";

const Registration = ({navigation}) => {
  const [name, setName] = useState("");
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
      <TextInput placeholder="Login" value={name} onChangeText={setName} style={styles.input}/>
      <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} style={styles.input}/>
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input}/>
      <View>
        <MyButton title="Registration" onPress={() => dispatch(registration({name: name,email: email, password: password}))}/>
      </View>
    </View>
  );
};

export default Registration;