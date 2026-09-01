import { Router } from "express";
import { validationResult, ExpressValidator, body } from "express-validator";

let orders = [
  {
    id: 1,
    name: "CheeseBurger",
    price: "60$",
  },
  {
    id: 2,
    name: "Pizaa",
    price: "24$",
  },
  {
    id: 3,
    name: "Omelet",
    price: "7$",
  },
  {
    id: 4,
    name: "Rice",
    price: "10$",
  },
  {
    id: 5,
    name: "Pasta",
    price: "37$",
  },
  {
    id: 6,
    name: "Salad",
    price: "17",
  },
];

const order = Router()

order.get("/", (req, res) => {
  res.json(orders);
});

order.get("/:id", (req, res) => {
  const param = req.params.id;
  const exists = orders.filter((o) => o.id == param);
  if(exists.length != 0) return res.json(exists)
  return res.send("order not found")
});

order.delete("/:id" ,(req, res)=>{
  const id = req.params.id;
  const filteredOrder = orders.filter(o => o.id == id)

  if(!filteredOrder) return res.status(404).send("Order not found")

  const newOrder = orders.filter(o => o.id != id)
  orders = newOrder

  res.json({
    msg: "Order Removed",
    data: orders
  })

})

order.put('/:id', (req, res)=>{
  const param = req.params.id;
  const filteredOrder = orders.find((o)=> o.id == param)
  if(filteredOrder.length == 0) return res.status(404).send("Order not found")
  

  if(req.body.name)
    filteredOrder.name = req.body.name
  
  if(req.body.price)
    filteredOrder.price = req.body.price
  

  const newOrder = orders.filter((o)=> o.id != param)
  orders = newOrder
  orders.push(filteredOrder)

  res.json({
    msg: "Order Updated",
    data: orders
  })
})


order.post("/", [
  body('id', 'ID is required , id must be a number').notEmpty().isInt(),
  body('name', 'name is required , name must be a string').notEmpty().isString(),
  body('price', 'price is required , price must be a string').notEmpty().isString()
],(req, res)=>{

  const errors = validationResult(req)
  if(!errors.isEmpty()) return res.status(400).json({msg: "Bad request", data: errors.array()})

    const data = req.body;
    orders.push(data)
    res.json({
        "message": "Food added",
        "data": data
    })
})

export default order