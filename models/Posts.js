const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        text: String,
        required: true
    },
    description: {
        text: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                required: true
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ],

    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('posts', postSchema);