import express from 'express';

const cartItemsRoutes = express.Router();

// mock data

let swordArray = [
    {
        id: 1,
        product: 'katana',
        price: 500,
        quantity: 1,
    },
    {
        id: 2,
        product: 'broad sword',
        price: 300,
        quantity: 1,
    },
    {
        id: 3,
        product: 'cutlass',
        price: 260,
        quantity: 1,
    },
    {
        id: 4,
        product: 'kukri',
        price: 600,
        quantity: 1,
    }
];

let nextId = swordArray.length + 1;

// GET all of the swords
cartItemsRoutes.get("/cart-items", (req, res) => {
    res.status(200);
    return res.json(swordArray)
})

// GET -  filter swords by anything less than the number given. Ex. les than 400
cartItemsRoutes.get("/cart-items", (req, res) => {
    let maxPrice: number = Number(req.query.maxPrice);
    let newSwordArray = swordArray.filter(sword => sword.price <= maxPrice);
    res.status(200);
    res.json(newSwordArray);
})


// GET - strings for the product name that start with "x"

// cartItemsRoutes.get("/cart-items", (req, res) => {
// })



// GET - filter pageSize. use splice to only show the first amount of x items

cartItemsRoutes.get("/cart-items", (req, res) => {
    let pageSize: number = Number(req.query.pagesize);
    let newSwords = swordArray.splice(0, pageSize);
    res.status(200);
    res.json(newSwords);
})


/// max page, look at splice

// GET car-items by ID

cartItemsRoutes.get("/cart-items/:id", (req, res) => {
    let foundSword = swordArray.find((sword) => {
        return sword.id === parseInt(req.params.id);
    })
    if (foundSword){
        res.status(200);
        res.json(foundSword);
    } else {
        res.status(404);
        res.json("ID not found.");
    }
})

// POST cart-items. (make a new one)

cartItemsRoutes.post("/cart-items", (req, res) => {
    let newSword = {
        id: nextId,
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity
    }

    nextId ++

    swordArray.push(newSword);

    res.status(201);
    res.json(swordArray);
})


// PUT /cart-items/:id

cartItemsRoutes.put("/cart-items/:id", (req, res) => {
    let foundSwordIndex = swordArray.findIndex((sword) => {
        return sword.id === parseInt(req.params.id);
    })
    if (foundSwordIndex > -1) {
        swordArray[foundSwordIndex] = {
            id: swordArray[foundSwordIndex].id,
            product: req.body.product,
            price: req.body.price,
            quantity: req.body.quantity
        }
        res.json(swordArray);
    } else {
        res.sendStatus(204);
    }
})

// DELETE - remove a sword

cartItemsRoutes.delete("/cart-items/:id", (req, res) => {
    let foundSwordIndex = swordArray.findIndex((sword) => {
        return sword.id === parseInt(req.params.id);
})
if (foundSwordIndex > -1){
    swordArray.splice(foundSwordIndex, 1);
    res.sendStatus(204);
} else {
    res.sendStatus(400);
}
})


export default cartItemsRoutes;