import axios from "axios";
const baseURL = "http://localhost:5001/api/users";

const signup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone: string,
  street?: string,
  city?: string
) => {
  return axios.post(baseURL + "/signup", {
    firstName,
    lastName,
    email,
    password,
    phone,
    street,
    city,
  });
};

const login = async (email: string, password: string) => {
  return axios.post(baseURL + "/login", { email, password }).then((res) => {
    const token = res.data.accessToken;
    const firstName = res.data.firstName;
    const email = res.data.email;
    const id = res.data.id;
    const role = res.data.roles[0];
    console.log(res.data);

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ email, firstName, token, id, role })
      );
    }
    return res.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export { signup, login, logout };
const userService = { signup, login, logout };
export default userService;
