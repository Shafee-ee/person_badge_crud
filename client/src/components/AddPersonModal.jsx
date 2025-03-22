import React from "react";
import { createPerson } from "../api";
import "./styles/AddPersonModal.css";

const AddPersonModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    //state for form inputs
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [image, setImage] = useState(null);

    //handle form submission

    const handleSubmit = async (e) => {
        e.preventDefault();

        //create form data 
        const formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);

        if (image) {
            formData.append("image", image);
        }



        //send data fot backend
        const newPerson = await createPerson(formData);
        if (newPerson) {
            onPersonAdded(newPerson);
            onClose();
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add a New Person</h2>
                <form>
                    <label>Name:</label>
                    <input type="text" name="name" required />

                    <label>Age:</label>
                    <input type="number" name="Age" required />

                    <label>Upload Image:</label>
                    <input type="file" name="image" accept="image/*" />

                    <button type="submit" className="add-button">Add person</button>
                </form>
                <button className="close-button" onClick={onClose}>X</button>
            </div>
        </div>
    );
}

export default AddPersonModal;