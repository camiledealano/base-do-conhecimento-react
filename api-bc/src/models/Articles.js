const mongoose = require('mongoose');

const { Schema } = mongoose;

const articlesSchema = new Schema({
    id: String,
    title: String,
    body:String,
    keywords: String ,
    likes: { type: Number, default: 0 },
    published: Boolean ,
    featured: { type: String, default: "off" },
    author_name: String ,
    published_date: String,
});


const Articles = mongoose.model('Articles', articlesSchema);

module.exports = Articles;
