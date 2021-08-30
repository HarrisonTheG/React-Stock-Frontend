import axios from "axios";

const USER_VALIDATE_API_URL =
  "http://t11adproject-env.eba-hyey7nfu.ap-southeast-1.elasticbeanstalk.com/users/validate";

const USER_API_BASE_URL =
  "http://t11adproject-env.eba-hyey7nfu.ap-southeast-1.elasticbeanstalk.com/users";

const USER_LOGIN_API_URL =
  "http://t11adproject-env.eba-hyey7nfu.ap-southeast-1.elasticbeanstalk.com/login";

// const USER_API_BASE_URL = "http://localhost:5000/users";
// const USER_VALIDATE_API_URL = "http://localhost:5000/users/validate";
// const USER_LOGIN_API_URL = "http://localhost:5000/login";

class UserService {
  async addUser(User) {
    return await axios
      .post(USER_API_BASE_URL + "/add", JSON.stringify(User), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async authenticateUser(User) {
    return await axios
      .post(USER_LOGIN_API_URL, JSON.stringify(User), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  validateUsername(name) {
    return axios.post(
      USER_VALIDATE_API_URL,
      JSON.stringify({ username: name }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
export default new UserService();
