

/*
==================================================================
    MAIN NAVIGATION 
==================================================================
*/


// ARGUMENT WILL BE RECIVEDAS A STRING CONTAINING ..
// .. THE CATEGORY AND SUB-CATEGORY
function nav(param) {
    let nav = param.split(',');
    let primary = nav[0];
    let secondary = nav[1];

    // SIMPLE SWITCH STATEMENT TO DECIDE DIRECTION
    switch(primary) {
        case 'movies':
            fadeIn('#main-content');
            fetchTMDbData(primary, secondary);
            break;
        case 'tvshows':
            fadeIn('#main-content');    
            fetchTMDbData(primary, secondary);
            break;
        case 'mylists':
            fadeIn('#main-mylists');
            showMyLists();
            break;
        default:
            break;
    };

    // RESET STYLES NEED - IM NOT USING REACT HERE!!
    resetMediaResults();
    resetPagination(); 
    resetFullMediaContent();
    manageSecondaryNav(primary, secondary);
    manageActiveClass(primary, secondary);
};


/*
==============================
    MANAGE SECONDARY NAV
==============================
*/

// WILL CREATE A SECOND MENU BASED ON ARRAY IN LOCAL STATE
function manageSecondaryNav(primary, secondary) {

    // SOME ITEMS HAVE NO SECOND MENU & ARE SET TO NULL
    if (secondary == 'null') {
        secondaryNav.innerHTML = ``;
        return;
    };

    // CREATE HTML, REPLACE SPACES, LOWERCASE
    // PASS DATA NEEDED TO CALL NAV AGAIN
    secondaryNav.innerHTML = `<ul>`
    for (let i of state[primary]) {
        let secondary = i.toLowerCase().replace(/\s/g, '_');
        secondaryNav.innerHTML += `
            <li tabindex="0" class="nav-child nav-item" onclick="nav('${primary},${secondary}')" data-nav="${primary},${secondary}">
                ${i}
            </li>
        `;
    };
    secondaryNav.innerHTML += `</ul>`;
};



/*
==============================
    MANAGE ACTIVE CLASS
==============================
*/

// ITERATE OVER BOTH MENUS AND APPLY AN ACTIVE CLASS TO .. 
// .. LINKED PARENT AND CHILD ITEMS
function manageActiveClass(primary, secondary) {

    let activeParent = document.querySelectorAll('.nav-parent');
    let activeChild = document.querySelectorAll('.nav-child');

    activeParent.forEach(parent => {
        parent.classList.remove('active-parent');
        if (parent.dataset.nav.includes(primary)) {
            parent.classList.add('active-parent');
        };
    });

    activeChild.forEach(child => {
        child.classList.remove('active-child');
        if (child.dataset.nav.includes(secondary)) {
            child.classList.add('active-child');
        };
    });
};


/*
==================================================================
    SEARCH INPUT FUNCTION
==================================================================
*/

function getSearchInput() {

    // DONT START UNTIL INPUT VALUE IS GREATER THAN 3 CHARS
    // ENCODE ANY SPACES FOR URLS
    // SET EVENT LISTENER FOR CLICKING OUTSIDE AREA - CLOSE IF IT HAPPENS
    if (searchInput.value.length > 3) {
        searchClear.style.visibility =  'visible';
        clickOutsideElement();
        getTMDbSearchData(searchInput.value.replace(/\s/g, '%20'));
    };

    // WHEN VALUE GOES BACK UNDER 3 CHARS RESET
    if (searchInput.value.length < 4) {
        resetSearchResults();
    };

    // IF VALUE IS 0 HIDE THE CLOSE/CLEAR BUTTON
    if (searchInput.value.length == 0) {
        searchClear.style.visibility = 'hidden';
    };
};










