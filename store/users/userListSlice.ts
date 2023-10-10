import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const path = "http://localhost:7780/";

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async () => {
    const response = await fetch(path + "users");
    return await response.json();
  });

export const getUser = createAsyncThunk(
  "user/getUser",
  async (name: string) => {
    const response = await fetch(`${path}user/${name}`);
    return await response.json();
  }
)

export const logIn = createAsyncThunk(
  "user/Login",
  async (values: { email: string, password: string }) => {
    const response = await fetch(path + "login", {
      method: "POST",
      body: JSON.stringify(values)
    });
    return await response.json();
  });

export const registration = createAsyncThunk(
  "user/registration",
  async (values: { name: string, email: string, password: string }) => {
    const response = await fetch(path + "registration", {
      method: "POST",
      body: JSON.stringify(values)
    });
    return await response.json();
  });

export const changeName = createAsyncThunk(
  "user/changeName",
  async (value: { newName: string, email: string }) => {
    const response = await fetch(path + "changeName", {
      method: "PUT",
      body: JSON.stringify(value)
    });
    return await response.json();
  });

export const deleteUser = createAsyncThunk(
  "user/deleteName",
  async (email: string) => {
    const response = await fetch(path + "deleteUser", {
      method: "DELETE",
      body: JSON.stringify({email: email})
    });
    return await response.json();
  });

export const getMessage = createAsyncThunk(
  "user/getMessage",
  async (values: { userEmail: string, myEmail: string }) => {
    const response = await fetch(path + "getMessage", {
      method: "POST",
      body: JSON.stringify(values)
    });
    return await response.json();
  });

export const chatting = createAsyncThunk(
  "user/chatting",
  async (companion: { name: string, email: string, message: string, myEmail: string }) => {
    const connection = new WebSocket(`ws://localhost:7781`);
    let array: { name: string, message: string }[] = [];
    connection.onopen = event => {
      connection.send(JSON.stringify(companion));
    };

    connection.onerror = err => {
      return {error: err};
    };

    let a = new Promise((resolve, reject) => {
      connection.onmessage = async (event) => {
        array = await JSON.parse(event.data);
        resolve(array);
      };
    });

    connection.onclose = event => {
      if (event.wasClean) {
        console.log("close connection with WebSocket");
      }
    };
    return a.then((data) => data);
  });

type User = {
  name: string;
  email: string;
};

type UsersSlice = {
  users: User[];
  error: string;
  loading: boolean;
  name: string;
  email: string;
  selectCompanion: string;
  message: { name: string, message: string }[];
}

const initialState: UsersSlice = {
  users: [{
    name: "",
    email: "",
  }],
  error: "",
  loading: false,
  name: "",
  email: "",
  selectCompanion: "",
  message: [{name: "", message: ""}],
};

const userSlice = createSlice<UsersSlice, {}>({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.users = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.name = action.payload.name;
        state.email = action.payload.email;
      }
      state.loading = false;
    });
    builder.addCase(logIn.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.name = action.payload.name;
        state.email = action.payload.email;
      }
      state.loading = false;
    });
    builder.addCase(registration.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(changeName.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.name = action.payload.name;
        state.users = action.payload.users;
      }
      state.loading = false;
    });
    builder.addCase(changeName.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.users = action.payload.users;
        state.name = "";
        state.email = "";
      }
      state.loading = false;
    });
    builder.addCase(deleteUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.users = action.payload.users;
      }
      state.loading = false;
    });
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMessage.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.message = action.payload.messages;
      }
      state.loading = false;
    });
    builder.addCase(getMessage.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(chatting.fulfilled, (state, action) => {
      // @ts-ignore
      state.message = action.payload;
      state.loading = false;
    });
    builder.addCase(chatting.pending, (state, action) => {
      state.loading = true;
    });
  }
});

export default userSlice.reducer;