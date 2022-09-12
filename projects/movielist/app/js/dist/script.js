
/*
==================================================================
    GLOBAL VARIABLES
==================================================================
*/

const menuBtn = document.querySelector('#menu-btn');
const searchInput = document.querySelector('#search-input');
const searchClear = document.querySelector('.search-clear');
const searchResults = document.querySelector('#search-results');
const primaryNav = document.querySelector('#primary-nav');
const secondaryNav = document.querySelector('#secondry-nav');
const navItem = document.querySelectorAll('.nav-item');
const main = document.querySelector('#main');
const mainContent = document.querySelector('#main-content');
const mainPagination = document.querySelector('#main-pagination');
const fullMediaContent = document.querySelector('#full-media-content');
const myLists = document.querySelector('#main-mylists');
const userLists = document.querySelector('#user-lists');


// I WANTED A REACT LIKE LOCAL STATE TO WORK WITH
// MENUS, RESULTS, AND LISTS WILL BE STORED HERE
// SOME ITEMS ONLY ADDED FOR JASMINE TESTING AS MOST FUNCTIONS DONT RETURN A VALUE
let state = {
    movies : ['Popular', 'Top Rated', 'Upcoming', 'Now Playing'],
    tvshows : ['Popular', 'Top Rated', 'On the Air', 'Airing Today'],
    mylists : {},
    media: '',
    results: {},
    searchResults: [],
    movieGenres : [[28,"Action"],[12,"Adventure"],[16,"Animation"],[35,"Comedy"],[80,"Crime"],[99,"Documentary"],[18,"Drama"],[10751,"Family"],[14,"Fantasy"],[36,"History"],[27,"Horror"],[10402,"Music"],[9648,"Mystery"],[10749,"Romance"],[878,"Science Fiction"],[10770,"TV Movie"],[53,"Thriller"],[10752,"War"],[37,"Western"]],
    tvGenres : [[10759,"Action & Adventure"],[16,"Animation"],[35,"Comedy"],[80,"Crime"],[99,"Documentary"],[18,"Drama"],[10751,"Family"],[10762,"Kids"],[9648,"Mystery"],[10763,"News"],[10764,"Reality"],[10765,"Sci-Fi & Fantasy"],[10766,"Soap"],[10767,"Talk"],[10768,"War & Politics"],[37,"Western"]]
};



/*
==================================================================
    GLOBAL EVENT LISTENERS
==================================================================
*/


// EVENT LISTENERS SET AT INIT
// INCLUDES LOTS OF RESETS
function setEventListeners() {

    /*
    ==============================
    NAV ITEM CLICK
    ==============================
    */
    navItem.forEach(navitem => {
        navitem.addEventListener('click', () => {
            nav(navitem.dataset.nav);
            
            if (window.innerWidth < 800) {
                menuBtn.click();
            }
            resetSearchResults();
        });
    });

    /*
    ==============================
        MENU TOGGLE CLICK
    ==============================
    */
    menuBtn.addEventListener('click', () => { 
        if (menuBtn.innerHTML == 'menu') {
            menuBtn.innerHTML = 'close';
            primaryNav.style.left = '0';
        } 
        else {
            menuBtn.innerHTML = 'menu';
            primaryNav.style.left = '-140px';
            
        }
        resetSearchResults();
    });

    

    /*
    ==============================
        SEARCH INPUT / CLEAR
    ==============================
    */
    searchInput.addEventListener('input', () => {
        getSearchInput();
    });
 
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.style.visibility =  'hidden';
        resetSearchResults();
    });


    /*
    ==============================
        WINDOW RESIZE
    ==============================
    */
    window.addEventListener("resize", () => {
        if (window.innerWidth > 800 && primaryNav.style.left == '-140px') {
            menuBtn.innerHTML = 'menu';
            primaryNav.style.left = '0';
            
        }
        else if (window.innerWidth < 800) {
            primaryNav.style.left = '-140px';
        }
        resetSearchResults();
    });
};



/*
==================================================================
    GLOBAL RESETS
==================================================================
*/

function clickOutsideElement() {
    let clickOutsideElement = main.addEventListener('click', () => {
       resetSearchResults();
       mainContent.removeEventListener('click', clickOutsideElement);
   });
};

function resetSearchResults() {
   searchResults.innerHTML = '';
};

function resetSearchInputValue() {
   searchInput.value = '';
   searchClear.style.visibility = 'hidden';
};

function resetMediaResults() {
   mainContent.innerHTML = '';
};

function resetPagination() {
   mainPagination.innerHTML = '';
};

function resetFullMediaContent() {
   fullMediaContent.style.display = 'none';
};

function resetMyLists() {
   myLists.style.display = 'none';
};

function resetUserLists() {
    userLists.innerHTML = '';
};


// NOT A RESET BUT OPEN/CLOSE HIDDEN DIV
function openAddNewList(id) {
    document.querySelector(id).style.visibility = 'visible';
};

