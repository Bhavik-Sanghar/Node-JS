const express = require("express");
const Student = require("../model/student");
const router = new express.Router();


// Create Opration
router.post("/students", (req, res) => {
  const user = new Student(req.body);
  user
    .save()
    .then(() => {
      console.log(req.body);
      res.status(201).send(req.body);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Read Opration
router.get("/students", (req, res) => {
  Student.find()
    .then((students) => {
      res.send(students); // Send the fetched students as response
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error fetching students");
    });
});

router.get("/students/:name", async (req, res) => {
  try {
    const sname = req.params.name;
    const data =await (Student.find({ name: sname }));
    if (data.length === 0) {
        return res.status(404).send("Student with that name not found");
      }
      res.send(data);
  } catch (error) {
   res.status(500).send(error);
  }
});

// Delete Operation
router.delete("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.send(student); // Send deleted student as response
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting student");
  }
});


//Update Opration
router.patch("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Student.findByIdAndUpdate(id, req.body, { new: true });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;