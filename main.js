let shoppingCartArray = [];
let total = 0;
let productCointainer = document.querySelector('.shop-items');
let totalElement = document.querySelector('.cart-total-title');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '29d1a61d19mshae69806df2afbfap1d40a3jsnca17c5579b23',
		'X-RapidAPI-Host': 'books39.p.rapidapi.com'
	}
};
let res = await fetch('https://books39.p.rapidapi.com/CZFA4F/books',options)
let data = await res.json()

//Mostrar 8 productos
let productsArray = data.slice(0,8);

productsArray.forEach(product => {
	productCointainer.innerHTML +=`
	<div class="shop-item" id="${product.id}">
	<span class="shop-item-title" >${product.TITLE}</span>
	<img class="cart-item-image" src="Images/book.png" width="350px" height="300px">
	<p class="shop-item-author">${product.AUTHOR}</p>
	<div class="shop-item-details">
		<span class="shop-item-price">$${product.YEAR}</span>
		<button class="btn btn-primary shop-item-button" type="button">Agregar al carrito</button>
	</div>
</div>`
});

//Boton agregar
let addBtns = document.querySelectorAll('.shop-item-button');

addBtns = [...addBtns];

let cartContainer = document.querySelector('.cart-items');

addBtns.forEach(btn=>{
	btn.addEventListener('click',event=>{
		//Agregar al carrito

		//buscar ID
		let actualID = parseInt(event.target.parentNode.parentNode.id);


		//con el id buscar el objeto actual
		let actualProduct = productsArray.find(item => item.id == actualID)

		if(actualProduct.quantity === undefined){
			actualProduct.quantity = 1;
		}

		
		//pregunta si no hay productos duplicados
		let existe = false
		shoppingCartArray.forEach(libro => {
if(actualID == libro.id){
	existe = true
}
		})

		if(existe){
			actualProduct.quantity++
		}else{
			shoppingCartArray.push(actualProduct)
		}
		
		
		
		
		
//Agregar al carro
drawItems()

		

				//actualizar el total
getTotal()


updateNumberOfItems()

removeItems()
	});
});

function getTotal(){
	let sumTotal
	let total = shoppingCartArray.reduce((sum,item)=>{
		sumTotal = sum + item.quantity*item.YEAR
		return sumTotal
	},0);
	totalElement.innerText = `$${total}`
};

function drawItems(){
	cartContainer.innerHTML='';
shoppingCartArray.forEach(item => {
	
	cartContainer.innerHTML +=
	`<div class="cart-row">
				<div class="cart-item cart-column">
					<img class="cart-item-image" src="./Images/book.png" width="100" height="100">
					<span class="cart-item-title">${item.TITLE}</span>
				</div>
				<span class="cart-price cart-column">$${item.YEAR}</span>
				<div class="cart-quantity cart-column">
					<input class="cart-quantity-input" min="1" type="number" value="${item.quantity}">
					<button class="btn btn-danger" type="button">REMOVE</button>
				</div>
			</div>`
});
removeItems()
}
function updateNumberOfItems(){

				let inputNumber = document.querySelectorAll('.cart-quantity-input');
				inputNumber = [...inputNumber];

		inputNumber.forEach(item => {
			item.addEventListener('click', event=>{

				//Consigo el titulo del libro
			let actualBookTitle = event.target.parentElement.parentElement.childNodes[1].innerText;
			let actualBookCuantity = parseInt (event.target.value);
			//Busco el objeto con ese titulo
			let actualBookObjet = shoppingCartArray.find(item=>item.TITLE == actualBookTitle)

			actualBookObjet.quantity = actualBookCuantity;

			getTotal()
			});
		});
}

function removeItems(){
	let removeBtns = document.querySelectorAll('.btn-danger');
	removeBtns =[...removeBtns];
	removeBtns.forEach(btn=>{
		btn.addEventListener('click',event=>{
		//Consigo el titulo del libro
		let actualBookTitle = event.target.parentElement.parentElement.childNodes[1].innerText;
		//Busco el objeto con ese titulo
		let actualBookObjet = shoppingCartArray.find(item=>item.TITLE == actualBookTitle)
		//Borrar del carro
	 	shoppingCartArray = shoppingCartArray.filter(item => item != actualBookObjet)
		//Acualizar el precio
drawItems()
getTotal()
updateNumberOfItems()
		});
		
	});
}
document.getElementById("Compra").onclick = function() {Comprar()}

function Comprar(){ 
document.getElementById("Compra").innerHTML = "GRACIAS POR TU COMPRA";
 }