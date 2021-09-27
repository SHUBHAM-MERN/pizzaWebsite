const axios = require("axios").default;
const Noty = require('noty');


const add = document.querySelectorAll('.add');
const cart_add = document.querySelector('.cart_add');
const add_pizza = document.querySelectorAll('.add_pizza');
const remove_pizza = document.querySelectorAll('.remove_pizza')
const pizza_update = document.querySelectorAll('.pizza_update');
const cart_total_qty = document.querySelector('.cart_total_qty');
const cart_total_price = document.querySelector('.cart_total_price');
const cart_itom = document.querySelectorAll('.cart_itom');
const pizz_prize = document.querySelectorAll('.pizz_prize');







add.forEach((btn) => {

    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        let data = await axios.post('/update', JSON.parse(btn.dataset.btnitom));
        new Noty({
            type: "success",
            text: 'Itom Added Successfully',
            timeout: 500,
            progressBar: false,
        }).show();
        cart_add.innerText = data.data.cart.totalqty;
        cart_total_qty.innerText = data.data.cart.totalqty;
        cart_total_price.innerText = data.data.cart.totalPrice;
        

    })
})
add_pizza.forEach((btn,index,arr) => {
    btn.addEventListener('click', async (e) => {


        e.preventDefault();
        const data = await axios.post('/additom', JSON.parse(btn.dataset.pizza));
        pizza_update[index].innerText = Number(pizza_update[index].innerText) + 1;
        cart_add.innerText = data.data.cart.totalqty;
       
        cart_total_price.innerText = data.data.cart.totalPrice;
    //     console.log(pizz_prize[index].innerText)
    // console.log(JSON.parse(btn.dataset.pizza).itom.price)
        pizz_prize[index].innerText = Number(pizz_prize[index].innerText) +Number( JSON.parse(btn.dataset.pizza).itom.price );
        // cart_itom[index].style.display = "none";

    })
})
remove_pizza.forEach((btn,index,arr) => {
    btn.addEventListener('click',async (e) => {

        e.preventDefault();
        const data = await axios.post('/removeitom', JSON.parse(btn.dataset.pizza));
        pizza_update[index].innerText = Number(pizza_update[index].innerText) - 1;
        cart_add.innerText = data.data.cart.totalqty;
      
        cart_total_price.innerText = data.data.cart.totalPrice;
        pizz_prize[index].innerText = Number(pizz_prize[index].innerText) - Number( JSON.parse(btn.dataset.pizza).itom.price );
    })
})