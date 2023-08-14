// variables
let count = 0;
let hasStarted = false;
let startDate;
let countArr = [];

// buttons
const historyBtn = document.querySelector("#history-btn");
const backBtn = document.querySelector("#back-btn");
const clearBtn = document.querySelector("#clear-btn");
const countBtn = document.querySelector("#count");
const saveBtn = document.querySelector("#save");

// sections
const main = document.querySelector("#main");
const history = document.querySelector("#history");

const countSpan = document.querySelector("#count-span");
// const historySpan = document.querySelector("#history-span");
const historySpans = document.querySelectorAll(".history-span");
const template = document.querySelector("#historyRow");

historyBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    main.classList.add('d-none');
    history.classList.remove('d-none');
});

backBtn.addEventListener('click', (evt) => {
    main.classList.remove('d-none');
    history.classList.add('d-none');

});

countBtn.addEventListener('click', (evt) => {
    if (!hasStarted) {
        startDate = new Date();
        hasStarted = true;
    }
    count += 1;
    countSpan.textContent = count;
});

saveBtn.addEventListener('click', (evt) => {
    if(!hasStarted) {
        return;
    }

    countArr.push({
        count: count,
        startDate: startDate,
        endDate: new Date()
    });

    hasStarted = false;
    count = 0;
    countSpan.textContent = count;
    // historySpan.textContent = `(${countArr.length})`;

    historySpans.forEach(historySpan => {
        historySpan.textContent = `(${countArr.length})`;
    })

    prepareList();
});

clearBtn.addEventListener('click', () => {
    const historyContent = document.querySelector("#history-content");

    count = 0;
    countSpan.textContent = count;

    countArr = [];
    // historySpan.textContent = `(0)`;

    historySpans.forEach(historySpan => {
        historySpan.textContent = `(0)`;
    })

    while(historyContent.firstChild) {
        historyContent.removeChild(historyContent.firstChild)
    }


    main.classList.remove('d-none');
    history.classList.add('d-none');
});

const prepareList = () => {
    const arrayLength = countArr.length;

    const historyContent = document.querySelector("#history-content");
    let historyList = document.querySelector(".history-list");

    while(historyContent.firstChild) {
        historyContent.removeChild(historyContent.firstChild)
    }

    historyList = document.createElement('ol');
    historyList.classList.add('.history-list');

    for (let i = arrayLength - 1; i >= 0; i--) {
        const clone = template.content.cloneNode(true);
        let ps = clone.querySelectorAll("p");
        const startDate = new Date(countArr[i].startDate);
        const endDate = new Date(countArr[i].endDate);

        ps[0].textContent = `Count: ${countArr[i].count}`;
        ps[1].textContent = `Start time: ${startDate.getHours()}:${startDate.getMinutes()}:${startDate.getSeconds()}`;
        ps[2].textContent = `End time: ${endDate.getHours()}:${endDate.getMinutes()}:${endDate.getSeconds()}`;
    
        historyList.appendChild(clone);
    }

    historyContent.appendChild(historyList);

}