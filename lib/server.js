// const express = require("express");
// const cors = require("cors");
// // const MySQLConnector = require("./MySQLConnector");
// const PrismaConnector = require('./PrismaConnector');

// const app = express();
// const port = 3000;
// app.use(express.json());
// app.use(cors());

// const connector = new MySQLConnector({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "myWep",
// });

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// connector.connect();

// app.get("/readData", async (req, res) => {
//   try {
//     connector.query("SELECT * FROM scorestudent", (err, result, fields) => {
//       if (err) {
//         console.error("Error reading data: " + err.stack);
//         return res.status(400).json({
//           message: "Error fetching users"
//         });
//       }
//       console.log("Data received from MySQL:");
//       console.log(result);
//       return res.status(200).json(result);
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       message: "Internal Server Error"
//     });
//   }
// });

// app.get("/data", (req, res) => {
//   const sql = "SELECT * FROM scorestudent";

//   connection.query(sql, (error, results, fields) => {
//     if (error) {
//       console.error("Error fetching data:", error);
//       res.status(500).json({
//         error: "Error fetching data"
//       });
//       return;
//     }
//     res.json(results);
//   });
// });

// app.put("/update/:id", async (req, res) => {
//   const studentId = req.params.id;
//   const {
//     first_name,
//     last_name,
//     math_score,
//     science_score,
//     english_score
//   } =
//   req.body;

//   if (
//     !first_name ||
//     !last_name ||
//     !math_score ||
//     !science_score ||
//     !english_score
//   ) {
//     return res.status(400).json({
//       message: "All fields are required"
//     });
//   }

//   try {
//     await new Promise((resolve, reject) => {
//       connector.update(
//         "scoreStudent", {
//           first_name: first_name,
//           last_name: last_name,
//           math_score: math_score,
//           science_score: science_score,
//           english_score: english_score,
//         },
//         `student_id=${studentId}`,
//         (err, result) => {
//           if (err) {
//             console.error("Error updating data:", err);
//             reject(err);
//           } else {
//             console.log("Updated data. Affected rows:", result.affectedRows);
//             resolve();
//           }
//         }
//       );
//     });

//     return res.status(200).json({
//       message: "Student updated successfully"
//     });
//   } catch (err) {
//     console.error("Error updating student:", err);
//     return res.status(500).json({
//       message: "Internal Server Error"
//     });
//   }
// });

// app.delete("/delete/:id", async (req, res) => {
//   const studentId = req.params.id;

//   try {
//     connector.delete(
//       "scorestudent",
//       `student_id=${studentId}`,
//       (err, result) => {
//         if (err) {
//           console.error("Error deleting data: " + err.stack);
//           return res.status(400).json({
//             message: "Error deleting student"
//           });
//         }
//         console.log("Deleted data. Affected rows:", result.affectedRows);
//         return res
//           .status(200)
//           .json({
//             message: "Student deleted successfully"
//           });
//       }
//     );
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       message: "Internal Server Error"
//     });
//   }
// });

// app.get("/search/:id", async (req, res) => {
//   const studentId = req.params.id;

//   try {
//     connector.searchById("scorestudent", studentId, (err, result) => {
//       if (err) {
//         console.error("Error searching data: " + err.stack);
//         return res.status(400).json({
//           message: "Error searching student"
//         });
//       }
//       console.log("Search result:", result);
//       return res.status(200).json(result);
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       message: "Internal Server Error"
//     });
//   }
// });

// app.post("/create", async (req, res) => {
//   const students = req.body;

//   if (!Array.isArray(students) || students.length === 0) {
//     return res.status(400).json({
//       message: "No student data provided"
//     });
//   }

//   try {
//     for (const student of students) {
//       const {
//         student_id,
//         first_name,
//         last_name,
//         math_score,
//         science_score,
//         english_score,
//       } = student;

//       if (
//         !student_id ||
//         !first_name ||
//         !last_name ||
//         !math_score ||
//         !science_score ||
//         !english_score
//       ) {
//         console.error("Missing data for student:", student);
//         continue;
//       }

//       await new Promise((resolve, reject) => {
//         connector.insert(
//           "scoreStudent", {
//             student_id: student_id,
//             first_name: first_name,
//             last_name: last_name,
//             math_score: math_score,
//             science_score: science_score,
//             english_score: english_score,
//           },
//           (err, result) => {
//             if (err) {
//               console.error("Error inserting data:", err);
//               reject(err);
//             } else {
//               console.log(
//                 "Inserted new data. Affected rows:",
//                 result.affectedRows
//               );
//               resolve();
//             }
//           }
//         );
//       });
//     }

//     return res.status(201).json({
//       message: "Students successfully created!"
//     });
//   } catch (err) {
//     console.error("Error creating students:", err);
//     return res.status(500).json({
//       message: "Internal Server Error"
//     });
//   }
// });

// app.post("/insertData", async (req, res) => {
//   const student = req.body;
//   if (!student) {
//     return res.status(400).json({
//       message: "No student data provided"
//     });
//   }

//   try {
//     const {
//       student_id,
//       first_name,
//       last_name,
//       math_score,
//       science_score,
//       english_score,
//     } = student;

