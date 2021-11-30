function updateDataWithoutDebounce(data) {
    if (window.Worker) {
        const worker = new Worker("data-worker.js");
        worker.onmessage = function (e) {
            data.rows = e.data;
            data.bottomLoader = false;
        }
        worker.postMessage(data);
    }
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