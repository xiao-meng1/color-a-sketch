handleButtonEvents();
makeUnselectable(document.getElementById("body"));

function handleButtonEvents() {
    const leftButton = document.querySelector("#left-button");
    const body = document.querySelector("body");

    leftButton.addEventListener("mousedown", () => {
        body.addEventListener("mousemove", rotate);

        function rotate(e) {
            const result = -1 * (calculateDegree(e) - 90);
            console.log(result);
            leftButton.style.transform = `rotate(${result}deg)`;
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