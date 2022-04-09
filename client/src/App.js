import logo from './logo.svg';
import './App.css';

import Menu from './components/Menu';
import Form from './components/Form';
import { useState } from 'react';

function App() {
  const [showForm, setShowForm] = useState(false);
  const baseUrl = "http://localhost:5000";
  const form = () => {
    if(showForm) {
      return <Form setShowForm={setShowForm} baseUrl={baseUrl}/>
    } else {
      return null
    }
  }
  return (
    <div className="App">
      <Menu setShowForm={setShowForm} baseUrl={baseUrl} />
      {form()}
    </div>
  );
}

export default App;
