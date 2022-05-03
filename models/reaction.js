const { Schema, Types} = require ('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type:String,
            required: true,
            maxLength: 280,
        },
        createdAt: {
            type:Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createAtVal),
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id:false,
    }
);

module.exports = reactionSchema;