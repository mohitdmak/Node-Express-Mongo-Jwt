const mongoose = require('mongoose');
const schema = mongoose.Schema;

const TopicSchema = new schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps:true}, {collection: 'topics'});

const Topic = mongoose.model('Topic', TopicSchema);
module.exports = Topic;