function closeAddNewList(id) {
    document.querySelector(id).style.visibility = 'hidden';
}



/*
==================================================================
    ANIMATION FUNCTIONS
==================================================================
*/

/*
==============================
    FADE IN ELEMENT BY ID
==============================
*/

// GET ELEMENT ID, INCRAESE OPACITY OVER TIME
// LESSENS SHARPNESS WHEN ELEMENTS CHANGE 
function fadeIn(id) {

    const element = document.querySelector(`${id}`);
    element.style.opacity = 0;
    
    let opacity = 0;
    const interval = setInterval(() => {
        opacity += .05; 
        element.style.opacity = opacity;
        if (opacity >= 1) clearInterval(interval);
    }, 15);
};



/*
==============================
    FADE OUT ELEMENT BY ID
==============================
*/

// GET ELEMENT ID, DECREASE OPACITY OVER TIME
// LESSENS SHARPNESS WHEN ELEMENTS CHANGE 
function fadeOut(id) {

    const element = document.querySelector(`${id}`);
    element.style.opacity = 1;
    
    let opacity = 1;
    const interval = setInterval(() => {
        opacity -= .05; 
        element.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(interval);
        };
    }, 15);
};



/*
==============================
    HOVER POSTER BOX
==============================
*/


// AS ELEMENTS APPEAR DYNAMICALLY - CANT SET EVENT LISTENERS AT INIT
// SMALL POSTER HOVER ANIMATION
// SELECTING DIV TO SHOW BY PARENT NODES CHILDREN SELECTOR
function onMediaHover() {
    const mediaItem = document.querySelectorAll('.media-item');
    mediaItem.forEach(item => {
        item.onmouseenter = () => item.children[2].style.display = 'inline-block';
        item.onmouseleave = () => item.children[2].style.display = 'none';
    });
};









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





/*
==================================================================
    SHOW MAIN CONTENT RESULTS
==================================================================
*/

function showContentResults(results) {

    // RETURN IF NO DATA PRESENT
    if (!results.length) return;

    // RESET CONTENT
    resetMediaResults();
    resetMyLists();

    // MAP OVER DATA
    results.map(result => {

        // EXTRACT RESULTS
        const tmdbId = result.id;
        const title = result.title || result.name || 'Unknown';
        const rating = result.vote_average || '0';
        const genreIds = result.genre_ids || [];
        let poster = `${POSTER}${result.poster_path}`;
        let mediaType;
        let genreNames = '';
        
        // IF POSTER FAILS
        if (result.poster_path == null) poster = DEFAULT_POSTER;

        // GET MEDIA TYPE
        if (result.hasOwnProperty('adult')) {genreType = state.movieGenres; mediaType = 'movie';}
        else {genreType = state.tvGenres; mediaType = 'tv';} 

         // GET GENRES 
         genreIds.forEach(genre => {
            genreType.forEach(id => {
                if (genre == id[0]) {
                    genreNames += `${id[1]} / `;
                }
            });
        });

        // REMOVE TRAILING SLASH
        genreNames = genreNames.replace(/\s\/\s$/gim, '');


        // CHECK IF IN COLLECTION
        let isInCollectionColor = '#222';
        let isInCollection = checkIfInCollection(tmdbId);
        if (isInCollection) isInCollectionColor = 'crimson';

        // CREATE HTML TO RETURN
        mainContent.innerHTML += `
            <div class="media-item" onclick="fetchMediaData('${mediaType}',${tmdbId})">
                <i class="material-icons is-in-collection" style="color: ${isInCollectionColor}" data-tmdbid="${tmdbId}">collections</i>
                <img class="media-poster" src="${poster}" alt="${title}">
                <span class="more-information">More Information</span>
                <div><span class="title">${title}</span><span class="rating">${rating}</span></div>
                <div><p class="genres">${genreNames}</p></div>
            </div>
        `;
    });

    // HOVER ANIMATION
    onMediaHover();
};



/*
==================================================================
    SHOW FULL MEDIA CONTENT 
==================================================================
*/

