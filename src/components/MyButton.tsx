import styles from "../../styles";
import {Pressable, Text} from "react-native";

type MyButtonProps = {
  title: string;
  onPress: () => void;
}

const MyButton = ({title, onPress}: MyButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default MyButton;