const resetBtn = document.getElementById('reset');

resetBtn.addEventListener('click', () => {
    if(currentLevel==1){
        timeLeft = 45;
    }else if(currentLevel==2){
        timeLeft = 60;
    }else if(currentLevel==3){
        timeLeft = 80;
    }
    document.getElementById('submit').disabled = false;
    startLevel(currentLevel);
});

const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let currentLevel = 1;
const levelData = {
    1: {
        nodeCount: 7,
        treeNodes: [
            { x: 400, y: 50 }, 
            { x: 200, y: 150 }, 
            { x: 600, y: 150 }, 
            { x: 100, y: 250 }, 
            { x: 300, y: 250 }, 
            { x: 500, y: 250 }, 
            { x: 700, y: 250 }
        ]
    },
    2: {
        nodeCount: 12,
        treeNodes: [
            { x: 400, y: 50 }, 
            { x: 200, y: 150 }, 
            { x: 600, y: 150 }, 
            { x: 100, y: 250 }, 
            { x: 300, y: 250 }, 
            { x: 500, y: 250 }, 
            { x: 700, y: 250 }, 
            { x: 50, y: 350 }, 
            { x: 150, y: 350 }, 
            { x: 250, y: 350 }, 
            { x: 350, y: 350 }, 
            { x: 450, y: 350 }
        ]
    },
    3: {
        nodeCount: 15,
        treeNodes: [
            { x: 400, y: 50 }, 
            { x: 200, y: 150 }, 
            { x: 600, y: 150 }, 
            { x: 100, y: 250 }, 
            { x: 300, y: 250 }, 
            { x: 500, y: 250 }, 
            { x: 700, y: 250 }, 
            { x: 50, y: 350 }, 
            { x: 150, y: 350 }, 
            { x: 250, y: 350 }, 
            { x: 350, y: 350 }, 
            { x: 450, y: 350 }, 
            { x: 550, y: 350 }, 
            { x: 650, y: 350 }, 
            { x: 750, y: 350 }, 
            // { x: 100, y: 450 }, 
            // { x: 200, y: 450 }, 
            // { x: 300, y: 450 }
        ]
    }
};

let timer; 
let timeLeft = 45; 

const timerDisplay = document.getElementById('timerDisplay');
timerDisplay.innerText = `Time Left: ${timeLeft}s`;

//Start the timer
function startTimer() {
    clearInterval(timer); // Clear any existing timer
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Time is up! You cannot submit the game.');
            disableSubmission(); // Call function to disable submission
        }
    }, 1000);
}

function disableSubmission() {
    document.getElementById('submit').disabled = true; // Disable submit button
}

let draggedNode = null; // Variable to store the currently dragged node
let offsetX, offsetY; // To store the touch offset

// Touch dragging functions for mobile devices
function handleTouchStart(e) {
    const touch = e.touches[0]; // Get the first touch point
    draggedNode = e.target; // Set the dragged node
    offsetX = touch.clientX - draggedNode.getBoundingClientRect().left; // Calculate X offset
    offsetY = touch.clientY - draggedNode.getBoundingClientRect().top; // Calculate Y offset
    e.preventDefault(); // Prevent scrolling while dragging
}

function handleTouchMove(e) {
    if (draggedNode) {
        const touch = e.touches[0]; // Get the current touch point
        draggedNode.style.position = 'absolute'; // Set position to absolute for dragging
        draggedNode.style.left = (touch.clientX - offsetX) + 'px'; // Update left position
        draggedNode.style.top = (touch.clientY - offsetY) + 'px'; // Update top position
    }
    e.preventDefault(); // Prevent scrolling during touch move
}

