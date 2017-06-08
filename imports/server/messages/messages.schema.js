
/**
 * @typedef {Object} MessageType
 * @property {String} [_id]
 * @property {String} text
 * @property {Date} [createdAt]
 * @property {Date} [updatedAt]
 * @property {String} [userId]
 */
export const MessageSchema = new SimpleSchema({
    _id: {
        type: String,
        optional: true
    },
    text: {
        type: String
    },
    createdAt: {
        type: Date,
        optional: true
    },
    updatedAt: {
        type: Date,
        optional: true
    },
    userId: {
        type: String,
        optional: true
    }
});
