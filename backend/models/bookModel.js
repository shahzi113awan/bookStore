const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');

const bookSchema = mongoose.Schema(
    {
        // user:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: 'User'
        // },

        title: {
            type: String,
            required: [true, 'Please add a book tittle']
        },
        author: {
            type: String,
            required: [true, 'Please add a book author']
        },
        price: {
            type: Number,
            required: [true, 'Please add book price']
        }
    },
    {
        timestamps: true,
    }
)

bookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Book', bookSchema)
