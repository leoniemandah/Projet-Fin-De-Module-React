import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./home.css";
import { userActions } from '_store';

export { Home };

function Home() {
    
    const dispatch = useDispatch();
    const { user: authUser } = useSelector(x => x.auth);
    const { users } = useSelector(x => x.users);

    useEffect(() => {
        dispatch(userActions.getAll());
        
    }, []);

    var count = 1;
function increase() {
    count++;
}
var notes = [];
function clicked() {
    const note = document.createElement('div');
    note.classList.add("note");
    note.innerHTML = "<a onClick='Remove(this)' class='removeBtn'>X</a>";
    note.innerHTML += "<input class='w-100' type='text'/>";
    notes.push(note);
    document.getElementById('notes_wrapper').appendChild(note);
}

function Remove(element) {
    let index = notes.indexOf(element.parentNode);
    if (index !== -1) {
        notes.splice(index, 1);
        element.parentNode.remove();
    }
}

    return (
        <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="body d-flex flex-column justify-content-center align-items-center">
                    <div class="wrapper d-flex flex-column justify-content-center align-items-center">
                        <h1 class="pb-3 fw-bold">My Secret Note</h1>
                        <button id="addBtn" class="" onClick={clicked}>ajouter un secret</button>
                    </div>
                    <div id="notes_wrapper"></div>
                </div>
            </div>
        </div>
    </div>
    );
}
