//import axios to make HTTP request
import axios from "axios";

//set the base URL for the backend API
const API_URL = "http://localhost:5000";

//function to fetch all people from backend

export const fetchPeople = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/people`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching people: ", error);
    }
};


//function to create a new person and send it to the backend
export const createPerson = async (personData) => {
    try {
        const response = await axios.post(`${API_URL}/api/people`, personData, {
            headers: {
                "Content-Type": "multipart / form - data"
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Error creating person:", error);
    }
};