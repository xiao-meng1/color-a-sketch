handleButtonEvents();
makeUnselectable(document.getElementById("body"));
insertGrid();

function handleButtonEvents() {
    const leftButton = document.querySelector("#left-button");
    const body = document.querySelector("body");

    leftButton.addEventListener("mousedown", () => {
        body.addEventListener("mousemove", rotate);

        function rotate(e) {
            const transformDegree = -1 * (calculateDegree(e) - 90);
            leftButton.style.transform = `rotate(${transformDegree}deg)`;
            changeButtonHue(transformDegree);
        }

        body.addEventListener("mouseup", () => {
            body.removeEventListener("mousemove", rotate);
        });
    });
}

function makeUnselectable(node) {
    if (node.nodeType ===1) {
        node.classList.add("unselectable");
    }

    let child = node.firstChild;

    while (child) {
        makeUnselectable(child);
        child = child.nextSibling;
    }
}

function calculateDegree(e) {
    const innerWidth = window.innerWidth;
    const leftButtonContainer = document.querySelector("#left-button-container");
    const buttonContainerWidth = Number(window.getComputedStyle(leftButtonContainer).width.slice(0, -2));
    const bottomEmpty = document.querySelector("#bottom-empty");
    const bottomEmptyWidth = Number(window.getComputedStyle(bottomEmpty).width.slice(0, -2));
    const deltaX = e.clientX - 1 / 2 * (innerWidth - bottomEmptyWidth - buttonContainerWidth);

    const innerHeight = window.innerHeight;
    const buttonContainerHeight = Number(window.getComputedStyle(leftButtonContainer).height.slice(0, -2));
    const middle = document.querySelector("#middle");
    const middleHeight = Number(window.getComputedStyle(middle).height.slice(0, -2));
    const deltaY = 1 / 2 * (innerHeight + middleHeight + buttonContainerHeight) - e.clientY;

    const rad = Math.atan2(deltaY, deltaX);
    const deg = Math.floor(rad * (180 / Math.PI));

    return deg;
}

function changeButtonHue(transformDegree) {
    let hueDegree;
    let newhsl;

    if (transformDegree < 0) {
        hueDegree = (-1 * transformDegree) + 270;
    }
    else {
        hueDegree = transformDegree;
    }

    newhsl = `hsl(${hueDegree}, 100%, 50%)`;
    document.documentElement.style.setProperty("--sketchColor", newhsl);
}

function insertGrid() {
    const numberOfSquares = 100;
    const square = document.createElement("div");
    const gridContainer = document.querySelector("#grid-container");
    gridContainer.sideLength = Number(window.getComputedStyle(gridContainer).height.slice(0, -2));
    gridContainer.borderWidth = Number(window.getComputedStyle(gridContainer).borderWidth.slice(0, -2));

    square.style.height = (gridContainer.sideLength - 2 * gridContainer.borderWidth) / Math.sqrt(numberOfSquares) + "px";
    square.style.width = square.style.height;
    for (let i = 0; i < numberOfSquares; i++) {
        gridContainer.appendChild(square.cloneNode(false));
    }
}