function checkNumber(num, filter) {
    if (!filter) {
        return true;
    }

    let [left, right] = filter.split(":");

    return (!left || +num >= +left) && (!right || +num <= +right);
}

function checkString(str, filter) {
    if (!filter) {
        return true;
    }

    return str;
}

onmessage = async function (e) {
    const response = await fetch("data.json");
    const data = await response.json();

    const sorts = e.data.sorts;
    const sortsOrder = e.data.sortsOrder;
    const filters = e.data.filters;

    if ("id" in filters) {

    }

    const filtered = data.filter((item) => {
        for (filter of filters) {
            if
        }
    })
}