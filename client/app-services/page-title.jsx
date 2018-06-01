const setPageTitle = (value) => {
    let title = "";
    if (CONST_TITLE_PREFIX !== undefined && CONST_TITLE_PREFIX !== 0) {
        title += CONST_TITLE_PREFIX + " ";
    }
    title += value;
    if (CONST_TITLE_SUFFIX !== undefined && CONST_TITLE_SUFFIX !== 0) {
        title += " " + CONST_TITLE_SUFFIX;
    }
    document.title = title;
};

export default setPageTitle;