function handleTouchEnd(e) {
    if (draggedNode) {
        const touch = e.changedTouches[0]; // Get the touch point that ended
        const dropX = touch.clientX - canvas.getBoundingClientRect().left; // Calculate drop X position
        const dropY = touch.clientY - canvas.getBoundingClientRect().top; // Calculate drop Y position

        const nearestNode = findNearestTreeNode(dropX, dropY); // Find nearest tree node

        if (nearestNode && Math.sqrt((dropX - nearestNode.x) ** 2 + (dropY - nearestNode.y) ** 2) < 40) {
            // If the drop is near a node, draw it
            ctx.beginPath();
            ctx.arc(nearestNode.x, nearestNode.y, 30, 0, Math.PI * 2);
            ctx.fillStyle = 'lightcoral';
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#fff';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(draggedNode.innerText, nearestNode.x, nearestNode.y);

            nearestNode.value = draggedNode.innerText; // Set the value of the nearest node
            draggedNode.parentNode.removeChild(draggedNode); // Remove the dragged node from the DOM
        }

        draggedNode = null; // Reset the dragged node
    }
}

// Attach touch event listeners to each draggable node in the initialization function
function initializeNodes() {
    document.querySelectorAll('.draggable-node').forEach((node) => {
        node.addEventListener('touchstart', handleTouchStart);
        node.addEventListener('touchmove', handleTouchMove);
        node.addEventListener('touchend', handleTouchEnd);
    });
}

// Call initializeNodes after creating nodes in your existing code


// let draggedNode = null;
let treePositions = [];

// Initialize first level
startLevel(currentLevel);

// Function to start the level
function startLevel(level) {
    resetCanvas();
    startTimer(); // Start the timer
    treePositions = levelData[level].treeNodes;
    const nodeCount = levelData[level].nodeCount;

    // Generate random nodes for this level
    const randomValues = generateRandomValues(nodeCount);
    document.getElementById('node-pool').innerHTML = ''; // Clear previous nodes

    randomValues.forEach((value, index) => {
        const node = document.createElement('div');
        node.className = 'draggable-node';
        node.id = `node${index + 1}`;
        node.innerText = value;
        node.draggable = true;
        document.getElementById('node-pool').appendChild(node);

        // Add drag event listeners
        node.addEventListener('dragstart', (e) => {
            draggedNode = e.target;
            setTimeout(() => e.target.style.display = 'none', 0);
        });

        node.addEventListener('dragend', (e) => {
            setTimeout(() => {
                e.target.style.display = 'block';
                draggedNode = null;
            }, 0);
        });
    });

    drawTree(); // Draw initial empty tree structure
}

//Function to generate random values for nodes
function generateRandomValues(n) {
    const values = [];
    while (values.length < n) {
        const val = Math.floor(Math.random() * 100) + 1;
        if (!values.includes(val)) values.push(val);
    }
    return values;
}

// Function to draw the tree structure
function drawTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections between tree positions (binary tree)
    ctx.beginPath();
    treePositions.forEach((pos, i) => {
        if (i > 0) {
            const parentIndex = Math.floor((i - 1) / 2);
            ctx.moveTo(pos.x, pos.y);
            ctx.lineTo(treePositions[parentIndex].x, treePositions[parentIndex].y);
        }
    });
    ctx.stroke();

    // Draw nodes
    treePositions.forEach((pos) => {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 30, 0, Math.PI * 2);
        ctx.fillStyle = '#ADD8E6';
        ctx.fill();
        ctx.stroke();
    });
}

// Canvas drop area
canvas.addEventListener('dragover', (e) => e.preventDefault());
canvas.addEventListener('drop', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    // Find nearest tree node position
    let nearestNode = null;
    let minDist = Infinity;

    treePositions.forEach((pos) => {
        const dist = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
        if (dist < minDist) {
            minDist = dist;
            nearestNode = pos;
        }
    });

    // If close enough to a node, place the dragged number
    if (nearestNode && minDist < 40) {
        ctx.beginPath();
        ctx.arc(nearestNode.x, nearestNode.y, 30, 0, Math.PI * 2);
        ctx.fillStyle = 'lightcoral'; // Node color
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(draggedNode.innerText, nearestNode.x, nearestNode.y);

        nearestNode.value = draggedNode.innerText; // Store node value
        draggedNode.parentNode.removeChild(draggedNode); // Remove node from pool
    }
});

