class Card {
    constructor(IdTmp, TabTmp, TitleTmp, DescriptionTmp) {
        this.Id = IdTmp;
        this.Tab = TabTmp;
        this.Title = TitleTmp;
        this.Description = DescriptionTmp;
    }

    set Id(value) {
        this._Id = value.toString();
    }
    set Tab(value) {
        this._Tab = value.toString();
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

async function LoadCards() {
    response = await fetch(`/cards`);
    cards = await response.json();
    console.log(cards.data);
    for (const card of cards.data){
        newCard = new Card(card.id, card.tab, card.title, card.description);
        console.log(newCard);
        Cards.push(newCard);
        DisplayCard(newCard);
    }
}

function DisplayCard(card) {
    document.getElementById(`KanbanCards${card._Tab}`).innerHTML +=
    `<div class="Kanban-Card box-bright" id="${card._Id}" ondragstart="drag(event)" draggable="true">
        <a onclick="MoveCard(-1, this)"><-</a>
        <img onclick="DelCard(${card._Id})" class="ImgDelCard" src="Images/trash.png" alt="Delete Card">
        <a onclick="MoveCard(1, this)">-></a></br>
        <div class="Card-Title" id="Title">${card._Title}</div>
        <div class="Card-Description" id="Description">${card._Description}</div>
    </div>`;
}

async function DelCard(cardId) {
    document.getElementById(`${cardId}`).remove();
    Cards.forEach(async card => {
        if (card._Id == cardId) {
            await fetch(`/cards/${card._Id}`, { method: "DELETE" });
            delete Cards[card._Id];
        }
    })
}

function UpdateCardTab(card){
    fetch(`/cards/${card._Id}`, {
        method: "PUT",
        body: JSON.stringify(card),
        headers: { 'Content-Type': 'application/json'}
    })
}

async function ToggleAddCardDialog(TabTmp) {
    document.getElementById("Input-Column").value = TabTmp;
    document.getElementById("AddCardDialog").classList.toggle("hidden");
}

async function AddCardDialog() {
    Cards.push(new Card(Cards.length, document.getElementById("Input-Column").value, document.getElementById("Input-Title").value, document.getElementById("Input-Description").value));

    document.getElementById("Input-Title").value = "";
    document.getElementById("Input-Description").value = "";

    DisplayCard(Cards[Cards.length - 1]);
    await fetch(
        `/cards`,
        {
            method: "POST",
            body: JSON.stringify(Cards[Cards.length - 1]),
            headers: { 'Content-Type': 'application/json'}
        }
    )
    ToggleAddCardDialog();
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
            UpdateCardTab(card);
        }
    });
    el.appendChild(document.getElementById(data));
}

function MoveCard(value, el){
    Cards.forEach(async card => {
        if (card._Id == parseInt(el.parentElement.id)) {
            if (1 <= (parseInt(card._Tab) + parseInt(value)) && 3 >= (parseInt(card._Tab) + parseInt(value))) {
                card._Tab = (parseInt(card._Tab) + parseInt(value)).toString();
                document.getElementById(`KanbanCards${card._Tab}`).appendChild(el.parentElement);
                UpdateCardTab(card);
            }
        }
    });
}

LoadCards();