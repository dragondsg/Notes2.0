import { useState, useContext, useEffect } from 'react';
import { NotesContext } from "./provider.jsx";
import { useNavigate } from 'react-router-dom';

async function setId() {
    return localStorage.getItem('category');
}

function Category () {
    const navigate = useNavigate();
    const a = useContext(NotesContext);

    const [currentCatId, setCurrentCatId] = useState(0);
    const [name, setName] = useState('');
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        setCurrentCatId(localStorage.getItem('category'));
        setUserId(localStorage.getItem('id'));

        setId().then((id) => {
            if (id != 0) {
                setName(a.allCategories.filter((c) => c.id == id)[0].title);
            }
        });
    }, []);

    return <>
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (currentCatId == 0) {
                    a.addCat(name, userId);
                } else {
                    a.updateCat(name, userId, currentCatId);
                }
                navigate('/home');
            }}
        >
            <h3>{currentCatId == 0? 'New' : 'Edit'} Category</h3>
            <input
                value={name}
                onChange={(e)=>{
                    setName(e.target.value);
                }}
            ></input>
            <button
                type='submit'
            >Save</button>
            <button
                type='button'
                onClick={()=>{
                    navigate('/home');
                }}
            >Cancel</button>
        </form>
    </>
}

export default Category;