function showFullMediaContent(result) {

    // EXTRACT RESULTS & SET BACKUP IF FAILURE
    const tmdbId = result.id || '0';
    const title = result.title || result.name || 'Unknown';
    const tagline = result.tagline || `NO. SEASONS: ${result.number_of_seasons}  ~  NO. EPISODES: ${result.number_of_episodes}` || '';
    const overview = result.overview || '';
    const rating = result.vote_average || '0';
    let date = result.release_date || result.first_air_date || '';
    let status = result.status || '';
    let backdrop = `${BACKDROP}${result.backdrop_path}`;
    let poster = `${POSTER}${result.poster_path}`;
    let trailer = []; 

    // CHANGE DATE TO EUROPEAN FORMAT 
    // IF ARTWORK FAILS, SET THE DEFAULT ARTWORK
    if (date) date = date.split('-').reverse().join('-');
    if (result.backdrop_path == null) backdrop = DEFAULT_BACKDROP;
    if (result.poster_path == null) poster = DEFAULT_POSTER;

    // GET TRAILER & GET FOR UNDEFINED
    // RETURN NEW ARRAY AND FILTER BASED ON VIDEO TYPE
    if (result.videos.results.length != 0) {
        trailer = result.videos.results.map(video => {
            if (video.type == 'Trailer') {
                return `https://www.youtube.com/watch?v=${video.key}`;
            }
        }).filter(video => {
            if (video != 'undefined') {
                return video;
            }
        });
    } 
    
    // IF NO TRAILERS EXIST - REDIRECT TO YOUTUBE WITH QUERY
    else {
        trailer[0] = `https://www.youtube.com/results?search_query=${title}`;
    }

    // CREATE HTML TO RETURN
    fullMediaContent.innerHTML = `
        <p class="content-title">MEDIA DETAILS
            <i class="material-icons close-media-content" onclick="resetFullMediaContent(); checkIfCollectionChanged(${tmdbId})">close</i>
        </p>

        <!-- MEDIA BACKDROP -->
        <div id="media-showcase" style="background-image: url('${backdrop}')">
            <a class="download-fanart" href="${backdrop}"target="_blank">DOWNLOAD FANART<br />
                <i class="material-icons download-icon">cloud_download</i>
            </a>
            <h1 id="media-title">${title}</h1>
        </div>

        <!-- MEDIA DETAILS -->
        <div id="media-details">
            <img width="140" id="media-poster" src="${poster}" alt="${title}">
            <div id="media-details-bar">
                <a href="${trailer[0]}" target=_blank">Trailer</a>
                <span>${rating}</span><span>${status}</span><span>${date}</span>
                <span class="from-collection" onclick="updateList(${tmdbId},'#from-full-media-collection')">Add/Remove from Collection</span>

                <!-- ADD REMOVE ITEM FROM COLLECTION -->
                <div id="from-full-media-collection"></div>
            </div>
            <p id="media-tagline">${tagline}</p>
            <p id="media-overview">${overview}</p>
        </div>
    `;
    fullMediaContent.style.display = 'block';

    // PASS CONTENT TO STATE FOR ADDING TO A LIST
    state.media = result;

    // ANIMATION ON RENDER
    fadeIn('#full-media-content');
};



/*
==================================================================
    SHOW SEARCH RESULTS
==================================================================
*/

function showSearchResults(results) {

    // IF EMPTY RETURN
    if (!results.length) return;
    
    // ITERATE OVER RESULTS
    // ONLY SHOW MAX 6 RESULTS
    for (let i = 0; i < 6; i++) {

        // DO NOT INCLUDE PEOPLE - ONLY MOVIES OR TV SHOW MEDIA
        if (results[i].media_type == 'movie' || results[i].media_type == 'tv') {

            // EXTRACT RESULTS & ASSIGN BACKUPS IF FAILURE
            let mediaType = results[i].media_type || 'movie';
            let title = results[i].title || results[i].name;
            let date = results[i].release_date || results[i].first_air_date || '';

            // ONLY WANT THE YEAR - SLICE & RETURN
            if (date)  date = date.slice(0,4);

            // CREATE HTML
            searchResults.innerHTML += `
                <p onclick="fetchMediaData('${mediaType}',${results[i].id});resetSearchResults();resetSearchInputValue()">
                    ${title} (${date})
                </p>
            `;
        };
    };
};



/*
==================================================================
    SHOW USER LISTS
==================================================================
*/

function showMyLists() {

    // RESETS & DISPLAY LIST SECTION
    resetUserLists();
    myLists.style.display = 'block';

    // CHECK LISTS ARE NOT EMPTY BEFORE 
    if (Object.keys(state.mylists).length !== 0) {

         let i = 1;

         // ITERATE OVER LISTS
         for(let lists in state.mylists) {

            // GET THE KEY FOR EACH LIST
            let list = state.mylists[lists];

            // CREATE HTML & ASSIGN UNIQUE ID FOR DELETING ELEMENTS
            // CREATING THE LIST HEADING AND DELETE BUTTON
            let userList = `
            <div class="userlist"  id="list-${lists}-${i}">
                <div class="list-titlebar">
                    <h2>${lists}</h2>
                    <p class="delete-list" onclick="deleteList('${lists}', '#list-${lists}-${i}')">
                        Delete List
                        <i class="material-icons delete-list-icon">delete</i>
                    </p>
                </div>
            `;

            // ITERATE OVER THE LENGTH OF EACH LIST
            for (let i = 0; i < list.length; i++) {

                // EXTRACT INFO & ASSIGN BACKUPS IF FAILURE
                const tmdbId = list[i].id;
                const title = list[i].title || list[i].name || 'Unknown';
                const rating = list[i].vote_average || '0';
                let date = list[i].release_date || list[i].first_air_date || '';
                let mediaType;

                // SLICE LIST FORMAT TO YEAR ONLY
                if (date)  date = date.slice(0,4);

                // IF TH EADULT PROPERTY EXISTS - MEDIA TYPE IS MOVIE ELSE TVSHOW
                if (list[i].hasOwnProperty('adult')) mediaType = 'movie';
                else  mediaType = 'tv'; 

                // CREATE HTML - ALSO NEEDS UNIQUE ID
                userList += `
                    <div class="list-item" id="list-item-${lists}-${i}">
                        <div onclick="deleteItemFromList('${lists}','${tmdbId}','#list-item-${lists}-${i}', true)">
                            <i class="list-item-delete material-icons delete-list-icon">delete</i>
                        </div>
                        <div class="list-item-rating">${rating}</div>
                        <div class="list-item-title" onclick="fetchMediaData('${mediaType}',${tmdbId})">
                            <span class="list-title">${title}</span>  (${date})
                        </div>
                    </div>
                `;
            } ;
            userList += `</div>`;
            userLists.innerHTML += userList;
            i++; 
        };
    }
    else {

        // IF NO LISTS EXIST - SHOW NO LIST TEXT
        showNoListsText();
    }
};



