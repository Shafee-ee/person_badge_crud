import React, { useEffect, useState } from 'react'
import Badge from './components/Badge';
import AddPersonModal from './components/AddPersonModal';
import { fetchPeople } from "./api";
import './App.css'

function App() {
  //state to store the List of people
  const [people, setPeople] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)


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


  return (
    <div>
      <h1>People Badges</h1>
      <button onClick={() => setIsModalOpen(true)}>Add person</button>
      <AddPersonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="badge-list">
        {people.map((person) => (
          <Badge key={person._id} name={person.name} age={person.age} image={person.image} />
        ))}
      </div>
    </div>
  )
}

export default App
