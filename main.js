
const items = [
    {
        title: 'Eggs',
        src: 'eggs.jpg',
        price: 7.00,
        incart: 0

    },
    {
        title: 'Pasta',
        src: 'pasta.jpg',
        price: 12.00,
        incart: 0

    },
    {
        title: 'Salad',
        src: 'salad3.jpg',
        price: 14.00,
        incart: 0

    },
    {
        title: 'Tomatoes',
        src: 'tomatoes.jpg',
        price: 10.00,
        incart: 0

    }
];

console.log(
    items[0].title

)



const cards = document.querySelectorAll('.card');
const imgCont = document.querySelectorAll('.imgCont');
const img = document.querySelectorAll('img');
const itemPrice = document.querySelectorAll('.itemPrice');
const btns = document.querySelectorAll('.btn');






for (let i = 0; i < cards.length; i++) {

    img[i].src = `images/${items[i].src}`;
    itemPrice[i].innerHTML = `$${items[i].price}.00`


    btns[i].addEventListener('click', () => {
        addItem(items[i])
        totalItems(items[i])
        totalPrice(items[i])
        addQuantitySpan()
    })



}



// addItem
function addItem(add) {
    let itemsInCart = localStorage.getItem('items');
    itemsInCart = JSON.parse(itemsInCart)
    console.log(typeof itemsInCart) // object
    if (itemsInCart) {
        if (itemsInCart[add.title] == undefined) {
            itemsInCart = {
                ...itemsInCart,
                [add.title]: add
            }

        }
        itemsInCart[add.title].incart += 1;
        localStorage.setItem('items', JSON.stringify(itemsInCart))

    } else {
        add.incart = 1;
        let addToCart = {
            [add.title]: add
        }

        localStorage.setItem('items', JSON.stringify(addToCart))


    }



}


// add quantity to each items card. invokes 2 times,  inside for loop and invokes when the page loads
function addQuantitySpan() {

    let itemsStored = localStorage.getItem('items')
    itemsStored = JSON.parse(itemsStored)

    if (itemsStored.Eggs) {
        document.querySelector('.quant1').innerHTML = itemsStored.Eggs.incart;
        document.querySelector('.totalPriceSpan1').innerHTML = `$${itemsStored.Eggs.incart * itemsStored.Eggs.price}.00`;
    }
    if (itemsStored.Pasta) {
        document.querySelector('.quant2').innerHTML = itemsStored.Pasta.incart;
    }
    if (itemsStored.Salad) {
        document.querySelector('.quant3').innerHTML = itemsStored.Salad.incart;
    }
    if (itemsStored.Tomatoes) {
        document.querySelector('.quant4').innerHTML = itemsStored.Tomatoes.incart;
    }


}

addQuantitySpan()

// totalItems 
function totalItems(item) {

    let totalItems = localStorage.getItem('totalItems')
    totalItems = parseInt(totalItems)

    if (totalItems) {
        localStorage.setItem('totalItems', totalItems + 1)

        let updatedItems = localStorage.getItem('totalItems')
        updatedItems = parseInt(updatedItems)

        document.querySelector('.totalItemsSpan').innerHTML = `Cart(${updatedItems})`;
    } else {
        localStorage.setItem('totalItems', 1)
        let updatedItems = localStorage.getItem('totalItems')
        updatedItems = parseInt(updatedItems)
        document.querySelector('.totalItemsSpan').innerHTML = `Cart(${updatedItems})`;
    }

}

// whenPageLoads

function whenPageLoads() {

    let totalItems = localStorage.getItem('totalItems')
    let totalPrice = localStorage.getItem('totalPrice');
    if (totalItems) {
        document.querySelector('.totalItemsSpan').innerHTML = `Cart(${totalItems})`;
        document.querySelector('.totalPriceSpan').innerHTML = `Total:$${totalPrice}`;
    } else {
        document.querySelector('.totalItemsSpan').innerHTML = '';
        document.querySelector('.totalPriceSpan').innerHTML = '';

    }



}

whenPageLoads();




// totalPrice

function totalPrice(item) {

    let totalPrice = localStorage.getItem('totalPrice');
    totalPrice = parseFloat(totalPrice)

    if (totalPrice) {

        localStorage.setItem('totalPrice', totalPrice + item.price)
        let updatedTotalPrice = localStorage.getItem('totalPrice')
        document.querySelector('.totalPriceSpan').innerHTML = ` Total:$${updatedTotalPrice} `;
    } else {

        localStorage.setItem('totalPrice', item.price)
        let updatedTotalPrice = localStorage.getItem('totalPrice')
        document.querySelector('.totalPriceSpan').innerHTML = ` Total:$${updatedTotalPrice} `;
    }



}


