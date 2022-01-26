const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    handle: {
        type: String,
        max: 40,
        required: true
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date,
                required: true
            },
            current: {
                type: Boolean,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldOfStudy: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date,
                required: true
            },
            current: {
                type: Boolean,
                required: false
            },
            description: {
                type: String,
                required: true
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        twitter: {
            type: String
        },
        linkedln: {
            type: String
        }
    }
})

module.exports = mongoose.model('profile', profileSchema);