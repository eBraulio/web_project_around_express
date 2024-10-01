import mongoose from 'mongoose';
const { Schema } = mongoose;

const urlRegex =
  /^(https?:\/\/)(www\.)?([a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]+)$/;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator: function (v) {
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} is not  a valid URL!`,
    },
  },
});

// module.exports = mongoose.model('user', userSchema);

const User = mongoose.model('user', userSchema);
export default User;
