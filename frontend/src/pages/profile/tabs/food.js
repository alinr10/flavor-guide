import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from "axios";


const userToken = localStorage.getItem('userToken')

const user = jwtDecode(userToken)
//const fullName = user.firstName + " " + user.lastName
const userId = user.userId


const handleOrder = (meal) => {

    axios
        .post("http://localhost:3001/order", {
            meal,
            userId
        })
        .then((response) => {
            console.log("Backend'den gelen yanıt: ", response.data);

            if (response.data.success) {
                alert('sipariş verildi')
            }
        })
        .catch((error) => {
            console.error("API isteği hatası: ", error);
        })

};



const RecipeList = () => {
    const [orderInfo, setOrderInfo] = useState({
        name: '',
        content: '',
        price: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // const handleOrder = (mealName) => {


    //     console.log(mealName)

    // };

    // Yemeklerin bilgileri
    const meals = [
        { name: 'Kumpir', content: 'Lezzetli bir kumpir', price: '$15.99', image: 'https://www.luxell.com.tr/Data/Blog/8.jpg' },
        { name: 'İskender', content: 'Harika bir İskender', price: '$20.99', image: 'https://i.lezzet.com.tr/images-xxlarge-recipe/how-to-make-iskender-kebab-homemade-iskender-kebab-recipe-bae78de4-7c4c-4d2d-9016-456852c22f5c.jpg' },
        { name: 'Adana Kebap', content: 'Nefis bir Adana Kebap', price: '$18.99', image: 'https://cdn.yemek.com/mncrop/940/625/uploads/2016/05/adana-kebap-one-cikan.jpg' },
        { name: 'Lahmacun', content: 'Lezzetli bir Lahmacun', price: '$12.99', image: 'https://cdn.yemek.com/mnresize/940/940/uploads/2020/04/lahmacun-yeni-one-cikan.jpg' },
        { name: 'Hünkar Beğendi', content: 'Lezzetli bir Hünkar Beğendi', price: '$14.99', image: 'https://www.karaca.com/blog/wp-content/uploads/2022/04/hunkar-begendi-head-4.webp' },
        { name: 'Hünkar Beğendi', content: 'Lezzetli bir Hünkar Beğendi', price: '$14.99', image: 'https://www.karaca.com/blog/wp-content/uploads/2022/04/hunkar-begendi-head-4.webp' },
        { name: 'Hünkar Beğendi', content: 'Lezzetli bir Hünkar Beğendi', price: '$14.99', image: 'https://www.karaca.com/blog/wp-content/uploads/2022/04/hunkar-begendi-head-4.webp' },
        { name: 'Hünkar Beğendi', content: 'Lezzetli bir Hünkar Beğendi', price: '$14.99', image: 'https://www.karaca.com/blog/wp-content/uploads/2022/04/hunkar-begendi-head-4.webp' },


    ];

    return (
        <div className='wrapper' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <h1 id='food' >Yemeklerimiz</h1>

            <div className="meal-container">
                {meals.map((meal, index) => (
                    <div key={index} className={`meal-box ${index % 5 === 4 ? 'new-row' : ''}`} style={{ flexBasis: '20%' }}>
                        <div className="box-head">
                            <img src={meal.image} alt={meal.name} />
                            <h3>{meal.name}</h3>
                            <div className="prices">{meal.price}</div>
                        </div>
                        <div className="box-bottom">
                            <button onClick={() => handleOrder(meal.name)}>Sipariş Ver</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
