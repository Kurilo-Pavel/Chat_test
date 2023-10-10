import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  indicator: {
    top: "20%",
    width: "100%",
    zIndex: "2",
    position: "absolute",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "gray",
    justifyContent: "center",
  },
  buttonText: {
    color: "white"
  },
  userWrapper: {
    marginTop: "10px",
  },
  userView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  userText: {
    fontSize: "24px",
    alignSelf: "center",
    marginLeft: "10px",
  },
  userNameWrapper: {
    display: "flex",
    alignItems: "flex-end",
    marginBottom: "30px",
  },
  userName: {
    marginRight: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    fontStyle: "italic",
    color: "gray"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  userChat: {
    display: "flex",
    flexDirection: "column",
    margin: "20px",
    flex: "auto",
    gap: "20px",
  },
  fieldMessages: {
    padding: "10px",
    flex: "auto",
    width: "100%",
    backgroundColor: "lightGray",
    borderColor: "black",
    borderWidth: "1px",
  },
  message: {
    display: "flex",
    marginBottom: "5px",
  },
  messageName: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  messageText: {
    fontSize: "20px",
  }
});

export default styles;