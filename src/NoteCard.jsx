import { Link } from 'react-router-dom';

export function NoteCard(note) {
    return (
        <Link to={`/notes/?note=${note.note.id}`}>
            <div>
                <h3>{note.note.subject}</h3>
                <p>{note.note.content}</p>
            </div>
        </Link>
    );
}
