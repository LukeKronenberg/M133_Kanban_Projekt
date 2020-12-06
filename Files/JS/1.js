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

function UpdateCards(array) {
    array.forEach(card => {
        if (card._Tab >= 1 && card._Tab <= 3) {
            AddCard(card);
        } else {
            document.querySelector("body").innerHTML = "An unexpected error Ocuured";
        }
    });
}

function AddCard(card) {
    document.getElementById(`KanbanCards${card._Tab}`).innerHTML +=
        `<div class="Kanban-Card box-bright" id="CardId${card._Id}">
        <a onclick=DelCard(${card._Id})><img class="ImgDelCard" src="Images/trash.png" alt=""></a>
        <div class="Card-Title" id="Title">${card._Title}</div>
        <div class="Card-Description" id="Description">${card._Description}</div>
    </div>`;
}

function DelCard(cardId) {
    document.getElementById(`CardId${cardId}`).remove();
    Cards.forEach(async card =>{
        if (card._Id == cardId) {
            delete Cards[card._Id];
        }
    })
}

async function ToggleAddCardDialog(TabTmp) {
    document.getElementById("Input-Column").value = TabTmp;
    document.getElementById("AddCardDialog").classList.toggle("hidden");
}

function AddCardDialog() {
    Cards.push(new Card(Cards.length, document.getElementById("Input-Column").value, document.getElementById("Input-Title").value, document.getElementById("Input-Description").value));

    document.getElementById("Input-Title").value = "";
    document.getElementById("Input-Description").value = "";

    AddCard(Cards[Cards.length - 1]);
    ToggleAddCardDialog();
}