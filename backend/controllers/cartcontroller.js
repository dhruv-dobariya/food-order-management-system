import userModel from "../models/userModel.js";



// add items to user cart


const addToCart = async (req, res) => {
    try {

        console.log("req.body =", req.body);
        console.log("userId =", req.body.userId);
        console.log("itemId =", req.body.itemId);

        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(
            req.body.userId,
            { cartData }
        );

        res.json({
            success: true,
            message: "Added To cart"
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        });
    }
}



// remove items from user cart

const removeFromCart = async (req, res) => {

    try {
        console.log("req.body =", req.body);
        console.log("userId =", req.body.userId);
        console.log("itemId =", req.body.itemId);

        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Remove from cart" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }

}

// fetch user cart data


const getCart = async (req, res) => {

    try {
        console.log("req.body =", req.body);
        console.log("userId =", req.body.userId);
        console.log("itemId =", req.body.itemId);
        
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// const getCart = async (req, res) => {
//     try {

//         console.log("userId =", req.userId);

//         const userData = await userModel.findById(req.userId);

//         if (!userData) {
//             return res.json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         res.json({
//             success: true,
//             cartData: userData.cartData
//         });

//     } catch (error) {
//         console.log(error);

//         res.json({
//             success: false,
//             message: error.message
//         });
//     }
// }

export { addToCart, removeFromCart, getCart };
