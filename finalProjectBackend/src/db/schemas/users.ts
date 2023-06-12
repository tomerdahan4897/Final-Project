import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema({
  firstName: {
    type: String,
    requred: true,
  },
  lastName: {
    type: String,
    requred: true,
  },
  email: {
    unique: true,
    type: String,
    requred: true,
  },
  password: {
    type: String,
    requred: true,
  },
  phone: {
    type: String,
    requred: true,
  },
  street: {
    type: String,
    requred: false,
  },
  city: {
    type: String,
    requred: false,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

export { usersSchema };
