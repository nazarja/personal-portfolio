
/*
==================================================================
    LOCAL STORAGE FUNCTIONS
==================================================================
*/

/*
==============================
    PARSE LOCAL STORAGE LISTS
==============================
*/

// IF LISTS EXIST, PARSE & STORE IN LOCAL STATE
function parseLocalStorageLists() {

    if ('movielist:userlists' in localStorage) {
        let userlists = localStorage.getItem('movielist:userlists');
        userlists = JSON.parse(userlists);
        let keys = Object.keys(userlists);

        for (let list in userlists) {
            state.mylists[list] = userlists[list];
        };
    };
};



/*
==============================
    CHECK IF MEDIA ITEM IN LIST
==============================
*/

// SMALL FUNCTION TO QUICKLY CHECK IF TMDB ID EXISTS...
// ...IN A LIST. RETURNS A BOOLEAN 
function checkIfInCollection(tmdbId) {

    // CHECK THAT EXISTING LISTS HAVE ENTRIES
    if (Object.keys(state.mylists).length) {
        for(let lists in state.mylists) {
            let list = state.mylists[lists];
            for (let i = 0; i < list.length; i++) {
                // IF ID MATCHES - BREAK AND RETURN
                if (tmdbId == list[i].id) {
                    return true;
                };
            };
        };
        return false;
    }; 
    return false;
};



/*
==================================================================
    CRUD FUNCTIONS / CREATE / UPDATE / DELETE
==================================================================
*/

/*
==============================
    UPDATE LIST 
==============================
*/

function updateList(tmdbId, id) {

    // GET PASSED IN UNIQUE ID & SET CONTENT VISIBLE
    let element = document.querySelector(id);
    element.innerHTML = '';
    element.style.visibility = 'visible';

    // CHECK THAT ANY LISTS HAVE VAILD ENTRIES
    // IF NOT SEND MESSAGE
    if (!Object.keys(state.mylists).length) {
        element.innerHTML = `
            <p onclick="closeAddNewList('${id}')" class="close-add-item">
                Close
                <i class="material-icons close-icon">close</i>
            </p>
            <p onclick="nav('mylists,null')">You don't have any created lists</p>
        `;
    }

    // IF LISTS EXIST 
    else {

        // STORE BOOLEANS IN AN ARRAY
        let isInList = [];
        
        // ITERATE LISTS
        for(let lists in state.mylists) {
            
            // SET FOUND TO FALSE
            let foundItem;
            let list = state.mylists[lists];

            for (let i = 0; i < list.length; i++) {

                // IF MATCH FOUND PUT IN LIST AS TRUE
                // AN ITEM MAY BE ADDED TWICE, DONT BREAK
                if (tmdbId == list[i].id) {
                    isInList.push([true, lists]);
                    foundItem = true;
                };
            }

            // IF FOUND IS STILL FALSE - MEDIA ITEM MUST NOT EXIST
            // PUT FALSE INTO ARRAY
            if (!foundItem) {
                isInList.push([false, lists]);
            }; 
        };

        
        // CREATE CLOSE BUTTON HTML
        element.innerHTML += `
            <p onclick="closeAddNewList('${id}')" class="close-add-item">
                Close
                <i class="material-icons close-icon">close</i>
            </p>
        `;

        // ITERATE OVER ARRAY AND ASSIGN DIFFERNET CALLBACKS FOR TRUE AND FALSE
        // NEED TO PASS IN ARGUMENTS TO CALLBACKS 
        // LIST TITLE, UNIQUE ID, TMDB ID, BOOLEAN TO REMOVE ELEMENT 
        isInList.forEach(item => {
            if (item[0]) {
                element.innerHTML += `
                    <p onclick="deleteItemFromList('${item[1]}', '${tmdbId}', '${id}', false)">
                        ${item[1]}
                        <i class="material-icons remove-circle-icon">remove_circle</i>
                    </p>
                `;
            }
            else {
                element.innerHTML += `
                    <p onclick="addItemToList('${item[1]}', '${tmdbId}', '${id}')">
                        ${item[1]}
                        <i class="material-icons add-circle-icon">add_circle</i>
                    </p>
                `;
            };
        });
    }; 
};



/*
==============================
    ADD NEW LIST
==============================
*/

// PASS IN DIV ID, AND INPUT ID TO SELECT BOTH
function addNewList(divId, inputId) {

    // IF INPUT IS EMPTY - DO NOTHING
    let input = document.querySelector(inputId);
    if (!input.value.length) return;

    // REPLACE SPACES - RESET INPUT VALUE & ADD TO LOCAL STATE
    let title = input.value.toLowerCase().replace(/\s/g, '_');
    state.mylists[title] = [];
    input.value = '';

    // SET TO LOCAL STORAGE, SHOW UPDATED HTML, CLOSE DIV 
    localStorage.setItem('movielist:userlists', JSON.stringify(state.mylists));
    showMyLists();
    closeAddNewList(divId);
};



/*
==============================
    ADD ITEM TO LIST 
==============================
*/

// IN FULL MEDIA SCREEN
// PUSH TO LOCAL STATE, SET LOCAL STORAGE, UPDATE LISTS
// RENDER AGAIN
function addItemToList(list, tmdbId, id) {
    state.mylists[list].push(state.media);
    let userlists = JSON.stringify(state.mylists);
    localStorage.setItem('movielist:userlists', userlists);
    updateList(tmdbId, id);
}



/*
==============================
    DELETE A LIST
==============================
*/

function deleteList(list, id) {

    // GET CONFIRMATION BEFORE DELETING AN ENTIRE LIST
    let confirmDelete = confirm('Are you sure you want to delete this list?');

    // DELETE LIST & SET LOCAL STORAGE
    if (confirmDelete) {
        delete state.mylists[list];
        let userlists = JSON.stringify(state.mylists);
        localStorage.setItem('movielist:userlists', userlists);
    };

    // IF AN ID WAS PASSED, REMOVE ELEMENT
    if (id) {
        let element = document.querySelector(id);
        fadeOut(id);
        setTimeout(() => element.remove(), 200);
    }

    // IF LAST LIST DELETED - SHOW NO LISTS TEXT
    if (!Object.keys(state.mylists).length) {
        showNoListsText();
    };
};



/*
==============================
    DELETE LIST ITEM
==============================
*/

function deleteItemFromList(list, tmdbId, id, remove) {


    for (let i in state.mylists[list]) {

        // GET A MATCH - SPLICE OUT OF LIST
        // SET LOCAL STORAGE & BREAK
        if (state.mylists[list][i].id == tmdbId) {
            state.mylists[list].splice(i, 1);
            let userlists = JSON.stringify(state.mylists);
            localStorage.setItem('movielist:userlists', userlists);
            break;
        };
    };

    // IF ELEMENT TO BE REMOVED
    if (id && remove) {
        let element = document.querySelector(id);
        fadeOut(id);
        setTimeout(() => element.remove(), 200);
    };

    // IF ELEMENT IS TO BE UPDATED
    if (!remove) {
        updateList(tmdbId, id);
    };
};



