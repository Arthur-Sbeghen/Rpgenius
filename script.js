let data = [
    {
        "id": 1,
        "table": "Rataria da Loucura",
        "attributes": {
            "Vida": "1d5+10",
            "Atletismo": "2d6",
            "Força": "2d2-1",
            "Intelecto": "2d5-2",
            "Sanidade": "20"
        },
        "players": [
            {
                "id": 1,
                "name": "Aldervaldo",
                "attributes": [15, 5, 2, 4, 21]
            }
        ],
        "dice": [20, 100],
        "system": "Call of Cthulhu"
    },
    {
        "id": 2,
        "table": "Dragons and Warriors",
        "attributes": {
            "Vida": "3d6+10",
            "Mana": "1d20",
            "Destreza": "4d4",
            "Força": "3d5",
            "Sabedoria": "2d4"
        },
        "players": [
            {
                "id": 1,
                "name": "Bertonho",
                "attributes": [18, 4, 9, 6, 7]
            },
            {
                "id": 2,
                "name": "Ligma",
                "attributes": [21, 14, 10, 10, 2]
            }
        ],
        "dice": [20],
        "system": "DnD"
    },
    {
        "id": 3,
        "table": "Floresta Sangrenta",
        "attributes": {
            "Vida": "4d8",
            "Sanidade": "30",
            "Agilidade": "4d2",
            "Força": "5",
            "Sabedoria": "1d10"
        },
        "players": [
            {
                "id": 1,
                "name": "João",
                "attributes": [12, 34, 5, 5, 7]
            },
            {
                "id": 2,
                "name": "Felipe",
                "attributes": [10, 28, 7, 6, 8]
            }
        ],
        "dice": [20, 100, 50],
        "system": "Ordem"
    }
]


const forgePlayer = (table, attributes, name) => {
    data.find(t => t.table === table).players.push({
        id: Math.max(0, ...mesa.players.map(p => p.id)) + 1,
        name: name,
        attributes: attributes
    })
}

const summonPlayers = table => { document.querySelector("#listPlayers").innerHTML=data.find(t=>t.table==table).players.map(p=>`<li>${p.name}</li>`).join('') }

const destroyPlayer = (table, id) => {
    let players = data.find(t=>t.table==table).players;
    players = players.filter(p=>p.id!=id);
}

const initTable = () => {
    //...
}

const deleteTable = () => {
    //...
}

const showTables = () => {
    document.querySelector(".rpgTables").innerHTML =
        data.map(t=>`
                    <div class="table" onclick="goToTable(${t.id})" id="${t.id}">
                        <div class="tableName">
                            ${t.table}
                        </div>
                        <div class="tableSystem">
                            ${t.system}
                        </div>
                        <div class="tablePlayers"><span style="font-weight:bold;">
                             ${t.players.length > 1
                                ? t.players.length + "</span> Jogadores"
                                : t.players.length == 1
                                ? t.players.length + "</span> Jogador" : "</span> Sem Jogadores"}
                        </div>
                        </div>`).join('');
}

const rollAttributes = () => {
    //...
}

document.addEventListener("DOMContentLoaded", () => {
    showTables();
    const menuIcon = document.querySelector(".menu-icon");
    const menuClose = document.querySelector(".menu-close");
    const sidebar = document.querySelector(".sidebar");

    menuIcon.addEventListener("click", function () {
        sidebar.classList.add("active");
        document.body.addEventListener("click", () => menuCloseClickHandler());
    });
    
    function menuCloseClickHandler(event) {
        if (!sidebar.contains(event.target) && event.target !== menuIcon) {
            sidebar.classList.remove("active");
            document.body.removeEventListener("click", () => menuCloseClickHandler());
        }
    }
    
    menuClose.addEventListener("click", function (event) {
        sidebar.classList.remove("active");
        document.body.removeEventListener("click", () => menuCloseClickHandler());
        event.stopPropagation();
    });
})


const noReleased = () => {
    return Swal.fire({
        title: "Opa!",
        text: "Esta função ainda não foi criada neste protótipo",
        icon: "warning",
        theme: "dark",
        confirmButtonText: "Ok!",
        confirmButtonColor: "#8a2be2"
    });
}

let oldMain = ""
const goToTable = (id) => {
    let t = data.find(t => t.id == id);
    oldMain = document.querySelector("main").innerHTML;
    document.querySelector("main").innerHTML = `
        <div class="placeReturn"><i onclick="returnToHome()" class="fa-solid fa-arrow-turn-up return"></i></div>
        <h1>${t.table}</h1>
        <h4>${t.system}</h4>
        <div class="players-container">
            ${t.players.map(player => {
                return `
                    <div class="player">
                        <h3>${player.name}</h3>
                        <div class="player-attributes">
                            ${Object.keys(t.attributes).map((attr, index) => {
                                return `
                                    <div class="attribute">
                                        <p><strong>${attr}:</strong> <span>${player.attributes[index]}</span></p>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        <div class="animation-control">
            <label>
                <input type="checkbox" id="animationToggle" checked> 
                Mostrar animação?
            </label>
        </div>
        <div class="dice-buttons">
            ${t.dice.map(die => {
                return `<button type="button" onclick="rollDice(${die})">1d${die}</button>`;
            }).join('')}
        </div>
        <div class="roll-results">(Clique nos botões roxos para ver a mágica. Recomendamos deixar ativada a checkbox)</div>
    `;
}

const rollDice = (sides) => {
    let resultDiv = document.querySelector(".roll-results");
    const animationEnabled = document.getElementById('animationToggle').checked;

    resultDiv.innerHTML = "";

    if (animationEnabled) {
        resultDiv.innerHTML = `
            <svg class="d20-svg rolling" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
                <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="#8a2be2" stroke="#6a1bbf" stroke-width="2" />
                <text x="50" y="55" font-size="30" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">?</text>
            </svg>
        `;

        setTimeout(() => showResult(sides, resultDiv), 1000);
    } else {
        showResult(sides, resultDiv);
    }
};

const showResult = (sides, resultDiv) => {
    let roll = Math.floor(Math.random() * sides) + 1;
    resultDiv.innerHTML = `
        <svg class="d20-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
            <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="#8a2be2" stroke="#6a1bbf" stroke-width="2" />
            <text x="50" y="55" font-size="30" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${roll}</text>
        </svg>
        <p class="dice-result-text">Rolagem: 1d${sides} = ${roll}</p>
    `;
};

const returnToHome = () => document.querySelector("main").innerHTML = oldMain;

Array.from(document.querySelectorAll(".table")).forEach(e => e.addEventListener("click", goToTable(e.id)));