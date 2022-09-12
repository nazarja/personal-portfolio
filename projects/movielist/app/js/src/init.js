
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