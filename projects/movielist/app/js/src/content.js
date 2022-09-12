
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











