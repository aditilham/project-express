const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 4000;

const todoList = require("./todoData");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send('This is API DEMO'))
app.post("/", (req, res) => {
  res.send('This is API DEMO')
})

app.get("/todos", (req, res) => res.send(todoList));

app.post("/todos", (req, res) => {
  try {
    let newId = todoList.length + 1;
    let newTodo = {
      id: newId,
      task: req.body.task,
      done: false
    };

    todoList.push(newTodo);

    res.status(200).send({
      message: "todo successfully added",
      todoList
    });
  } catch (error) {
    res.send(error);
  }
});

app.delete("/:index", (req, res) => {
  try {
    let index = req.params.index;
    todoList.splice(index, 1);
    res.status(200).send(todoList);
  } catch (error) {
    res.send(error);
  }
});

app.put("/:id", (req, res) => {
  try {
    todoList[req.params.id] = req.body;
    res.send("update data sucessfuly");
  } catch (error) {
    res.send(error);
  }
});

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`));
