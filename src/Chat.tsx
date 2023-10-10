import {ActivityIndicator, StatusBar} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatPage from "./components/pages/ChatPage";
import Users from "./components/pages/Users";
import Login from "./components/pages/Login";
import Registration from "./components/pages/Registration";
import styles from "../styles";
import {useAppSelector} from "../store/hooks";
import ChangeName from "./components/pages/ChangeName";
import UserChat from "./components/pages/UserChat";

export type RootStackParamList = {
  Home: undefined;
  Users: undefined;
  Login: undefined;
  Registration: undefined;
  Change_name: undefined;
  User_chat: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Chat = () => {
  const loading = useAppSelector(state => state.users.loading);
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content"/>
      <ActivityIndicator size="large" style={styles.indicator} animating={loading}/>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{title: "Welcome"}} component={ChatPage}/>
        <Stack.Screen name="Users" component={Users}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Registration" component={Registration}/>
        <Stack.Screen name="Change_name" component={ChangeName} options={{title: "Change name"}}/>
        <Stack.Screen name="User_chat" component={UserChat} options={{title: "Chat"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Chat;