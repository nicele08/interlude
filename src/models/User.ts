import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this User."],
      maxlength: [60, "Name cannot be more than 60 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email for this User."],
    },
    password: {
      type: String,
      required: [true, "Please provide a password for this User."],
    },
    settings: {
      type: Object,
      default: {
        sessionLength: 25,
        sessionDuration: 25,
        breakDuration: 5,
        endOfSessionSound: "/music/ringtone1.wav",
        endOfBreakSound: "/music/ringtone2.wav",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
