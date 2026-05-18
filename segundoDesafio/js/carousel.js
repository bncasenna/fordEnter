class Carousel {

static items = [];
static currentIndex = 0;
static interval = null;

constructor(image, title, url) {
    this.image = image;
    this.title = title;
    this.url = url;
}

static start(items) {

    if (!items || items.length === 0) {
        throw new Error("O carrossel precisa de um array.");
    }

    Carousel.items = items;
    Carousel.show();
    clearInterval(Carousel.interval);
    Carousel.interval = setInterval(() => {
        Carousel.next();
    }, 5000);
}

static next() {

    Carousel.currentIndex++;
    if (Carousel.currentIndex >= Carousel.items.length) {
        Carousel.currentIndex = 0;
    }
    Carousel.show();
}

static previous() {

    Carousel.currentIndex--;
    if (Carousel.currentIndex < 0) {
        Carousel.currentIndex =
            Carousel.items.length - 1;
    }
    Carousel.show();
}

static show() {
const carousel =
document.getElementById("Carousel");

    const title =
        document.getElementById("carousel-title");

    const currentItem =
        Carousel.items[Carousel.currentIndex];
    carousel.style.backgroundImage =
        `url('${currentItem.image}')`;

    title.innerHTML = `
        <a 
            href="${currentItem.url}"
            class="carousel-link">
            ${currentItem.title}
        </a>
    `;
}
}

window.addEventListener("DOMContentLoaded", () => {

const carouselItems = [

    new Carousel(
        "img/img-1.png",
        '"O Ford Model T revolucionou a indústria automobilística."',
        "./lançamentos.html"
    ),

    new Carousel(
        "img/img-2.png",
        '"O Bronco Sport entrega tecnologia e performance off-road."',
        "./lançamentos.html"
    ),

    new Carousel(
        "img/ranger.png",
        '"A Ford Ranger combina robustez e inovação."',
        "./lançamentos.html"
    )
];

Carousel.start(carouselItems);

const btnLeft =
    document.querySelector(".left");

const btnRight =
    document.querySelector(".right");

btnLeft?.addEventListener("click", () => {
    Carousel.previous();
});

btnRight?.addEventListener("click", () => {
    Carousel.next();
});

});