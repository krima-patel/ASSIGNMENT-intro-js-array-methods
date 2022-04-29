import { card } from "../components/card.js";
import { tableRow } from "../components/table.js";
import { referenceList } from "../data/reference.js";
import { renderToDom } from "../utils/renderToDom.js";

// Reusable function to get the cards on the DOM
// .forEach()
const renderCards = (array) => {
  let refStuff = "";

  // The items in the array will be accessible to us. 
  array.forEach((item) => {
    refStuff += card(item);
  })

  renderToDom("#cards", refStuff);
}

// UPDATE/ADD ITEMS TO CART
// .split() is an array method that turns a string into an array of values. The array here will be: index 0 will be fav-btn and index 1 will be the ID number.
// .findIndex() & (.includes() - string method)
const toggleCart = (event) => {
  if (event.target.id.includes("fav-btn")) {
    const [, id] = event.target.id.split('--')
    // console.log(id);
  //  console.log('Clicked Fav btn')

  const index = referenceList.findIndex(item => item.id === Number(id)) // Number converts the string into a number in this example.

  console.log(referenceList[index]);
  }
}

// SEARCH. The DOM is always listening for an event.
// .filter()
const search = (event) => {
  const userInput = event.target.value.toLowerCase();
  const searchResult = referenceList.filter(item => 
    item.title.toLowerCase().includes(userInput) ||
    item.author.toLowerCase().includes(userInput) ||
    item.description.toLowerCase().includes(userInput)
    )

    renderCards(searchResult);
  // console.log(eventLC)
}

// BUTTON FILTER
// .filter() & .reduce() &.sort() - chaining


const buttonFilter = (event) => {
  if(event.target.id.includes('free')) {
    const free = referenceList.filter(item => item.price <= 0);
    renderCards(free);
    // Instead of using console.log('FREE'), we will use array method .filter() to make this easier. Filter is the same as forEach because it is going to look at each item inside of our array. Filter returns a NEW array of values, they will be values based on the condition.
  }
  if(event.target.id.includes('cartFilter')) {
    const cartFilter = referenceList.filter(item => item.inCart === true);
    renderCards(cartFilter);
    // console.log('cartFilter'). In the example, const cartFilter = referenceList.filter(item => item.inCart === true); we do not have to put the === true because it is filtering and it is a boolean.
  }
  if(event.target.id.includes('books')) {
    const books = referenceList.filter(item => item.type.toLowerCase() === 'book');
    renderCards(books);
    // console.log('books!'). The method toLowerCase() will lowercase the letters for the attributes in referenceList, that way it can fitler through the array and find the value 'book'.
  }
  if(event.target.id.includes('clearFilter')) {
    renderCards(referenceList);
    // console.log('clearFilter') This function is going to show everything on the page. No need to write a conditional. The referenceList variable contains all the items, only need to pass that through renderCards().
  }
  

  if(event.target.id.includes('productList')) {
    let table = `<table class="table table-dark table-striped" style="width: 600px">
    <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Type</th>
        <th scope="col">Price</th>
      </tr>
    </thead>
    <tbody>
    `;
    
    productList().forEach(item => {
      table += tableRow(item);
    });

    table += `</tbody></table>`

    renderToDom('#cards', table);
  }
  
}

// CALCULATE CART TOTAL
// .reduce() & .some()
const cartTotal = () => {
  const total = 0
  document.querySelector("#cartTotal").innerHTML = total.toFixed(2);
}

// RESHAPE DATA TO RENDER TO DOM
// .map() converts an array to objects in this example. It applies the same logic to whatever data is passed and can then return a new array. Since this function is returning an object, we have to use () after the =>. Map returns a new array and manipulates data based on our determination. 
const productList = () => {
  return referenceList.map(item => ({ 
    title: item.title, 
    price: item.price, 
    type: item.type 
  }))
}


const startApp = () => {
  // PUT ALL CARDS ON THE DOM
  renderCards(referenceList)

  // PUT CART TOTAL ON DOM
  cartTotal();

  // SELECT THE CARD DIV
  document.querySelector('#cards').addEventListener('click', toggleCart);

  // SELECT THE SEARCH INPUT
  // Anytime we type and release the key, which is what the 'keyup' is, it will run the search method. 
  document.querySelector('#searchInput').addEventListener('keyup', search)

  // SELECT BUTTON ROW DIV
  document.querySelector('#btnRow').addEventListener('click', buttonFilter);
}
startApp();
