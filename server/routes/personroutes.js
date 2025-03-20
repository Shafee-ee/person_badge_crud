import express from 'express';
import multer from 'multer';
import Person from '../models/Person.js';

const router = express.Router();

//set up multer storage configuration

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})


const upload = multer({ storage: storage });


//Route to get all information on people

router.get('/', async (req, res) => {
    try {
        const people = await Person.find();
        res.json(people);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//Route to add the person

router.post('/', upload.single('image'), async (req, res) => {

    console.log(req.body);
    console.log(req.file);
    const { name, age } = req.body;
    const image = req.file ? req.file.path : null;

    const newPerson = new Person(
        {
            name,
            age,
            image
        }
    );

    try {
        const savedPerson = await newPerson.save();
        res.status(201).json(savedPerson)
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }

});

//Route to delete a person

router.delete('/:id', async (req, res) => {
    try {
        const deletePerson = await Person.findByIdAndDelete(req.params.id);
        if (!deletePerson) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.status(200).json({ message: 'person deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

export default router