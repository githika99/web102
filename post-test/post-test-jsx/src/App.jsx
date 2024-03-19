import './App.css'
import '.component/Post'

const name = "Githika";
const description = "my description";
const likes = '0';

function App() {

  return (
    <>
      <h1>Welcome to Web102. My name is {name}</h1>
      <h2>Write a post about what you're excited to learn about</h2>
      <Post name = {name} description = {description} likes = {likes}/>
    </>
  )
}

export default App
