/* eslint-disable */

// Define types for the response objects
import User from "../model/user";

interface LoginResponse {
  token: string;
  userId: number;
}

interface UserData {
  username: string;
  userId: number;
}

const serverUrl = "http://localhost:9090";

const userViewModel = {
  async handleLogin(
    username: string,
    password: string
  ): Promise<{ user: User }> {
    try {
      const { token, userId } = await this.loginRequest(username, password);
      sessionStorage.setItem("token", token);

      sessionStorage.setItem("userId", userId.toString());

      const userData = await this.getUserData();
      sessionStorage.setItem("userName", userData.username);

      const user: User = {
        username: userData.username,
        password: null,
        id: userId,
        admin: null,
      };

      return { user };
    } catch (error) {
      console.error("Error fetching:", error);
      // You might want to handle or propagate the error here
      throw error;
    }
  },

  async handleSignup(username: string, password: string): Promise<void> {
    try {
      await this.signupRequest(username, password);
      await this.handleLogin(username, password);
    } catch (error) {
      console.error("Error signing up:", error);
      // You might want to handle or propagate the error here
      throw error;
    }
  },

  async loginRequest(
    username: string,
    password: string
  ): Promise<LoginResponse> {
    const loginResponse = await fetch(`${serverUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!loginResponse.ok) {
      throw new Error(`Login failed with status: ${loginResponse.status}`);
    }

    return loginResponse.json();
  },

  async signupRequest(username: string, password: string): Promise<void> {
    const signupResponse = await fetch(`${serverUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!signupResponse.ok) {
      throw new Error(`Signup failed with status: ${signupResponse.status}`);
    }
  },

  async getUserData(): Promise<User> {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");

    // Fetch the User Object
    const userResponse = await fetch(
      `${serverUrl}/users/${userId}?token=${token}`
    );

    // Check if Response is OK
    if (!userResponse.ok) {
      throw new Error(
        `Failed to get user data with status: ${userResponse.status}`
      );
    }

    // Return the User
    const user = await userResponse.json();
    console.log('UserViewModel > getUserData()');
    console.log(user);
    return user;
  },

  async saveUserData(user: User) {},
};

// export default userViewModel;
export { userViewModel };
