// Variables
var webNameInput = document.querySelector('#webNameInput');
var webUrlInput = document.querySelector('#webUrlInput');
var webName = document.querySelector('#webName');
var webUrl = document.querySelector('#webUrl');
var addBtn = document.querySelector('#addBtn');
var editBtns;
var delBtns;
var tbody = document.querySelector('#tbody');
var bookmarks = [];
var regExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;


// Load bookmarks from local storage if exists

(function () {
    if (localStorage.getItem('w')) {
        bookmarks = JSON.parse(localStorage.getItem('w'));
        loadData();
    }
})();


// Tooltips for buttons
var tooltips = document.querySelectorAll('.custom-tooltip');
tooltips.forEach(tooltip => {
    new bootstrap.Tooltip(tooltip);
});


// Add button
function add() {
    var url = webUrlInput.value;
    if (url === '' || webNameInput.value === '') {
        alert('Please fill all fields');
        webNameInput.classList.add('is-invalid');
        webUrlInput.classList.add('is-invalid');
    } else if (regExp.test(url) === false) {
        alert('Please add valid url');
        webUrlInput.classList.add('is-invalid');
    } else {
        webNameInput.classList.remove('is-invalid');
        webUrlInput.classList.remove('is-invalid');
        var w = {
            webName: webNameInput.value,
            webUrl: url,
        };
        bookmarks.push(w);
        localStorage.setItem('w', JSON.stringify(bookmarks));
        webUrlInput.value = '';
        webNameInput.value = '';
        loadData();
    }
}
addBtn.addEventListener('click', add);


// Load bookmarks
function loadData() {
    var d = "";
    for (var i = 0; i < bookmarks.length; i++) {

        d += `
            <tr>
                <th id="indexNum" scope="row">${i + 1}</th>
                <td id="webName">${bookmarks[i].webName}</td>
                <td>
                    <a id="webUrl" href="${bookmarks[i].webUrl}" target="_blank">
                         <button id="visitBtn" type="button" class="btn btn-success custom-tooltip" data-bs-placement="top" title="Visit">
                            <i class="fa-regular fa-eye"></i>
                        </button>
                    </a>

                    <button id="delBtn" onclick="del(${i})" class="btn btn-danger custom-tooltip" data-bs-placement="top" title="Delete">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </td>
            </tr>
        `;
    }
    tbody.innerHTML = d;
}

// Delete button
function del(e) {
    bookmarks.splice(e, 1);
    localStorage.setItem('w', JSON.stringify(bookmarks));
    loadData();
}
