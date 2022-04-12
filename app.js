handleLeftButtonEvents();
handleRightButtonEvents();
makeUnselectable(document.getElementById("body"));
updateGrid();

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

function handleLeftButtonEvents() {
    const leftButton = document.querySelector("#left-button");
    const body = document.querySelector("body");

    leftButton.addEventListener("mousedown", () => {
        body.addEventListener("mousemove", rotate);

        function rotate(e) {
            const coordinateDegree = calculateLeftButtonDegree(e)
            const transformDegree = -1 * (coordinateDegree - 90);
            leftButton.style.transform = `rotate(${transformDegree}deg)`;
            changeLeftButtonHue(transformDegree);
        }

        body.addEventListener("mouseup", () => {
            body.removeEventListener("mousemove", rotate);
        });
    });
}

function calculateLeftButtonDegree(e) {
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

function changeLeftButtonHue(transformDegree) {
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

function handleRightButtonEvents() {
    const rightButton = document.querySelector("#right-button");
    const body = document.querySelector("body");

    rightButton.addEventListener("mousedown", () => {
        body.addEventListener("mousemove", rotate);

        function rotate(e) {
            const coordinateDegree = calculateRightButtonDegree(e)
            const transformDegree = -1 * (coordinateDegree - 90);
            rightButton.style.transform = `rotate(${transformDegree}deg)`;
            changeRightButtonSize(coordinateDegree);
        }

        body.addEventListener("mouseup", () => {
            body.removeEventListener("mousemove", rotate);
            removeGridBorder();
        });
    });
}

function calculateRightButtonDegree(e) {
    const innerWidth = window.innerWidth;
    const rightButtonContainer = document.querySelector("#right-button-container");
    const buttonContainerWidth = Number(window.getComputedStyle(rightButtonContainer).width.slice(0, -2));
    const bottomEmpty = document.querySelector("#bottom-empty");
    const bottomEmptyWidth = Number(window.getComputedStyle(bottomEmpty).width.slice(0, -2));
    const deltaX = e.clientX - 1 / 2 * (innerWidth + bottomEmptyWidth + buttonContainerWidth);

    const innerHeight = window.innerHeight;
    const buttonContainerHeight = Number(window.getComputedStyle(rightButtonContainer).height.slice(0, -2));
    const middle = document.querySelector("#middle");
    const middleHeight = Number(window.getComputedStyle(middle).height.slice(0, -2));
    const deltaY = 1 / 2 * (innerHeight + middleHeight + buttonContainerHeight) - e.clientY;

    const rad = Math.atan2(deltaY, deltaX);
    const deg = Math.floor(rad * (180 / Math.PI));

    return deg;
}

function changeRightButtonSize(coordinateDegree) {
    newSketchSize = Math.abs(Math.abs(coordinateDegree) * 2 / 9 - 60);
    document.documentElement.style.setProperty("--sketchSize", newSketchSize);
    updateGrid();
}

function updateGrid() {
    const rightButton = document.querySelector("#right-button");
    const sketchSize = window.getComputedStyle(rightButton).getPropertyValue("--sketchSize");
    const numSquaresPerSide = Math.floor(Math.abs(sketchSize * 9 / 4 - 145));

    const gridContainer = document.querySelector("#grid-container");
    gridContainer.sideLength = Number(window.getComputedStyle(gridContainer).height.slice(0, -2));
    gridContainer.borderWidth = Number(window.getComputedStyle(gridContainer).borderWidth.slice(0, -2));
    
    const square = document.createElement("div");
    square.style.height = (gridContainer.sideLength - 2 * gridContainer.borderWidth) / numSquaresPerSide + "px";
    square.style.width = square.style.height;
    square.classList.add("grid");

    const tempGridContainer = document.createElement("div");
    
    for (let i = 0; i < Math.pow(numSquaresPerSide, 2); i++) {
        tempGridContainer.appendChild(square.cloneNode(false));
    }
    
    gridContainer.replaceChildren(...tempGridContainer.children);
}

function removeGridBorder() {
    const gridContainer = document.querySelectorAll(".grid");
    gridContainer.forEach((grid) => {
        grid.classList.remove("grid");
    })
}