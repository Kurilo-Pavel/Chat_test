import styles from "../../../styles";
import {View} from "react-native";
import MyButton from "../MyButton";
import {RootStackParamList} from "../../Chat";
import {NativeStackScreenProps} from "react-native-screens/native-stack";

type ChatPageProps = NativeStackScreenProps<RootStackParamList, "Home">;

const ChatPage = ({navigation}: ChatPageProps) => {

  return (
    <View style={styles.container}>
      <MyButton title="Join" onPress={() => navigation.navigate("Users")}/>
    </View>
  )
};

export default ChatPage;