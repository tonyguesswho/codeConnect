import express from "express";
import model from "../models/index";

const router = express.Router();

// // // middleware to handel errors
// const awaitErrorHandlerFactory = middleware => {
//   return async (req, res, next) => {
//     try {
//       await middleware(req, res, next);
//     } catch (err) {
//       next(err);
//     }
//   };
// };

// router.get(
//   "/",
//   awaitErrorHandlerFactory(async (req, res) => {
//     const todos = await model.Todo.findAll({});
//     return res.json({
//       error: false,
//       data: todos
//     });
//   })
// );

router.get("/", async (req, res) => {
  try {
    const todo = await model.Todo.findAll({});
    return res.json({
      error: false,
      data: todo
    });
  } catch (error) {
    console.log(error);
  }
});

// router.post(
//   "/",
//   awaitErrorHandlerFactory(async (req, res) => {
//     const { title, description } = req.body;
//     const todo = await model.Todo.create({
//       title,
//       description
//     });
//     return res.status(201).json({
//       error: false,
//       data: todo,
//       message: "new todo created"
//     });
//   })
// );

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await model.Todo.create({
      title,
      description
    });
    return res.json({
      error: false,
      data: todo
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  try {
    const todo = await model.Todo.update(
      {
        title,
        description
      },
      { where: { id: id } }
    );
    return res.json({
      title,
      description
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const todo_id = req.params.id;
  try {
    const todo = await model.Todo.findOne({
      where: { id: todo_id }
    });
    return res.json({
      todo
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await model.Todo.destroy({ where: { id } });
    return res.json({
      error: false,
      todo,
      message: "Todo deleted"
    });
  } catch (error) {}
});

module.exports = router;
