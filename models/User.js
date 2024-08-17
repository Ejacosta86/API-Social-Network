const { Schema, model } = require('mongoose');

//email validation
let validateEmail = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

const userSchema = new Schema(
    {
        username: {
            typr: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, "please fill a vaild email address"],
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: "thoughts"}],
        friends: [{ type: Schema.Types.ObjectId, ref: "users"}],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//friend count 
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
 });

 //thought count
 userSchema.virtual("thoughtCount").get(function () {
    return this.thoughts.length;
 });

 const User = Schema.model("users", userSchema);

 module.exports = User;