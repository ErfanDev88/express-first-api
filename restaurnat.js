import express from "express";

const app = express();

app.use(express.json());

const foods = [
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

app.get("/", (req, res) => {
  res.json(foods);
});

app.get("/:id", (req, res) => {
  const param = req.params.id;
  const exists = foods.filter((f) => f.id == param);
  if(exists.length != 0) return res.json(exists)
  return res.send("Food not found")
});

app.post("/", (req, res)=>{
    const data = req.body;
    foods.push(data)
    res.json({
        "message": "Food added",
        "data": data
    })
})


app.listen(3000, () => console.log("App is running on port 3000"));