/*
==============================
    SAMPLE LIST DATA
==============================
*/

function showNoListsText() {
    userLists.innerHTML = `
        <p class="list-heading">
            You don't have any created lists<br />
            <span class="show-sample-lists" onclick="sampleLists()">Click here</span> 
            for sample lists
        </p>
    `;
};


// AFTER CLICK - SET SAMPLE DATA INTO LOCAL STORAGE
// CHAIN EVENTS TO PARSE AND ADD TO LOCAL STATE
// CALL SHOW LISTS - CONTENT SHOULD APPEAR
function sampleLists() {
    localStorage.setItem('movielist:userlists', sampleData);
    parseLocalStorageLists();
    showMyLists();
    fadeIn('#user-lists');
};



/*
==============================
    PAGINATION 
==============================
*/

// REVISITED A FEW TIMES
// FOUND BETTER STRATEGY RELATING TO A GOOGLE STYLE PAGINATION METHOD
// APPLIED SIMILAR STRUCTURE TO MY LOGIC
function pagination(primary, secondary, totalPages, page) {
    resetPagination();

    // INDEXS
    let totalBoxes = 5;
    let start;
    let end;

    // CREATE INDEX LOGIC
    // LESS THAN 5 PAGES
    if (totalPages <= totalBoxes) {
        start = 1;
        end = totalPages;
    } 
    else {
        // WHEN ABOVE 5 PAGES
        if (page <= 3) {
            start = 1;
            end = 5
        }
        // IF JUST BELOW TOTAL PAGES
        else if (page > 3 && page < (totalPages - 2)) {
            start = page - 2;
            end = page + 2;
        }
        // END OF TOTAL PAGES
        else {
            start = totalPages - 4;
            end = totalPages;
        };
    };

    // SET A PERMENANT FIRST PAGE
    mainPagination.innerHTML += `
        <span class="pagination-box" onclick="fetchTMDbData('${primary}','${secondary}',${1})">first</span>
    `;

    
    let i = 0;

    //  CREATE PAGE BOXES FROM START OF INDEX TO END OF INDEX
    while ((start + i) <= end) {
        mainPagination.innerHTML += `
            <span class="pagination-box" onclick="fetchTMDbData('${primary}','${secondary}',${start + i})">${start + i}</span>
        `;
        i++;
    };

    // SET A PERMENANT LAST PAGE
    mainPagination.innerHTML += `
        <span class="pagination-box" onclick="fetchTMDbData('${primary}','${secondary}',${totalPages})">last</span>
    `;

    // HIGHLIGHT CURRENT PAGE
    const paginationBox = document.querySelectorAll('.pagination-box');
    for (let i in paginationBox) {
        if (page == paginationBox[i].innerText) {
            paginationBox[i].style.backgroundColor = '#333';
        };
    };
};



/*
==============================
    UDATE POSTER ICON
==============================
*/

// AFTER ADDING / REMOVING FROM A LIST - UPDATE POSTER ICON STATUS
function checkIfCollectionChanged(tmdbId) {
    const icons = document.querySelectorAll('.is-in-collection');
    icons.forEach(icon => {
        const dataTmdbId = parseInt(icon.dataset.tmdbid) || 0;

        if (dataTmdbId == tmdbId) {
            const isInCollection = checkIfInCollection(tmdbId);
            if (isInCollection) icon.style.color = 'crimson';
            else icon.style.color = '#222';
        }
    });
};













/*
==================================================================
    TMDB / API ROUTES
==================================================================
*/

