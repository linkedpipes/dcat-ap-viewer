export default function setPageTitle(value) {
    let title = "";
    if (PAGE_TITLE_PREFIX !== undefined && PAGE_TITLE_PREFIX !== 0) {
        title += PAGE_TITLE_PREFIX + " ";
    }
    title += value;
    if (PAGE_TITLE_SUFFIX !== undefined && PAGE_TITLE_SUFFIX !== 0) {
        title += " " + PAGE_TITLE_SUFFIX;
    }
    document.title = title;
}