//     if (
//       !student_id ||
//       !first_name ||
//       !last_name ||
//       !math_score ||
//       !science_score ||
//       !english_score
//     ) {
//       console.error("Missing data for student:", student);
//       return res
//         .status(400)
//         .json({
//           message: "Incomplete student data provided"
//         });
//     }

//     await new Promise((resolve, reject) => {
//       connector.insert(
//         "scoreStudent", {
//           student_id: student_id,
//           first_name: first_name,
//           last_name: last_name,
//           math_score: math_score,
//           science_score: science_score,
//           english_score: english_score,
//         },
//         (err, result) => {
//           if (err) {
//             console.error("Error inserting data:", err);
//             reject(err);
//           } else {
//             console.log(
//               "Inserted new data. Affected rows:",
//               result.affectedRows
//             );
//             resolve();
//           }
//         }
//       );
//     });

//     return res.status(201).json({
//       message: "Student successfully created!"
//     });
//   } catch (err) {
//     console.error("Error creating student:", err);
//     return res.status(500).json({
//       message: "Internal Server Error"
//     });
//   }
// });

// app.get('/queryData', (req, res) => {
//   const scoreType = req.query.scoreType;
//   const scoreValue = req.query.scoreValue;

//   if (!scoreType || !scoreValue) {
//     return res.status(400).json({
//       message: "Score type and score value are required"
//     });
//   }

//   const validScoreTypes = ['math_score', 'science_score', 'english_score'];
//   if (!validScoreTypes.includes(scoreType)) {
//     return res.status(400).json({
//       message: "Invalid score type"
//     });
//   }

//   const query = `SELECT * FROM scorestudent WHERE ${scoreType} = ?`;
//   connector.query(query, [scoreValue], (error, results) => {
//     if (error) {
//       console.error('Error executing query:', error);
//       return res.status(500).json({
//         message: 'Internal Server Error',
//         error: error.message // Include the error message in the response
//       });
//     }
//     if (results.length > 0) {
//       res.json(results);
//     } else {
//       res.status(404).json({
//         message: 'No students found'
//       });
//     }
//   });
// });

// app.post('/insert_user', (req, res) => {
//   const userData = req.body;
//   const values = [
//       userData.oauth_provider,
//       userData.oauth_uid,
//       userData.first_name,
//       userData.last_name,
//       userData.email,
//       userData.picture
//   ];

//   connector.insert('users', values, (error, results) => {
//       if (error) {
//           res.status(500).json({ message: 'An error occurred while saving data in the database.' });
//       } else {
//           res.status(200).json({ message: 'successfully created!' });
//       }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

const express = require("express");
const cors = require("cors");
const PrismaConnector = require('./PrismaConnector');

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

const connector = new PrismaConnector(); // Instantiate PrismaConnector

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connector.connect(); // Connect to the database

// Route to read data
app.get("/readData", async (req, res) => {
  try {
    const data = await connector.prisma.scorestudent.findMany(); // Use Prisma to fetch data
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update data
app.put("/update/:id", async (req, res) => {
  const studentId = parseInt(req.params.id);
  const { first_name, last_name, math_score, science_score, english_score } = req.body;

  try {
    await connector.prisma.scorestudent.update({
      where: { id: studentId },
      data: { first_name, last_name, math_score, science_score, english_score },
    });
    res.status(200).json({ message: 'Student updated successfully' });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete data
app.delete("/delete/:id", async (req, res) => {
  const studentId = parseInt(req.params.id);

  try {
    await connector.prisma.scorestudent.delete({
      where: { id: studentId },
    });
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to search by ID
app.get("/search/:id", async (req, res) => {
  const studentId = parseInt(req.params.id);

  try {
    const result = await connector.prisma.scorestudent.findUnique({
      where: { id: studentId },
    });
    console.log("Search result:", result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error searching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create data
app.post("/create", async (req, res) => {
  const students = req.body;

  try {
    const createdStudents = await connector.prisma.scorestudent.createMany({
      data: students,
    });
    res.status(201).json({ message: 'Students successfully created!', createdStudents });
  } catch (error) {
    console.error('Error creating students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to insert data
app.post("/insertData", async (req, res) => {
  const student = req.body;

  try {
    const createdStudent = await connector.prisma.scorestudent.create({
      data: student,
    });
    res.status(201).json({ message: 'Student successfully created!', createdStudent });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to query data
app.get('/queryData', async (req, res) => {
  const scoreType = req.query.scoreType;
  const scoreValue = req.query.scoreValue;

  if (!scoreType || !scoreValue) {
    return res.status(400).json({
      message: "Score type and score value are required"
    });
  }

  const validScoreTypes = ['math_score', 'science_score', 'english_score'];
  if (!validScoreTypes.includes(scoreType)) {
    return res.status(400).json({
      message: "Invalid score type"
    });
  }

  try {
    const data = await connector.prisma.scorestudent.findMany({
      where: { [scoreType]: parseInt(scoreValue) },
    });
    if (data.length > 0) {
      res.json(data);
    } else {
      res.status(404).json({ message: 'No students found' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to insert user
app.post('/insert_user', async (req, res) => {
  const userData = req.body;

  try {
    const createdUser = await connector.prisma.users.create({
      data: {
        oauth_provider: userData.oauth_provider,
        oauth_uid: userData.oauth_uid,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        picture: userData.picture,
      },
    });
    res.status(201).json({ message: 'User successfully created!', createdUser });
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