// TMDB URLS
const API_KEY = '?api_key=d41fd9978486321b466e29bfec203902';
const MOVIES = 'https://api.themoviedb.org/3/movie/';
const TVSHOWS = 'https://api.themoviedb.org/3/tv/';
const SEARCH = 'https://api.themoviedb.org/3/search/multi';
const LANGUAGE = '&language=en-US';
const POSTER = 'https://image.tmdb.org/t/p/w200';
const BACKDROP = 'https://image.tmdb.org/t/p/w1280/';
const DEFAULT_BACKDROP = 'https://www.themoviedb.org/assets/1/v4/logos/408x161-powered-by-rectangle-blue-10d3d41d2a0af9ebcb85f7fb62ffb6671c15ae8ea9bc82a2c6941f223143409e.png';
const DEFAULT_POSTER = 'https://www.themoviedb.org/assets/1/v4/logos/408x161-powered-by-rectangle-blue-10d3d41d2a0af9ebcb85f7fb62ffb6671c15ae8ea9bc82a2c6941f223143409e.png';
let url;
let data;



/*
==============================
    FETCH MAIN TMDB CONTENT
==============================
*/

function fetchTMDbData(primary, secondary, page = 1) {

    // GET MEDIA TYPE
    if (primary == 'movies') url = MOVIES;
    else if (primary == 'tvshows') url = TVSHOWS;

    // MAKE REQUEST WITH HEADERS
    fetch(`${url}${secondary}${API_KEY}${LANGUAGE}&page=${+page}`, 
    {
        headers: new Headers ({ 'Accept': 'application/json'})
    })
    .then(response => {
        return response.text();
    })
    .then(text => {
        data = JSON.parse(text);
        showContentResults(data.results);
        pagination(primary, secondary, data.total_pages, page);
    })
    .catch(err => {
        console.log(err);
    });
};



/*
================================
    FETCH FULL MEDIA CONTENT
================================
*/

function fetchMediaData(mediaType, tmdbId) {
    
    // GET MEDIA TYPE
    if (mediaType == 'movie') url = MOVIES;
    else url = TVSHOWS;

    // MAKE REQUEST WITH HEADERS
    fetch(`${url}${tmdbId}${API_KEY}${LANGUAGE}&append_to_response=videos`, 
    {
        headers: new Headers ({ 'Accept': 'application/json'})
    })
    .then(response => {
        return response.text();
    })
    .then(text => {
        data = JSON.parse(text);
        showFullMediaContent(data);
    })
    .catch(err => {
        console.log(err);
    });
};



/*
==============================
    FETCH SEARCH CONTENT
==============================
*/

function getTMDbSearchData(searchQuery) {

    // MAKE REQUEST WITH HEADERS
    fetch(`${SEARCH}${API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`, 
    {
        headers: new Headers ({ 'Accept': 'application/json'})
    })
    .then(response => {
        return response.text();
    })
    .then(text => {
        data = JSON.parse(text);
        resetSearchResults();
        showSearchResults(data.results);
    })
    .catch(err => {
        console.log(err);
    });
};




/*
==================================================================
    SAMPLE LIST DATA
==================================================================
*/

