class Card {
    constructor(IdTmp, TabTmp, TitleTmp, DescriptionTmp) {
        this.Id = IdTmp;
        this.Tab = TabTmp;
        this.Title = TitleTmp;
        this.Description = DescriptionTmp;
    }

    set Id(value) {
        this._Id = value;
    }
    set Tab(value) {
        this._Tab = value;
    }
    set Title(value) {
        this._Title = value;
    }
    set Description(value) {
        this._Description = value;
    }

    get Id() {
        return this._Id;
    }
    get Id() {
        return this._Tab;
    }
    get Id() {
        return this._Title;
    }
    get Id() {
        return this._Description;
    }
}

var Cards = [];

function DisplayCard(card) {
    document.getElementById(`KanbanCards${card._Tab}`).innerHTML +=
        `<div class="Kanban-Card box-bright" id="${card._Id}" ondragstart="drag(event)" draggable="true">
        <a class="LeftRightButtons" onclick="MoveCard(-1, this)"><-</a>
        <img onclick="DelCard('${card._Id}')" class="ImgDelCard imgBase" src="Images/trash.png" alt="Delete Card">
        <a class="LeftRightButtons" onclick="MoveCard(1, this)">-></a></br>
        <div class="Card-Title" id="Title">${card._Title}</div>
        <div class="Card-Description" id="Description">${card._Description}</div>
    </div>`;
}

async function LoadCards() {
    response = await fetch(`/cards`);
    cards = await response.json();
    for (const card of cards.data) {
        newCard = new Card(card.id, card.tab, card.title, card.description);
        Cards.push(newCard);
        DisplayCard(newCard);
    }
    document.getElementById("MainWindow").classList.remove("hidden");
    document.getElementById("LoadingWindow").classList.add("hidden");
}

async function DelCard(cardId) {
    await fetch(`/cards/${cardId}`, { method: "DELETE" });
    document.getElementById(`${cardId}`).remove();
    Cards = Cards.filter(c => c._Id !== cardId);
}

function UpdateCard(card) {
    fetch(`/cards/${card._Id}`, {
        method: "PUT",
        body: JSON.stringify(card),
        headers: { 'Content-Type': 'application/json' }
    });
}

async function ToggleAddCardDialog(TabTmp) {
    document.getElementById("Input-Column").value = TabTmp;
    document.getElementById("AddCardDialog").classList.toggle("hidden");
}

async function AddCardFromDialog() {
    var card = {
        tab: document.getElementById("Input-Column").value,
        title: document.getElementById("Input-Title").value,
        description: document.getElementById("Input-Description").value,
    };

    response = await fetch(
        `/cards`,
        {
            method: "POST",
            body: JSON.stringify(card),
            headers: { 'Content-Type': 'application/json' }
        }
    )

    card = await response.json();
    card = card.data;
    card = new Card(card.id, card.tab, card.title, card.description);
    Cards.push(card);
    DisplayCard(card);

    document.getElementById("Input-Title").value = "";
    document.getElementById("Input-Description").value = "";

    document.getElementById("AddCardDialog").classList.add("hidden");
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, el) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    Cards.forEach(async card => {
        if (card._Id == data) {
            card._Tab = el.id.replace("KanbanCards", "");
            console.log(card);
            UpdateCard(card);
        }
    });
    el.appendChild(document.getElementById(data));
}

function MoveCard(value, el) {
    Cards.forEach(async card => {
        if (card._Id == el.parentElement.id) {
            if (1 <= (parseInt(card._Tab) + value) && 3 >= (parseInt(card._Tab) + value)) {
                card._Tab = (parseInt(card._Tab) + value);
                document.getElementById(`KanbanCards${card._Tab}`).appendChild(el.parentElement);
                UpdateCard(card);
            }
        }
    });
}

LoadCards();