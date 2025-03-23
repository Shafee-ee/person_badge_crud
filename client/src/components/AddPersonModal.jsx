import React, { useState } from "react";
import { createPerson } from "../api";
import "./styles/AddPersonModal.css";

const AddPersonModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    //state for form inputs
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState(false);

    //handle form submission

    const handleSubmit = async (e) => {
        e.preventDefault();

        //loading
        setLoading(true);
        setCompleted(false);

        //create form data 
        const formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);

        if (image) {
            formData.append("image", image);
        }

        console.log("FormData contents:", [...formData.entries()]);
        //send data fot backend



        setTimeout(async () => {
            const newPerson = await createPerson(formData);
            if (newPerson) {
                onPersonAdded(newPerson);

                setLoading(false);
                setCompleted(true);

                setTimeout(() => {
                    setCompleted(false);
                    onClose();
                }, 2000);
            }
        }, 1000);


    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add a New Person</h2>
                {loading ? (
                    <p className="loading-message">Adding Person...</p>
                ) : completed ? (
                    <p className="success-message">Success!</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <input type="text"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            required />

                        <label>Age:</label>
                        <input type="number"
                            name="Age"
                            onChange={(e) => setAge(e.target.value)}
                            required />

                        <label>Upload Image:</label>
                        <input type="file"
                            name="image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />

                        <button type="submit" className="add-button">Add person</button>
                    </form>
                )}
                <button className="close-button" onClick={onClose}>X</button>
            </div>
        </div>
    );
}

export default AddPersonModal;