import { useState, useContext, useEffect } from 'react';
import { NotesContext } from "./provider.jsx";
import { NoteCard } from "./NoteCard.jsx";
import { useNavigate } from 'react-router-dom';
import './App.css'

function App() {
  const navigate = useNavigate();
  const a = useContext(NotesContext);

  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState('');
  const [currentCategory, setCurrentCategory] = useState(0);

  useEffect(()=>{
    a.refetchNotes();
    a.refetchCategories();
    setUsername(localStorage.getItem('user'));
    setUserId(localStorage.getItem('id'));
    setCurrentCategory(localStorage.getItem('category'));
  }, []);

  return (
    <>
      <div className={"header"}>
        <h2>{username}'s Notes</h2>
        <select
          value={currentCategory}
          onChange={(e) => {
            setCurrentCategory(e.target.value);
            localStorage.setItem('category', e.target.value);
          }}>
            <option value={0}>All</option>
            {a.allCategories
              .filter((cat) => cat.userID == userId)
              .map((cat) => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
        </select>
        <button
          onClick={ ()=>{
            navigate('/');
          } }>Log Out</button>
        <button
          onClick={ ()=>{
            navigate('/notes/?note=newNote');
          } }>New Note</button>
        <button
          onClick={ ()=>{
            navigate('/categories');
          } }>Edit Category</button>
      </div>
      <div className={"noteBody"}>
        {a.allNotes
          .filter((n) => currentCategory==0 || n.catID == currentCategory)
          .map((n, index) => <NoteCard key={index} note={n} />)}
      </div>
    </>
  )
}

export default App
