function blackhole(element) {
    const container = document.querySelector(element);
    const h = container.offsetHeight;
    const w = container.offsetWidth;
    const cw = w;
    const ch = h;
    const maxorbit = 255; // distance from center
    const centery = ch / 2;
    const centerx = cw / 2;

    const startTime = new Date().getTime();
    let currentTime = 0;

    const stars = [];
    let collapse = false; // if hovered
    let expanse = false; // if clicked
    let returning = false; // if particles are returning to orbit

    // New variables for clickable stars
    const clickableStarsContainer = document.getElementById('clickableStarsContainer');
    const clickableStarsData = [
        { id: 'star1', text: 'About Me', url: 'about.html' },
        { id: 'star2', text: 'Portfolio', url: 'portfolio.html' },
        { id: 'star3', text: 'Contact', url: 'contact.html' },
        // Add more stars as needed
    ];
    let clickableStarElements = []; // To store the actual DOM elements of clickable stars

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = cw;
    canvas.height = ch;
    container.appendChild(canvas);
    const context = canvas.getContext("2d");

    context.globalCompositeOperation = "multiply";

    function setDPI(canvas, dpi) {
        // Set up CSS size if it's not set up already
        if (!canvas.style.width)
            canvas.style.width = canvas.width + 'px';
        if (!canvas.style.height)
            canvas.style.height = canvas.height + 'px';

        const scaleFactor = dpi / 96;
        canvas.width = Math.ceil(canvas.width * scaleFactor);
        canvas.height = Math.ceil(canvas.height * scaleFactor);
        const ctx = canvas.getContext('2d');
        ctx.scale(scaleFactor, scaleFactor);
    }

    function rotate(cx, cy, x, y, angle) {
        const radians = angle;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
        const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
        return [nx, ny];
    }

    setDPI(canvas, 192);

    class Star {
        constructor() {
            // Get a weighted random number, so that the majority of stars will form in the center of the orbit
            const rands = [];
            rands.push(Math.random() * (maxorbit / 2) + 1);
            rands.push(Math.random() * (maxorbit / 2) + maxorbit);

            this.orbital = (rands.reduce((p, c) => p + c, 0) / rands.length);

            this.x = centerx; // All of these stars are at the center x position at all times
            this.y = centery + this.orbital; // Set Y position starting at the center y + the position in the orbit

            this.yOrigin = centery + this.orbital; // this is used to track the particles origin

            this.speed = (Math.floor(Math.random() * 2.5) + 1.5) * Math.PI / 180; // The rate at which this star will orbit
            this.rotation = 0; // current Rotation
            this.startRotation = (Math.floor(Math.random() * 360) + 1) * Math.PI / 180; // Starting rotation

            this.id = stars.length; // This will be used when expansion takes place

            this.collapseBonus = this.orbital - (maxorbit * 0.7); // This "bonus" is used to randomly place some stars outside of the blackhole on hover
            if (this.collapseBonus < 0) { // if the collapse "bonus" is negative
                this.collapseBonus = 0; // set it to 0, this way no stars will go inside the blackhole
            }

            this.color = 'rgba(255,255,255,' + (1 - ((this.orbital) / 255)) + ')'; // Color the star white, but make it more transparent the further out it is generated

            this.hoverPos = centery + (maxorbit / 2) + this.collapseBonus; // Where the star will go on hover of the blackhole

            // --- VISUAL STAR SPREAD (like original request) ---
            const visualVerticalSpread = ch * 0.8;
            const visualHorizontalSpread = cw * 0.8;
            const starIndex = this.id % 2500;
            const numStars = 2500;

            this.expansePos = (ch * 0.1) + (starIndex / numStars) * visualVerticalSpread + (Math.random() * 50 - 25);
            this.expanseX = (cw * 0.1) + (Math.random() * visualHorizontalSpread);

            // --- CLICKABLE STAR SPREAD (50% in) ---
            const clickableSpreadFactor = 0.5;

            const clickableVerticalSpreadRange = ch * 0.8 * clickableSpreadFactor;
            const clickableHorizontalSpreadRange = cw * 0.8 * clickableSpreadFactor;

            const clickableVerticalOffset = (ch - clickableVerticalSpreadRange) / 2;
            const clickableHorizontalOffset = (cw - clickableHorizontalSpreadRange) / 2;

            this.clickableExpanseY = clickableVerticalOffset + (starIndex / numStars) * clickableVerticalSpreadRange + (Math.random() * 50 - 25);
            this.clickableExpanseX = clickableHorizontalOffset + (Math.random() * clickableHorizontalSpreadRange);

            // Initialize current positions for clickable elements, they will move towards their targets
            this.currentClickableX = centerx;
            this.currentClickableY = centery;

            this.prevR = this.startRotation;
            this.prevX = this.x;
            this.prevY = this.y;

            // Store original position for returning
            this.originalY = this.yOrigin;

            stars.push(this);
        }

        draw() {
            if (!expanse && !returning) {
                this.rotation = this.startRotation + (currentTime * this.speed);
                if (!collapse) { // not hovered
                    if (this.y > this.yOrigin) {
                        this.y -= 2.5;
                    }
                    if (this.y < this.yOrigin - 4) {
                        this.y += (this.yOrigin - this.y) / 10;
                    }
                } else { // on hover
                    this.trail = 1;
                    if (this.y > this.hoverPos) {
                        this.y -= (this.hoverPos - this.y) / -5;
                    }
                    if (this.y < this.hoverPos - 4) {
                        this.y += 2.5;
                    }
                }
            } else if (expanse && !returning) {
                this.rotation = this.startRotation + (currentTime * (this.speed / 2));

                // Move visual star towards its wider expanse position
                if (Math.abs(this.y - this.expansePos) > 1) {
                    this.y += (this.expansePos - this.y) / 80;
                } else {
                    this.y = this.expansePos;
                }
                if (Math.abs(this.x - this.expanseX) > 1) {
                    this.x += (this.expanseX - this.x) / 80;
                } else {
                    this.x = this.expanseX;
                }

                // --- MODIFICATION START ---
                // Move clickable element towards its more confined position (slower)
                const clickableSpeedDivisor = 320; // 80 * 4 = 320 (1/4 speed)

                if (Math.abs(this.currentClickableY - this.clickableExpanseY) > 1) {
                    this.currentClickableY += (this.clickableExpanseY - this.currentClickableY) / clickableSpeedDivisor;
                } else {
                    this.currentClickableY = this.clickableExpanseY;
                }
                if (Math.abs(this.currentClickableX - this.clickableExpanseX) > 1) {
                    this.currentClickableX += (this.clickableExpanseX - this.currentClickableX) / clickableSpeedDivisor;
                } else {
                    this.currentClickableX = this.clickableExpanseX;
                }
                // --- MODIFICATION END ---


                // Update position of corresponding clickable star element
                const clickableStar = clickableStarElements.find(s => s.dataset.starId === `star${this.id}`);
                if (clickableStar) {
                    // Position clickable element using its own calculated coordinates
                    const rotatedClickablePos = rotate(centerx, centery, this.currentClickableX, this.currentClickableY, this.rotation);
                    clickableStar.style.left = `${rotatedClickablePos[0]}px`;
                    clickableStar.style.top = `${rotatedClickablePos[1]}px`;
                }
            } else if (returning) {
                // Returning to original orbit slowly
                this.rotation = this.startRotation + (currentTime * this.speed);
                if (Math.abs(this.y - this.originalY) > 2) {
                    this.y += (this.originalY - this.y) / 50;
                } else {
                    this.y = this.originalY;
                    this.yOrigin = this.originalY;
                }
                // Also move X back to centerx
                if (Math.abs(this.x - centerx) > 2) {
                    this.x += (centerx - this.x) / 50;
                } else {
                    this.x = centerx;
                }

                // --- MODIFICATION START ---
                // Move clickable element back to center (slower)
                const clickableReturnSpeedDivisor = 200; // 50 * 4 = 200 (1/4 speed)

                if (Math.abs(this.currentClickableY - centery) > 2) {
                    this.currentClickableY += (centery - this.currentClickableY) / clickableReturnSpeedDivisor;
                } else {
                    this.currentClickableY = centery;
                }
                if (Math.abs(this.currentClickableX - centerx) > 2) {
                    this.currentClickableX += (centerx - this.currentClickableX) / clickableReturnSpeedDivisor;
                } else {
                    this.currentClickableX = centerx;
                }
                // --- MODIFICATION END ---
            }

            context.save();
            context.fillStyle = this.color;
            context.strokeStyle = this.color;
            context.beginPath();
            const oldPos = rotate(centerx, centery, this.prevX, this.prevY, -this.prevR);
            context.moveTo(oldPos[0], oldPos[1]);
            context.translate(centerx, centery);
            context.rotate(this.rotation);
            context.translate(-centerx, -centery);
            context.lineTo(this.x, this.y);
            context.stroke();
            context.restore();

            this.prevR = this.rotation;
            this.prevX = this.x;
            this.prevY = this.y;
        }
    }

    // Function to create clickable star elements
    function createClickableStars() {
        clickableStarsData.forEach((data, index) => {
            const starDiv = document.createElement('div');
            starDiv.className = 'clickable-star';
            starDiv.dataset.starId = `star${index}`; // Link to a specific star in the `stars` array
            starDiv.innerHTML = `<a href="${data.url}">${data.text}</a>`;
            starDiv.style.position = 'absolute';
            starDiv.style.color = '#FFF';
            starDiv.style.fontSize = '16px';
            starDiv.style.whiteSpace = 'nowrap';
            starDiv.style.cursor = 'pointer';
            starDiv.style.opacity = '0'; // Initially hidden
            starDiv.style.transition = 'opacity 0.5s ease-in-out';
            clickableStarsContainer.appendChild(starDiv);
            clickableStarElements.push(starDiv);

            // Initial position for clickable stars (will be updated by star.draw)
            // They start at the center, like the visual stars
            starDiv.style.left = `${centerx}px`;
            starDiv.style.top = `${centery}px`;
        });
    }

    // Event listeners
    const centerHover = document.querySelector('.centerHover');

    centerHover.addEventListener('click', function() {
        collapse = false;
        expanse = true;
        returning = false;
        this.classList.add('open');

        // Show clickable stars container and enable pointer events
        clickableStarsContainer.style.opacity = '1';
        clickableStarsContainer.style.pointerEvents = 'auto';

        // Make individual clickable stars visible
        clickableStarElements.forEach(star => {
            star.style.opacity = '1';
        });

        // Start the return cycle after full expansion (20-30 seconds)
        setTimeout(() => {
            expanse = false;
            returning = true;

            // Hide clickable stars container and disable pointer events
            clickableStarsContainer.style.opacity = '0';
            clickableStarsContainer.style.pointerEvents = 'none';

            // After particles return, reset to normal orbit
            setTimeout(() => {
                returning = false;
                this.classList.remove('open');
            }, 8000); // 8 seconds to return slowly
        }, 25000); // 25 seconds of expansion experience
    });

    centerHover.addEventListener('mouseover', function() {
        if (expanse === false) {
            collapse = true;
        }
    });

    centerHover.addEventListener('mouseout', function() {
        if (expanse === false) {
            collapse = false;
        }
    });

    // Animation loop
    function loop() {
        const now = new Date().getTime();
        currentTime = (now - startTime) / 50;

        context.fillStyle = 'rgba(25,25,25,0.2)'; // somewhat clear the context, this way there will be trails behind the stars
        context.fillRect(0, 0, cw, ch);

        for (let i = 0; i < stars.length; i++) { // For each star
            if (stars[i] !== undefined) {
                stars[i].draw(); // Draw it
            }
        }

        requestAnimationFrame(loop);
    }

    function init() {
        context.fillStyle = 'rgba(25,25,25,1)'; // Initial clear of the canvas
        context.fillRect(0, 0, cw, ch);
        for (let i = 0; i < 2500; i++) { // create 2500 stars
            new Star();
        }
        createClickableStars(); // Create the clickable star elements
        loop();
    }

    init();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    blackhole('#blackhole');
});
