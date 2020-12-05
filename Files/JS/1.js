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

Cards.push(new Card(1, 1, "Yes", "Yes is Yes"));
Cards.push(new Card(2, 2, "Yes", "No is Yes"));
Cards.push(new Card(3, 3, "No", "Yes is No"));
Cards.push(new Card(4, 3, "No", "No is No"));
Cards.push(new Card(5, 2, "No", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque bibendum, erat vitae pretium gravida, magna arcu tincidunt risus, vel posuere quam velit quis odio. Morbi tristique tellus sit amet felis consectetur, vitae sagittis mauris bibendum. Maecenas tempor tempus dolor, non gravida urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce tincidunt mi nulla, vel fermentum felis pharetra id. Nulla facilisi. Donec fermentum consequat interdum. Fusce maximus purus diam, nec iaculis mi auctor sit amet. Nunc gravida libero nec ante ultricies, eu egestas."));
Cards.push(new Card(5, 2, "No", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque bibendum, erat vitae pretium gravida, magna arcu tincidunt risus, vel posuere quam velit quis odio. Morbi tristique tellus sit amet felis consectetur, vitae sagittis mauris bibendum. Maecenas tempor tempus dolor, non gravida urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce tincidunt mi nulla, vel fermentum felis pharetra id. Nulla facilisi. Donec fermentum consequat interdum. Fusce maximus purus diam, nec iaculis mi auctor sit amet. Nunc gravida libero nec ante ultricies, eu egestas."));

console.log(Cards);

UpdateCards(Cards);

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
        `<div class="Kanban-Card" id="CardId${card._Id}">
        <div class="Card-Title" id="Title">${card._Title}</div>
        <img class="ImgDelCard" src="Images/trash.png" alt="">
        <div class="Card-Description" id="Description">${card._Description}</div>
    </div>`;
}

function ShowAddCardDialog(TabTmp) {

}

function AddCardDialog() {

}