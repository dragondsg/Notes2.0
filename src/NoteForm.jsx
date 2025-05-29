import { useState, useContext, useEffect } from 'react';
import { NotesContext } from "./provider.jsx";
import { useNavigate, useSearchParams } from 'react-router-dom';
import './NoteForm.css'

const usePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchPrimitive, setSearchPrimitive] = useState(
        searchParams.get("note")
    );
    const setPage = (id) => {
        searchParams.set("note", `${id}`);
        setSearchPrimitive(id);
        setSearchParams();
    };
    return [searchPrimitive, setPage];
};

function NoteForm() {
    const a = useContext(NotesContext);
    const navigate = useNavigate();

    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [id, setID] = usePage();
    const [userId, setUserId] = useState(0);
    const [currentCategory, setCurrentCategory] = useState(0);

    useEffect(() => {
        setUserId(localStorage.getItem('id'));
        setCurrentCategory(localStorage.getItem('category'));
        if (id != 'newNote') {
            a.refetchNotes().then(() => {
                let tn = (a.allNotes.filter((n) => n.id == id)[0]);
                setSubject(tn.subject);
                setContent(tn.content);
                setCurrentCategory(tn.catID);
            });
        }
    }, []);

    return (
    <>
        <form
            className={'noteForm'}
            onSubmit={(e) => {
                e.preventDefault();
                if (id == 'newNote') {
                    a.addNote(subject, content, currentCategory, userId);
                } else {
                    a.updateNote(id, subject, content, currentCategory);
                }
                navigate('/home');
            }}
        >
            <div className={'inputs'}>
                <input
                    className={'subjectInput'}
                    placeholder="Subject"
                    value={subject}
                    onChange={(e)=>{
                        setSubject(e.target.value);
                    }}></input>
                <textarea
                    className={'contentInput'}
                    placeholder="Your note here."
                    value={content}
                    onChange={(e)=>{
                        setContent(e.target.value);
                    }}
                ></textarea>
            </div>
            <div className={'buttonArea'}>
                <select
                    value={currentCategory}
                    onChange={(e) => {
                        setCurrentCategory(e.target.value);
                        localStorage.setItem('category', e.target.value);
                    }}>
                        <option value={'0'}>None</option>
                        {a.allCategories
                            .filter((cat) => cat.userID == userId)
                            .map((cat) => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
                </select>
                <button type="submit">Save</button>
                <button type="button" onClick={()=>{
                    if (id == 'newNote') {
                        navigate('/home');
                    } else {
                        a.deleteNote(id).then(() => {
                            navigate('/home');
                        });
                    }
                }}>Delete</button>
            </div>
        </form>
    </>
    );
}

export default NoteForm;
