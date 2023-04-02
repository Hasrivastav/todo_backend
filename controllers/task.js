import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
    try {
        
            const { title, description } = req.body;
            await Task.create({
              title,
              description,
              user: req.user,
            });
          
            res.status(201).jsonn({
              success: true,
              message: "Task added successfully",
            });
    } catch (error) {
        next(error);
    }
};

export const getMyTask = async (req, res, next) => {
try {
    const userid = req.user._id;
    const tasks = await Task.find({ user: userid });
  
    res.status(200).json({
      success: true,
      tasks,
    });
    
} catch (error) {
    next(error);
    
}
};


export const updateTask = async (req, res, next) => {
 try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if(!task) return next(new ErrorHandler("Invalid Id",404));
 
   task.isCompleted = !task.isCompleted;
   await task.save();
   res.status(200).json({
     success: true,
     message: "task Updated",
   });
    
 } catch (error) {
    next(error);
    
 }
};


export const deleteTask = async (req, res, next) => {
   try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if(!task) return next(new ErrorHandler("Invalid Id",404));
   
   
     
    await task.deleteOne();
    res.status(200).json({
    success: true,
    message: "task Deleted",
  });
    
   } catch (error) {
    next(error);
   }
};
