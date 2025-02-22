import { useState } from "react";
import "./App.css";

type Note = {
  id: number;
  title: string;
  content: string;
};

const App = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "test note 1",
      content: "bla bla note1",
    },
    {
      id: 2,
      title: "test note 2 ",
      content: "bla bla note2",
    },
    {
      id: 3,
      title: "test note 3",
      content: "bla bla note3",
    },
    {
      id: 4,
      title: "test note 4 ",
      content: "bla bla note4",
    },
    {
      id: 5,
      title: "test note 5",
      content: "bla bla note5",
    },
    {
      id: 6,
      title: "test note 6",
      content: "bla bla note6",
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  // Fungsi handle saat submit
  const handdleAddNote = (event: React.FormEvent) => {
    event.preventDefault(); // mencegah halaman reload
    // untuk cek apakah berfungsi fungsinya
    console.log("title: ", title);
    console.log("content: ", content);

    // Membuat objeck note baru
    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    };

    // Membuat array baru dengan urutan:
    // 1. Catatan baru (newNote) di posisi pertama
    // 2. Diikuti semua catatan lama (notes) secara berurutan
    // Contoh PAKAI ... (hasil benar): ["🍊", "🍎", "🍌"]
    // Contoh TANPA ... (hasil salah ❌): ["🍊", ["🍎", "🍌"]] (ada array di dalam array!)
    // Tanda ... digunakan untuk "membuka bungkus" array notes.
    // ... (Spread Operator)
    setNotes([newNote, ...notes]);

    setTitle("");
    setContent("");
  };

  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    const updateNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    };

    const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id ? updateNote : note
    );

    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = (event: React.MouseEvent, noteId:number) => {
    event.stopPropagation();

    const updatedNotes = notes.filter(
      (note)=> note.id !== noteId
    )

    setNotes(updatedNotes);
  }
  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={(event) =>
          selectedNote ? handleUpdateNote(event) : handdleAddNote(event)
        }
      >
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
        <button type="submit">Add Note</button>
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-item" onClick={() => handleNoteClick(note)}>
            <div className="notes-header">
              <button onClick={(event)=>deleteNote(event, note.id)}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
