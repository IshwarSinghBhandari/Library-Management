import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        
        trim:true
    },
    author: {
        type: String,
    
        trim:true
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    status: {
        type: String,
        
        default: 'available',
        enum: ['borrowed', 'available'] 
    },
    publishedYear: {
        type: Number
    }
}, { timestamps: true });

export const Book = mongoose.model('Book', bookSchema);
