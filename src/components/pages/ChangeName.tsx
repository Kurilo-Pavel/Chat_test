import {TextInput, View} from "react-native";
import {useState} from "react";
import MyButton from "../MyButton";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {changeName} from "../../../store/users/userListSlice";
import styles from "../../../styles";

const ChangeName = ({navigation}) => {
  const [newName, setNewName] = useState("");
  const user = useAppSelector(state => state.users);
  const dispatch = useAppDispatch()
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="New name"
        value={newName}
        style={styles.input}
        onChangeText={setNewName}
      />
      <View>
        <MyButton
          title="Change"
          onPress={() => dispatch(changeName({newName: newName, email: user.email})).then(() => navigation.goBack())}
        />
      </View>
    </View>
  );
};

export default ChangeName;