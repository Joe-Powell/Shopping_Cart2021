
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
const plusSquare = document.querySelectorAll('.fa-plus-square');
const minusCircle = document.querySelectorAll('.fa-minus-circle')
const quantifiers = document.querySelectorAll('.quantifiers')
const trashCan = document.querySelectorAll('.fa-trash')






// loops through buttons
for (let i = 0; i < cards.length; i++) {

    img[i].src = `images/${items[i].src}`;
    itemPrice[i].innerHTML = `$${items[i].price}.00`


    btns[i].addEventListener('click', () => {
        addItem(items[i])
        totalItems(items[i])
        totalPrice(items[i])
        addQuantitySpan()

    })

    minusCircle[i].addEventListener('click', () => {

        addQuantitySpan()
        totalItems(items[i], 'minus')
        totalPrice(items[i], 'minus')
        clickMinus(items[i]) // needed to be below totalPrice because these both change incart inteference..
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






// add quantity to each items card. 
//3 places  btns[i].addEventListener ⇧ , minusCircle[j].addEventListener ⇩  and below
function addQuantitySpan() {

    let itemsStored = localStorage.getItem('items')
    itemsStored = JSON.parse(itemsStored)
    if (itemsStored) {
        if (itemsStored.Eggs) {
            document.querySelector('.quant1').innerHTML = itemsStored.Eggs.incart;
            document.querySelector('.totalPriceItemSpan1').innerHTML = `$${itemsStored.Eggs.incart * itemsStored.Eggs.price}.00`;

        }
        if (itemsStored.Pasta) {
            document.querySelector('.quant2').innerHTML = itemsStored.Pasta.incart;
            document.querySelector('.totalPriceItemSpan2').innerHTML = `$${itemsStored.Pasta.incart * itemsStored.Pasta.price}.00`;
        }
        if (itemsStored.Salad) {
            document.querySelector('.quant3').innerHTML = itemsStored.Salad.incart;
            document.querySelector('.totalPriceItemSpan3').innerHTML = `$${itemsStored.Salad.incart * itemsStored.Salad.price}.00`;
        }
        if (itemsStored.Tomatoes) {
            document.querySelector('.quant4').innerHTML = itemsStored.Tomatoes.incart;
            document.querySelector('.totalPriceItemSpan4').innerHTML = `$${itemsStored.Tomatoes.incart * itemsStored.Tomatoes.price}.00`;
        }
    }

}

addQuantitySpan()




function totalPrice(item, action) {

    let totalPrice = localStorage.getItem('totalPrice');
    totalPrice = parseFloat(totalPrice)

    if (action == 'minus') {
        let items = localStorage.getItem('items')
        items = JSON.parse(items)

        if (items[item.title].incart > 0) {
            localStorage.setItem('totalPrice', totalPrice - item.price)
            let updatedTotalPrice = localStorage.getItem('totalPrice')
            document.querySelector('.totalPriceSpan').innerHTML = ` Total:$${updatedTotalPrice} `;
        }


    }
    else if (totalPrice) {

        localStorage.setItem('totalPrice', totalPrice + item.price)
        let updatedTotalPrice = localStorage.getItem('totalPrice')
        document.querySelector('.totalPriceSpan').innerHTML = ` Total:$${updatedTotalPrice} `;
    } else {

        localStorage.setItem('totalPrice', item.price)
        let updatedTotalPrice = localStorage.getItem('totalPrice')
        document.querySelector('.totalPriceSpan').innerHTML = ` Total:$${updatedTotalPrice} `;
    }



}








// totalItems 
function totalItems(item, action) {

    let totalItems = localStorage.getItem('totalItems')
    totalItems = parseInt(totalItems)

    if (action == 'minus') {
        if (totalItems) {
            let items = localStorage.getItem('items')
            items = JSON.parse(items)
            if (items[item.title].incart > 0) {
                localStorage.setItem('totalItems', totalItems - 1)
                let updatedItems = localStorage.getItem('totalItems')
                updatedItems = parseInt(updatedItems)
                document.querySelector('.totalItemsSpan').innerHTML = `Cart(${updatedItems})`;
            }
        }
    }

    else if (totalItems) {
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










// totalPrice



// click on plus
function clickPlus() {
    for (let j = 0; j < plusSquare.length; j++) {
        plusSquare[j].addEventListener('click', () => {
            //console.log('clicked addMore')

            btns[j].click()

        })
    }
}
clickPlus()





//click on minus
function clickMinus(item) {
    let items = localStorage.getItem('items');
    items = JSON.parse(items)

    if (items && items[item.title]) {
        if (items[item.title].incart > 0) {
            console.log(items[item.title].incart)

            items = {
                ...items,
            }

            items[item.title].incart = items[item.title].incart - 1;
            localStorage.setItem('items', JSON.stringify(items))

        }
    }

}




