import { useState, useEffect } from "react";
import api from "../api";
import "../style/Home.css";
import Note from "../components/Note";
import { Navigate, useNavigate } from "react-router-dom";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getNotes();
    }, [])

    const logout = () => {
        navigate("/logout");
    }

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {setNotes(data); console.log(data)})
            .catch((err) => alert(err));
    }

    const deleteNote = id => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if(res.status === 204) {alert("Note Delete"); getNotes()}
                else alert("FAIL")
                }
            )
            .catch((err) => alert(err));
    }

    const createNote = e => {
        e.preventDefault();
        api
            .post("/api/notes/", {title, content})
            .then((res) => {
                    if(res.status === 201) alert("Created");
                    else alert("FAIL TO CREATE");
                    getNotes();
                }
            )
            .catch((err) => alert(err))
    }

    return <div>
        <div>
            <h2>Notes</h2>
            <button onClick={logout}>logout</button>
        </div>
        <div>
            <h2>Create Note</h2>
            {notes.map(
                note => <Note note={note} onDelete={deleteNote} key={note.id} />
            )}
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label><br />
                <input 
                    type="text" 
                    id="title"
                    name="title"
                    required
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Title:</label><br />
                <textarea 
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={e => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    </div>
}

export default Home;