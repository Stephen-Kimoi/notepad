import { useEffect, useState } from 'react'
import Sidebar  from './components/Sidebar/Sidebar'
import Editor from './components/Editor/Editor' 
import { data } from './assets/data/data'
import Split from 'react-split'
import { nanoid } from 'nanoid'
import './App.css'
import "react-mde/lib/styles/css/react-mde-all.css";

function App() {
  let savedNotes = localStorage.getItem("notes") 

  const [notes, setNotes] = useState( () => JSON.parse(savedNotes) || []) 
  const [currentNoteId, setCurrentNoteId] = useState( 
    (notes[0] && notes[0].id) || ""
  ) 

  useEffect( () => {
    localStorage.setItem("notes", JSON.stringify(notes)) 
  }, [notes])

  function createNewNote() {
    const newNote = {
      id: nanoid(), 
      body: "# Type your markdown note's title here"
    }**
    setNotes(prevNotes => [newNote, ...prevNotes]) 
    setCurrentNoteId(newNote.id) 
  }

  function updateNote(text) {
    setNotes(oldNotes => oldNotes.map(oldNote => {
      return oldNote.id === currentNoteId 
          ? {...oldNote, body: text} 
          : oldNote 
    }))
  }

  // Research more on this function cause I don't understand
  function findCurrentNote() {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

  return (
     <main>
       {
         notes.length > 0 
         ? 
         <Split
            sizes={[30,70]}
            direction="horizontal" 
            className='split'
         >
         <Sidebar 
           notes={notes} 
           currentNote={findCurrentNote()} 
           setCurrentNoteId={setCurrentNoteId}
           newNote={createNewNote}
         />
         {
           currentNoteId && notes.length > 0 && 
           <Editor 
             currentNote={findCurrentNote()} 
             updateNote={updateNote}
           /> 
         }
         </Split>
         : 
         <div className='no-notes'>
             <h1>You have no notes</h1>
             <button
                className='first-note'
                onClick={createNewNote}
             >
                 Create new note
             </button>
         </div>
       }
     </main>
  )
}

export default App