const mylists = {
    movies: [
      {
        "vote_count": 1497,
        "id": 335983,
        "video": false,
        "vote_average": 6.6,
        "title": "Venom",
        "popularity": 401.758,
        "poster_path": "/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg",
        "original_language": "en",
        "original_title": "Venom",
        "genre_ids": [
          878,
          28,
          80,
          28,
          27
        ],
        "backdrop_path": "/VuukZLgaCrho2Ar8Scl9HtV3yD.jpg",
        "adult": false,
        "overview": "When Eddie Brock acquires the powers of a symbiote, he will have to release his alter-ego \"Venom\" to save his life.",
        "release_date": "2018-10-03"
      },
      {
        "vote_count": 922,
        "id": 332562,
        "video": false,
        "vote_average": 7.5,
        "title": "A Star Is Born",
        "popularity": 196.325,
        "poster_path": "/wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg",
        "original_language": "en",
        "original_title": "A Star Is Born",
        "genre_ids": [
          18,
          10402,
          10749
        ],
        "backdrop_path": "/840rbblaLc4SVxm8gF3DNdJ0YAE.jpg",
        "adult": false,
        "overview": "Seasoned musician Jackson Maine discovers—and falls in love with—struggling artist Ally. She has just about given up on her dream to make it big as a singer—until Jack coaxes her into the spotlight. But even as Ally's career takes off, the personal side of their relationship is breaking down, as Jack fights an ongoing battle with his own internal demons.",
        "release_date": "2018-10-03"
      },
      {
        "vote_count": 533,
        "id": 445651,
        "video": false,
        "vote_average": 6.8,
        "title": "The Darkest Minds",
        "popularity": 83.035,
        "poster_path": "/94RaS52zmsqaiAe1TG20pdbJCZr.jpg",
        "original_language": "en",
        "original_title": "The Darkest Minds",
        "genre_ids": [
          878,
          53
        ],
        "backdrop_path": "/5BxrMNGl3YDiWgHCVJu8iLQoJDM.jpg",
        "adult": false,
        "overview": "After a disease kills 98% of America's children, the surviving 2% develop superpowers and are placed in internment camps. A 16-year-old girl escapes her camp and joins a group of other teens on the run from the government.",
        "release_date": "2018-08-02"
      },
      {
        "vote_count": 639,
        "id": 346910,
        "video": false,
        "vote_average": 5.3,
        "title": "The Predator",
        "popularity": 167.001,
        "poster_path": "/wMq9kQXTeQCHUZOG4fAe5cAxyUA.jpg",
        "original_language": "en",
        "original_title": "The Predator",
        "genre_ids": [
          27,
          878,
          28,
          53
        ],
        "backdrop_path": "/f4E0ocYeToEuXvczZv6QArrMDJ.jpg",
        "adult": false,
        "overview": "From the outer reaches of space to the small-town streets of suburbia, the hunt comes home. Now, the universe’s most lethal hunters are stronger, smarter and deadlier than ever before, having genetically upgraded themselves with DNA from other species. When a young boy accidentally triggers their return to Earth, only a ragtag crew of ex-soldiers and a disgruntled science teacher can prevent the end of the human race.",
        "release_date": "2018-09-13"
      },
      {
        "vote_count": 8889,
        "id": 299536,
        "video": false,
        "vote_average": 8.3,
        "title": "Avengers: Infinity War",
        "popularity": 145.885,
        "poster_path": "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
        "original_language": "en",
        "original_title": "Avengers: Infinity War",
        "genre_ids": [
          12,
          878,
          28,
          14
        ],
        "backdrop_path": "/lmZFxXgJE3vgrciwuDib0N8CfQo.jpg",
        "adult": false,
        "overview": "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
        "release_date": "2018-04-25"
      },
      {
        "vote_count": 147,
        "id": 424139,
        "video": false,
        "vote_average": 6.6,
        "title": "Halloween",
        "popularity": 131.422,
        "poster_path": "/lNkDYKmrVem1J0aAfCnQlJOCKnT.jpg",
        "original_language": "en",
        "original_title": "Halloween",
        "genre_ids": [
          27
        ],
        "backdrop_path": "/hO1oTBGNxO5fBKVEuWnSpICJH7c.jpg",
        "adult": false,
        "overview": "Laurie Strode comes to her final confrontation with Michael Myers, the masked figure who has haunted her since she narrowly escaped his killing spree on Halloween night four decades ago.",
        "release_date": "2018-10-18"
      },
      {
        "vote_count": 2912,
        "id": 363088,
        "video": false,
        "vote_average": 7,
        "title": "Ant-Man and the Wasp",
        "popularity": 124.999,
        "poster_path": "/rv1AWImgx386ULjcf62VYaW8zSt.jpg",
        "original_language": "en",
        "original_title": "Ant-Man and the Wasp",
        "genre_ids": [
          28,
          12,
          878,
          10749,
          35,
          10751
        ],
        "backdrop_path": "/6P3c80EOm7BodndGBUAJHHsHKrp.jpg",
        "adult": false,
        "overview": "Just when his time under house arrest is about to end, Scott Lang puts again his freedom at risk to help Hope van Dyne and Dr. Hank Pym dive into the quantum realm and try to accomplish, against time and any chance of success, a very dangerous rescue mission.",
        "release_date": "2018-07-04"
      },
      {
        "vote_count": 268,
        "id": 369972,
        "video": false,
        "vote_average": 7.3,
        "title": "First Man",
        "popularity": 123.269,
        "poster_path": "/i91mfvFcPPlaegcbOyjGgiWfZzh.jpg",
        "original_language": "en",
        "original_title": "First Man",
        "genre_ids": [
          36,
          18
        ],
        "backdrop_path": "/z1FkoHO7bz40S4JiptWHSYoPpxq.jpg",
        "adult": false,
        "overview": "A look at the life of the astronaut, Neil Armstrong, and the legendary space mission that led him to become the first man to walk on the Moon on July 20, 1969.",
        "release_date": "2018-10-11"
      },
      {
        "vote_count": 1177,
        "id": 439079,
        "video": false,
        "vote_average": 5.8,
        "title": "The Nun",
        "popularity": 108.868,
        "poster_path": "/sFC1ElvoKGdHJIWRpNB3xWJ9lJA.jpg",
        "original_language": "en",
        "original_title": "The Nun",
        "genre_ids": [
          27,
          9648,
          53
        ],
        "backdrop_path": "/fgsHxz21B27hOOqQBiw9L6yWcM7.jpg",
        "adult": false,
        "overview": "When a young nun at a cloistered abbey in Romania takes her own life, a priest with a haunted past and a novitiate on the threshold of her final vows are sent by the Vatican to investigate. Together they uncover the order’s unholy secret. Risking not only their lives but their faith and their very souls, they confront a malevolent force in the form of the same demonic nun that first terrorized audiences in “The Conjuring 2,” as the abbey becomes a horrific battleground between the living and the damned.",
        "release_date": "2018-09-05"
      },
      {
        "vote_count": 266,
        "id": 454992,
        "video": false,
        "vote_average": 6.5,
        "title": "The Spy Who Dumped Me",
        "popularity": 104.198,
        "poster_path": "/2lIr27lBdxCpzYDl6WUHzzD6l6H.jpg",
        "original_language": "en",
        "original_title": "The Spy Who Dumped Me",
        "genre_ids": [
          28,
          35,
          12
        ],
        "backdrop_path": "/uN6v3Hz4qI2CIqT1Ro4vPgAbub3.jpg",
        "adult": false,
        "overview": "Audrey and Morgan are best friends who unwittingly become entangled in an international conspiracy when one of the women discovers the boyfriend who dumped her was actually a spy.",
        "release_date": "2018-08-02"
      }
    ],
    tv_shows: [
      {
        "original_name": "The Flash",
        "genre_ids": [
          18,
          10765
        ],
        "name": "The Flash",
        "popularity": 186.911,
        "origin_country": [
          "US"
        ],
        "vote_count": 2304,
        "first_air_date": "2014-10-07",
        "backdrop_path": "/mmxxEpTqVdwBlu5Pii7tbedBkPC.jpg",
        "original_language": "en",
        "id": 60735,
        "vote_average": 6.7,
        "overview": "After a particle accelerator causes a freak storm, CSI Investigator Barry Allen is struck by lightning and falls into a coma. Months later he awakens with the power of super speed, granting him the ability to move through Central City like an unseen guardian angel. Though initially excited by his newfound powers, Barry is shocked to discover he is not the only \"meta-human\" who was created in the wake of the accelerator explosion -- and not everyone is using their new powers for good. Barry partners with S.T.A.R. Labs and dedicates his life to protect the innocent. For now, only a few close friends and associates know that Barry is literally the fastest man alive, but it won't be long before the world learns what Barry Allen has become...The Flash.",
        "poster_path": "/fki3kBlwJzFp8QohL43g9ReV455.jpg"
      },
      {
        "original_name": "The Walking Dead",
        "genre_ids": [
          18,
          10759,
          10765
        ],
        "name": "The Walking Dead",
        "popularity": 111.067,
        "origin_country": [
          "US"
        ],
        "vote_count": 3725,
        "first_air_date": "2010-10-31",
        "backdrop_path": "/xVzvD5BPAU4HpleFSo8QOdHkndo.jpg",
        "original_language": "en",
        "id": 1402,
        "vote_average": 7.3,
        "overview": "Sheriff's deputy Rick Grimes awakens from a coma to find a post-apocalyptic world dominated by flesh-eating zombies. He sets out to find his family and encounters many other survivors along the way.",
        "poster_path": "/yn7psGTZsHumHOkLUmYpyrIcA2G.jpg"
      },
      {
        "original_name": "Marvel's Iron Fist",
        "genre_ids": [
          80,
          18,
          10759,
          10765
        ],
        "name": "Marvel's Iron Fist",
        "popularity": 101.916,
        "origin_country": [
          "US"
        ],
        "vote_count": 695,
        "first_air_date": "2017-03-17",
        "backdrop_path": "/xHCfWGlxwbtMeeOnTvxUCZRGnkk.jpg",
        "original_language": "en",
        "id": 62127,
        "vote_average": 6.1,
        "overview": "Danny Rand resurfaces 15 years after being presumed dead. Now, with the power of the Iron Fist, he seeks to reclaim his past and fulfill his destiny.",
        "poster_path": "/nv4nLXbDhcISPP8C1mgaxKU50KO.jpg"
      },
      {
        "original_name": "The Big Bang Theory",
        "genre_ids": [
          35
        ],
        "name": "The Big Bang Theory",
        "popularity": 100.293,
        "origin_country": [
          "US"
        ],
        "vote_count": 3335,
        "first_air_date": "2007-09-24",
        "backdrop_path": "/nGsNruW3W27V6r4gkyc3iiEGsKR.jpg",
        "original_language": "en",
        "id": 1418,
        "vote_average": 6.8,
        "overview": "The Big Bang Theory is centered on five characters living in Pasadena, California: roommates Leonard Hofstadter and Sheldon Cooper; Penny, a waitress and aspiring actress who lives across the hall; and Leonard and Sheldon's equally geeky and socially awkward friends and co-workers, mechanical engineer Howard Wolowitz and astrophysicist Raj Koothrappali. The geekiness and intellect of the four guys is contrasted for comic effect with Penny's social skills and common sense.",
        "poster_path": "/ooBGRQBdbGzBxAVfExiO8r7kloA.jpg"
      },
      {
        "original_name": "Grey's Anatomy",
        "genre_ids": [
          18
        ],
        "name": "Grey's Anatomy",
        "popularity": 91.075,
        "origin_country": [
          "US"
        ],
        "vote_count": 802,
        "first_air_date": "2005-03-27",
        "backdrop_path": "/y6JABtgWMVYPx84Rvy7tROU5aNH.jpg",
        "original_language": "en",
        "id": 1416,
        "vote_average": 6.3,
        "overview": "Follows the personal and professional lives of a group of doctors at Seattle’s Grey Sloan Memorial Hospital.",
        "poster_path": "/mgOZSS2FFIGtfVeac1buBw3Cx5w.jpg"
      },
      {
        "original_name": "Arrow",
        "genre_ids": [
          80,
          18,
          9648,
          10759
        ],
        "name": "Arrow",
        "popularity": 90.244,
        "origin_country": [
          "US"
        ],
        "vote_count": 1989,
        "first_air_date": "2012-10-10",
        "backdrop_path": "/dKxkwAJfGuznW8Hu0mhaDJtna0n.jpg",
        "original_language": "en",
        "id": 1412,
        "vote_average": 6,
        "overview": "Spoiled billionaire playboy Oliver Queen is missing and presumed dead when his yacht is lost at sea. He returns five years later a changed man, determined to clean up the city as a hooded vigilante armed with a bow.",
        "poster_path": "/mo0FP1GxOFZT4UDde7RFDz5APXF.jpg"
      },
      {
        "original_name": "Supernatural",
        "genre_ids": [
          18,
          9648,
          10765
        ],
        "name": "Supernatural",
        "popularity": 78.692,
        "origin_country": [
          "US"
        ],
        "vote_count": 1587,
        "first_air_date": "2005-09-13",
        "backdrop_path": "/koMUCyGWNtH5LXYbGqjsUwvgtsT.jpg",
        "original_language": "en",
        "id": 1622,
        "vote_average": 7.2,
        "overview": "When they were boys, Sam and Dean Winchester lost their mother to a mysterious and demonic supernatural force. Subsequently, their father raised them to be soldiers. He taught them about the paranormal evil that lives in the dark corners and on the back roads of America ... and he taught them how to kill it. Now, the Winchester brothers crisscross the country in their '67 Chevy Impala, battling every kind of supernatural threat they encounter along the way. ",
        "poster_path": "/3iFm6Kz7iYoFaEcj4fLyZHAmTQA.jpg"
      },
      {
        "original_name": "The Simpsons",
        "genre_ids": [
          16,
          35
        ],
        "name": "The Simpsons",
        "popularity": 72.094,
        "origin_country": [
          "US"
        ],
        "vote_count": 1722,
        "first_air_date": "1989-12-17",
        "backdrop_path": "/lnnrirKFGwFW18GiH3AmuYy40cz.jpg",
        "original_language": "en",
        "id": 456,
        "vote_average": 7.1,
        "overview": "Set in Springfield, the average American town, the show focuses on the antics and everyday adventures of the Simpson family; Homer, Marge, Bart, Lisa and Maggie, as well as a virtual cast of thousands. Since the beginning, the series has been a pop culture icon, attracting hundreds of celebrities to guest star. The show has also made name for itself in its fearless satirical take on politics, media and American life in general.",
        "poster_path": "/yTZQkSsxUFJZJe67IenRM0AEklc.jpg"
      },
      {
        "original_name": "Game of Thrones",
        "genre_ids": [
          18,
          10759,
          10765
        ],
        "name": "Game of Thrones",
        "popularity": 56.138,
        "origin_country": [
          "US"
        ],
        "vote_count": 4952,
        "first_air_date": "2011-04-17",
        "backdrop_path": "/gX8SYlnL9ZznfZwEH4KJUePBFUM.jpg",
        "original_language": "en",
        "id": 1399,
        "vote_average": 8.2,
        "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
        "poster_path": "/gwPSoYUHAKmdyVywgLpKKA4BjRr.jpg"
      },
      {
        "original_name": "American Horror Story",
        "genre_ids": [
          18,
          9648,
          10765
        ],
        "name": "American Horror Story",
        "popularity": 55.545,
        "origin_country": [
          "US"
        ],
        "vote_count": 922,
        "first_air_date": "2011-10-05",
        "backdrop_path": "/ilKE2RPD8tkynAOHefX9ZclG1yq.jpg",
        "original_language": "en",
        "id": 1413,
        "vote_average": 6.9,
        "overview": "An anthology horror drama series centering on different characters and locations, including a house with a murderous past, an asylum, a witch coven, a freak show, a hotel, a farmhouse in Roanoke and a cult.",
        "poster_path": "/zheiOgPKDMvYjrCSrMLv8FSNJn4.jpg"
      }
    ]
  };

  // CONVERT OBJECT TO JSON
  // USE AS SAMPLE LISTS WHEN ALL LIST DELETED
  let sampleData = JSON.stringify(mylists);

/*
==================================================================
    INIT APPLICATION / START FUNCTIONS
==================================================================
*/

// PARSE ANY LOCAL STORAGE LISTS INTO LOCAL STATE
// SET ANY GLOBAL EVENT LISTENERS
// CALL NAVIGATION ON DEFAULT PAGE
function init() {
    parseLocalStorageLists();
    setEventListeners();
    nav('movies,popular');
};
init();