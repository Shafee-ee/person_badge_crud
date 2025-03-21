import React, { useEffect, useState } from 'react'
import Badge from './components/Badge';
import { fetchPeople } from "./api";
import './App.css'

function App() {
  //state to store the List of people
  const [people, setPeople] = useState([]);
  useEffect(() => {
    const getPeople = async () => {
      const data = await fetchPeople();
      if (data) {
        setPeople(data);
      }
    };
    getPeople();

  }, [])


  return (
    <div>
      <h1>People Badges</h1>
      <div className="badge-list">
        {people.map((People) => {
          <Badge key={person._id} name={person.name} age={person.age} image={person.image} />
        })}
      </div>
    </div>
  )
}

export default App
