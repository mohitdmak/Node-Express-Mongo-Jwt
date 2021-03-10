const express = require('express');
const blogcontrollers = require('../controllers/Blogcontroller');
const blogrouter = express.Router();

// SECTION - Handling post request for creating blogs,
//           and get request for obtaining all blogs,
//           and getting/deleting a particular blog.
//#region 
blogrouter.post("", blogcontrollers.postblog);

blogrouter.get('/:id', blogcontrollers.getablog);

blogrouter.delete('/:id', blogcontrollers.deleteblog);
// |SECTION
//#endregion

module.exports = blogrouter;