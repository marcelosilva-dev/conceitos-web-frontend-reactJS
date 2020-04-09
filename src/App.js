import React , {useEffect , useState} from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories , setRepositories] = useState([])
  const [title , setTitle] = useState('')
  const [url , setUrl] = useState('')
  const [techs , setTechs] = useState('')

useEffect(() => {
  api.get('repositories').then(response => {
    setRepositories(response.data)
    console.log(response)
  })
}, [])

  async function handleAddRepository() {
    const body = {title , url , techs}
    const response = await api.post('repositories', body)

    const repo = response.data

    setRepositories([...repositories , repo])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
  

    const repoIndex = repositories.findIndex(repo => repo.id === id)

    if(repoIndex < 0) {
      return alert('erro')
    }
  
    repositories.splice(repoIndex, 1)
    setRepositories([...repositories])
    console.log(repositories)
  }

  return (
    <div className="centro">
    <div>
        <ul  data-testid="repository-list">
        {repositories.map(repo => 
                <li key={repo.title}>
                  {repo.title}
        
                  <button onClick={() => handleRemoveRepository(repo.id)}>
                    Remover
                  </button>
                </li>)}
                </ul>
      <input type="text" onChange={(e) => setTitle(e.target.value)}
       placeholder="Title"></input>
      <input type="text" onChange={(e) => setTechs(e.target.value)} 
      placeholder="Techs"></input>
      <input type="text" onChange={(e) => setUrl(e.target.value)} 
      placeholder="Url"></input>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
    </div>
  );
}

export default App;
