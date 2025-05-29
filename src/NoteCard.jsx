import { Link } from 'react-router-dom';
import './NoteCard.css'

export function NoteCard(note) {
    return (
        <Link to={`/notes/?note=${note.note.id}`}>
            <div className={'noteCardBody'}>
                <h3>{note.note.subject}</h3>
                <p>{note.note.content}</p>
            </div>
        </Link>
    );
}