function checkAllNodesPlaced() {
    if(document.getElementById("node-pool").innerHTML.trim()==''){
        return false;
    }else{
        return true;
    }
}

function calculateScore(level){
    if(level==1){
        if(timeLeft>=30){
            return 10;
        }else if(timeLeft>=25){
            return 9;
        }else if(timeLeft>=20){
            return 8;
        }else if(timeLeft>=15){
            return 7;
        }else if(timeLeft>=7){
            return 6;
        }else{
            return 5;
        }
    }else if(level==2){
        if(timeLeft>=40){
            return 10;
        }else if(timeLeft>=35){
            return 9;
        }else if(timeLeft>=30){
            return 8;
        }else if(timeLeft>=25){
            return 7;
        }else if(timeLeft>=15){
            return 6;
        }else{
            return 5;
        }
    }else if(level==3){
        if(timeLeft>=60){
            return 10;
        }else if(timeLeft>=50){
            return 9;
        }else if(timeLeft>=40){
            return 8;
        }else if(timeLeft>=30){
            return 7;
        }else if(timeLeft>=20){
            return 6;
        }else{
            return 5;
        }
    }
}

function completeLevel(score, level, game) {
    const email = localStorage.getItem('email');

    fetch('https://dsa-launchpad-5-0.vercel.app/update-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ score: score, level: level, game: game, email: email }) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Score updated successfully:", data.newScore);
        } else {
            console.error("Failed to update score:", data.message);
        }
    })
    .catch(error => console.error("Error updating score:", error));
}


//Validate if the structure is a valid Binary Search Tree
let score = 0;
document.getElementById('submit').addEventListener('click', () => {
    if(checkAllNodesPlaced()){
        alert('Please place all nodes on the tree before submitting.');
        return;
    }
    const tree = buildTreeStructure();
    if (validateBST(tree)) {
        document.getElementById('result').innerText = 'Success! You built a valid Binary Search Tree!';
        clearInterval(timer); // Stop the timer
        score = calculateScore(currentLevel);
        completeLevel(score, currentLevel, 'BST-Builder');
        if (currentLevel < 3) {
            currentLevel++;
            if(currentLevel==2){
                timeLeft = 60;
            }else if(currentLevel==3){
                timeLeft = 80;
            }
            alert(`Level ${currentLevel - 1} completed! Moving to Level ${currentLevel}.`);
            startLevel(currentLevel); // Start next level
        } else {
            alert('Congratulations! You completed all levels!');
        }
    } else {
        document.getElementById('result').innerText = 'Invalid BST. Try again!';
    }
});

//Function to validate BST
function validateBST(root) {
    function validate(node, min, max) {
        if (!node) return true;
        if ((min !== null && node.value <= min) || (max !== null && node.value >= max)) return false;
        return validate(node.left, min, node.value) && validate(node.right, node.value, max);
    }
    return validate(root, null, null);
}

// Function to build the tree structure from node values
function buildTreeStructure() {
    const tree = {};
    treePositions.forEach((node, index) => {
        if (node.value !== undefined) {
            tree[index] = { value: parseInt(node.value), left: null, right: null };
        }
    });
    // Assign left and right children based on the binary tree structure
    if (tree[0]) {
        tree[0].left = tree[1] || null;
        tree[0].right = tree[2] || null;
        if (tree[1]) {
            tree[1].left = tree[3] || null;
            tree[1].right = tree[4] || null;
        }
        if (tree[2]) {
            tree[2].left = tree[5] || null;
            tree[2].right = tree[6] || null;
        }
    }
    return tree[0] || null;
}

// Function to reset canvas and prepare for the next level
function resetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('result').innerText = ''; // Clear result text
}