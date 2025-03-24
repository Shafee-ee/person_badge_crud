import React, { useEffect, useState } from 'react'
import Badge from './components/Badge';
import AddPersonModal from './components/AddPersonModal';
import { fetchPeople } from "./api";
import { deletePerson } from './api';
import './App.css'

function App() {
  //state to store the List of people
  const [people, setPeople] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toggleBadge, setToggleBadge] = useState(false);


  useEffect(() => {
    const getPeople = async () => {
      const data = await fetchPeople();
      console.log("Fetched Data:", JSON.stringify(data, null, 2));
      if (data) {
        setPeople(data);
      }
    };
    getPeople();

  }, [])

  const handleToggleDeleteMode = () => {
    setToggleBadge(prev => !prev);
  };

  const handleDelete = async (id) => {
    try {
      await deletePerson(id);
      setPeople(prevPeople => prevPeople.filter(person => person._id !== id));
    }
    catch (error) {
      console.error("Failed to delete person", error)
    }

  }

  return (
    <div>
      <h1>People Badges</h1>
      <button onClick={() => setIsModalOpen(true)}>Add person</button>

      <button onClick={handleToggleDeleteMode}>
        {toggleBadge ? "Exit delete Mode" : "Remove pople"}
      </button>

      <AddPersonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        onPersonAdded={(newPerson) => setPeople([...people, newPerson])} />
      <div className="badge-list">
        {people.map((person) => (
          <Badge
            key={person._id}
            name={person.name}
            age={person.age}
            image={person.image}
            toggleBadge={toggleBadge}
            onDelete={() => handleDelete(person._id)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
