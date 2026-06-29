
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const placeOrder = async (req, res) => {
    try {

        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();

        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: newOrder._id.toString(),
        };

        const order = await razorpay.orders.create(options);

        res.json({
            success: true,
            order,
            orderId: newOrder._id
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// user order for frontend order list 
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// listing orders for admin panel

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data:orders })

    } catch (error) {
        console.log(error);
        res.json({ success: flase, message: "Error" })
    }
}

// api for updating order status
const updateStatus=async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Staus Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders ,updateStatus};