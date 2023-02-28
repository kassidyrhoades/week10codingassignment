class Participant {
    constructor (name, grade) {
        this.name = name;
        this.grade = grade;
    }
}

class Club {
    constructor (id, name) {
        this.id = id;
        this.name = name;
        this.participants = [];
    }
    addParticipant(participant) {
        this.participants.push(participant);
    }
    deleteParticipant(participant) {
        let index = this.participants.indexOf(participant);
        this.participants.splice(index, 1);
    }
}

let clubs = [];
let clubId = 0;

onClick('new-club', () => {
    clubs.push(new Club(clubId++, getValue('select-club')));
    drawDOM();
    console.log(clubs);
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let clubsDiv = document.getElementById('clubs');
    clearElement(clubsDiv);
    for (club of clubs) {
        let table = createClubTable(club);
        let title = document.createElement('h2');
        title.innerHTML = club.name;
        title.appendChild(createDeleteClubButton(club));
        clubsDiv.appendChild(title);
        clubsDiv.appendChild(table);
        for (participant of club.participants) {
            createParticipantRow(club, table, participant);
        }
    }
}

function createParticipantRow(club, table, participant) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = participant.name;
    row.insertCell(1).innerHTML = participant.grade;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(club, participant));
    console.log(row);
}

function createDeleteRowButton(club, participant) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onClick = () => {
        let index = club.participants.indexof(participant);
        club.participants.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteClubButton(club) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Cancel Club';
    btn.onClick = () => {
        let index = clubs.indexof(club);
        clubs.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewParticipantButton(club) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Join';
    btn.onClick = () => {
        club.participants.push(new Participant(getValue(`name-input${club-id}`), getValue(`grade-input${club-id}`)));
        drawDOM();
    };
    return btn;
}

function createClubTable(club) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let gradeColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    gradeColumn.innerHTML = 'Grade';
    row.appendChild(nameColumn);
    row.appendChild(gradeColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let gradeTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${club.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let gradeInput = document.createElement('input');
    gradeInput.setAttribute('id', `grade-input-${club.id}`);
    gradeInput.setAttribute('type', 'text');
    gradeInput.setAttribute('class', 'form-control');
    let newParticipantButton = createNewParticipantButton(club);
    nameTh.appendChild(nameInput);
    gradeTh.appendChild(gradeInput);
    createTh.appendChild(newParticipantButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(gradeTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
