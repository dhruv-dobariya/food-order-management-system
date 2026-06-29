import { useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from "react-toastify";
import axios from 'axios'
import './Add.css'

const Add = ({url}) => {


    // url 

    // const url = "http://localhost:4000";


    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })


    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onsubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", data.price)
        formData.append("category", data.category)
        formData.append("image", image)

        const response = await axios.post(`${url}/api/food/add`, formData);

        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }
    }
//5 28 42
    return (
        <>
            <div className='add'>
                <form className='flex-col' onSubmit={onsubmitHandler}>
                    <div className="add-img-upload flex-col">
                        <p>Upload Image</p>
                        <label htmlFor="image">
                            {/* createobject img show  */}
                            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                        </label>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                    </div>

                    <div className="add-product-name flex-col">
                        <p>Product name</p>
                        <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required />
                    </div>

                    <div className="add-product-description flex-col">
                        <p>Product description</p>
                        <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                    </div>

                    {/* FIX 1: Holds both blocks together side-by-side */}
                    <div className="add-category-price">

                        {/* FIX 2: Correctly wrapped category tags inside this div */}
                        <div className='add-category flex-col'>
                            <p>Product category</p>
                            <select onChange={onChangeHandler} name="category">
                                <option value="Salad">Salad</option>
                                <option value="Rolls">Rolls</option>
                                <option value="Desserts">Desserts</option> {/* Fixed spelling typo */}
                                <option value="Sandwich">Sandwich</option>
                                <option value="Cake">Cake</option>
                                <option value="Pure Veg">Pure Veg</option>
                                <option value="Pasta">Pasta</option>
                                <option value="Noodles">Noodles</option>
                            </select>
                        </div>

                        <div className="add-price flex-col">
                            <p>Product price</p>
                            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20' required />
                        </div>

                    </div> {/* End of add-category-price */}

                    {/* FIX 3: Moved button outside the wrapper div so it stays below everything */}
                    <button type='submit' className='add-btn'>ADD</button>
                </form>
            </div>
        </>
    )
}

export default Add
