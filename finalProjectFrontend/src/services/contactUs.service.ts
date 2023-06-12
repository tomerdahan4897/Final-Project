import axios from "axios";

const baseURL = "http://localhost:5001/api/contactus";

const newContactUsMessage = async (
  fullName: string,
  mail: string,
  tel: string,
  messageContext: string
) => {
  return axios.post(baseURL + "/addMessage", {
    fullName,
    mail,
    tel,
    messageContext,
  });
};
export { newContactUsMessage };
const contactUsService = { newContactUsMessage };
export default contactUsService;
