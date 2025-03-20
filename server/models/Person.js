import mongoose from 'mongoose';

//create Person Schema

const personSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        image: {
            type: String, //path to image file
            required: false,
        },

    }
);

// create a person model based on the schema
const Person = mongoose.model('Person', personSchema);

export default Person;