import { response } from "express";
import { Book } from "../Model/bookModel.js";
import { User } from "../Model/userModel.js";

// addbooks only admin

export const addbook = async (req, res) => {
  const { title, author, publishedYear ,status} = req.body;
  const { _id, Role } = req.user;


  try {
    if (Role === "admin") {
      let existingbook = await Book.findOne({ title: title });
      if (existingbook) {
        return res
          .status(404)
          .json({ message: "This book is already available" });
      } else {
        let newbook = await Book({
          title: title,
          author: author,
          publishedYear: publishedYear,
          author_id: _id,
          status:status
        });
        await newbook.save();
        return res
          .status(200)
          .json({
            message: "Successfully Added",
            isSuccess: true,
            bookid: newbook._id,
            title: newbook.title,
          });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Permission not allowed", isSuccess: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message, isSuccess: false });
  }
};

//only user have the access to get all the books
export const getallbooks = async (req, res) => {
  const { Role } = req.user;
  const { title, author, status, page = 1, limit = 10 } = req.query; // Extract query parameters with defaults
  try {
    if (Role === "user") {
      // Build dynamic filter based on provided query parameters
      let filters = {};
      if (title) {
        filters.title = { $regex: title, $options: "i" }; // Case-insensitive search
      }
      if (author) {
        filters.author = { $regex: author, $options: "i" }; // Case-insensitive search
      }
      if (status) {
        filters.status = status; // Exact match for status
      }

      // Calculate skip value for pagination
      const skip = (page - 1) * limit;

      // Fetch books with applied filters and pagination
      const allbooks = await Book.find(filters)
        .skip(skip) // Skip the documents for the previous pages
        .limit(parseInt(limit)); // Limit the number of documents per page

      // Count total documents matching the filter for pagination metadata
      const totalBooks = await Book.countDocuments(filters);

      return res.status(200).json({
        message: "Successfully fetched",
        data: allbooks,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalBooks / limit),
        totalBooks: totalBooks,
      });
    } else {
      return res.status(200).json({ message: "No books found", data: [] });
    }
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: error.message, isSuccess: false });
  }
};

export const mybook = async (req, res) => {
  const { _id, Role } = req.user;

  try {
    if (Role === "admin") {
      let findmybooks = await Book.find({ author_id: _id });
      if (findmybooks.length > 0) {
        return res
          .status(200)
          .json({
            message: "All books fetch successfully",
            isSuccess: true,
            data: findmybooks,
          });
      } else {
        return res
          .status(200)
          .json({ message: "No books found", isSuccess: true, data: [] });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Permission denied", isSuccess: false });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err.message, isSuccess: false });
  }
};

export const updatebook = async (req, res) => {
  const { title, author, publishedYear,status } = req.body;
  //book id
  const { id } = req.params;
  const { Role } = req.user;
  try {
    if (Role === "admin") {
      if (!id) {
        return res
          .status(404)
          .json({ message: "Book id not found", isSuccess: false });
      } else {
        const updatebook = await Book.findByIdAndUpdate(
          { _id: id },
          { title, author, publishedYear ,status},
          { new: true }
        );
        if (!updatebook) {
          return res
            .status(404)
            .json({ message: "Book not found", isSuccess: false });
        }
        return res.status(200).json({
          message: "Book updated successfully",
          isSuccess: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message, isSuccess: false });
  }
};

export const deletebook = async (req, res) => {
  const {id} = req.params;
  const { Role } = req.user;

  try {
    if (Role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized action",
        isSuccess: false,
      });
    }

    if (!id) {
      return res.status(400).json({
        message: "Book ID is required",
        isSuccess: false,
      });
    }

    const deletebook = await Book.findByIdAndDelete({_id:id});

    if (!deletebook) {
      return res.status(404).json({
        message: "Book not found",
        isSuccess: false,
      });
    }

    return res.status(200).json({
      message: "Book deleted successfully",
      isSuccess: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      isSuccess: false,
    });
  }
};


// update status of book

export const updatestatus = async (req, res) => {
    const { id } = req.params;
    const { Role } = req.user;
    const { status } = req.body;

    try {
      if (Role !== "admin") {
            return res.status(403).json({
                message: "Unauthorized action",
                isSuccess: false,
            });
        }

        if (!id) {
            return res.status(400).json({
                message: "Book ID is required",
                isSuccess: false,
            });
        }

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                isSuccess: false,
            });
        }

       
        const updatestatus = await Book.findByIdAndUpdate(
            {_id:id},
            { status },
            { new: true }
        );

       
        if (!updatestatus) {
            return res.status(404).json({
                message: "Book not found",
                isSuccess: false,
            });
        }

       
        return res.status(200).json({
            message: "Book status updated successfully",
            isSuccess: true,
            data: updatestatus,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
            isSuccess: false,
        });
    }
};
