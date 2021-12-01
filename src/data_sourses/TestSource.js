let worker;
if (window.Worker) {
    worker = new Worker("data-worker.js");
}

function updateDataWithoutDebounce(data) {
    worker.onmessage = function (e) {
        data.rows = e.data;
        data.bottomLoader = false;
    }
    const message = {
        sorts: data.sorts,
        sortsOrder: data.sortsOrder,
        filters: data.filters,
    };
    console.log(message);
    worker.postMessage(message);
}

let timeout;

export function updateData(data) {
    data.bottomLoader = true;
    data.rows = [];

    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    timeout = setTimeout(() => {
        updateDataWithoutDebounce(data);
    }, 1000);
}