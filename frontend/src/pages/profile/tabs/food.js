import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from "axios";


const RecipeList = () => {
    const [userId, SetuserId] = useState(0);

    useEffect(() => {
        try {
            const userToken = localStorage.getItem('userToken')
            const user = jwtDecode(userToken)
            SetuserId(user.userId)
            //const fullName = user.firstName + " " + user.lastName
            console.log("set user id to ", userId);
        }
        catch (err) {
            console.log(err)
        }
    }, []);

    const [orderInfo, setOrderInfo] = useState({
        name: '',
        content: '',
        price: ''
    });

    const handleOrder = (meal, price) => {

        axios
            .post("http://localhost:3001/order", {
                meal,
                price,
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

    // Yemeklerin bilgileri
    const meals = [
        { name: 'Kumpir', content: 'Lezzetli bir kumpir', price: '$15.99', image: 'https://www.luxell.com.tr/Data/Blog/8.jpg' },
        { name: 'İskender', content: 'Harika bir İskender', price: '$20.99', image: 'https://i.lezzet.com.tr/images-xxlarge-recipe/how-to-make-iskender-kebab-homemade-iskender-kebab-recipe-bae78de4-7c4c-4d2d-9016-456852c22f5c.jpg' },
        { name: 'Adana Kebap', content: 'Nefis bir Adana Kebap', price: '$18.99', image: 'https://cdn.yemek.com/mncrop/940/625/uploads/2016/05/adana-kebap-one-cikan.jpg' },
        { name: 'Lahmacun', content: 'Lezzetli bir Lahmacun', price: '$12.99', image: 'https://cdn.yemek.com/mnresize/940/940/uploads/2020/04/lahmacun-yeni-one-cikan.jpg' },
        { name: 'Hünkar Beğendi', content: 'Lezzetli bir Hünkar Beğendi', price: '$14.99', image: 'https://www.datocms-assets.com/43891/1627542846-hunkar-begendi.jpg?auto=compress%2Cformat&fit=crop&h=450&w=800' },
        { name: 'Ali Nazik Kebabı', content: 'Lezzetli bir Ali Nazik Kebabı', price: '$17.99', image: 'https://cdn.yemek.com/mnresize/940/940/uploads/2017/05/alinazik-tarifi.jpg' },
        { name: 'Baklava', content: 'Lezzetli bir Baklava', price: '$19.99', image: 'https://www.gunduzoglu.com.tr/UserFiles/Fotograflar/org/109-fistikli-baklava-fistikli-baklava-fistikli-baklava.jpg' },
        { name: 'Balık Tava', content: 'Lezzetli bir Balık Tava', price: '$16.99', image: 'https://cdn.ye-mek.net/App_UI/Img/out/650/2023/06/balik-tava-resimli-yemek-tarifi(11).jpg' },
        { name: 'Beyti Kebap', content: 'Lezzetli bir Beyti Kebap', price: '$15.99', image: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2023/11/beyti-yemekcom.jpg' },
        { name: 'Börek', content: 'Lezzetli bir Börek', price: '$18.99', image: 'https://cdn.yemek.com/mncrop/620/388/uploads/2023/02/borek-sunum-elif.jpg' },
        { name: 'Ciğer Sote', content: 'Lezzetli bir Ciğer Sote', price: '$22.99', image: 'https://image.hurimg.com/i/hurriyet/75/750x422/5ea009312269a218ac53a1a2.jpg' },
        { name: 'Çiğ Köfte', content: 'Lezzetli bir Çiğ Köfte', price: '$20.99', image: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2022/10/blenderda-10-dakikada-cig-kofte-onecikan.jpg' },
        { name: 'Çılbır', content: 'Lezzetli bir Çılbır', price: '$13.99', image: 'https://cdn.ye-mek.net/App_UI/Img/out/650/2023/07/ciger-sote-resimli-yemek-tarifi(12).jpg?w=650&h=487' },
        { name: 'Tavuk Döner', content: 'Lezzetli bir Tavuk Döner', price: '$12.99', image: 'https://www.karaca.com/blog/wp-content/uploads/2023/02/tavuk-donerr.webp' },
        { name: 'Fırın Makarna', content: 'Lezzetli bir Fırın Makarna', price: '$14.99', image: 'https://cdn.yemek.com/mnresize/940/940/uploads/2015/02/firin-makarna-yemekcom-yeni.jpg' },
        { name: 'Fırın Tavuk', content: 'Lezzetli bir Fırın Tavuk', price: '$15.99', image: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2016/07/firin-posetinde-tavuk-yeni.jpg' },
        { name: 'Hamsi Tava', content: 'Lezzetli bir Hamsi Tava', price: '$18.99', image: 'https://cdn.yemek.com/mncrop/940/625/uploads/2016/08/hamsi-tava-yeni-one-cikan.jpg' },
        { name: 'Havuç Tarator', content: 'Lezzetli bir Havuç Tarator', price: '$10.99', image: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2023/12/havuc-tarator-yemekcom.jpg' },
        { name: 'İmam Bayıldı', content: 'Lezzetli bir İmam Bayıldı', price: '$16.99', image: 'https://i.lezzet.com.tr/images-xxlarge-recipe/imam_bayildi-b9911d4c-b18e-491d-9fc8-092a96a8ec84.jpg' },
        { name: 'İskilip Dolması', content: 'Lezzetli bir İskilip Dolması', price: '$13.99', image: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2022/10/iskilip-dolmasi-one-cikan.jpg' },
        { name: 'İslim Kebap', content: 'Lezzetli bir İslim Kebap', price: '$18.99', image: 'https://cdn.yemek.com/mncrop/940/625/uploads/2015/07/islim-kebabi-tarifi-2.jpg' },
        { name: 'Ispanaklı karnabahar', content: 'Lezzetli bir Ispanaklı Karnabahar', price: '$22.99', image: 'https://www.diyetkolik.com/site_media/media/foodrecipe_images/Ispanakl_karnabaharl_soslu_tavuk__1.png' },
        { name: 'Kadayıf', content: 'Lezzetli bir Kadayıf', price: '$18.99', image: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2015/06/kadayif-yeni-one-cikan.jpg' },
        { name: 'Karides Güveç', content: 'Lezzetli bir Karides Güveç', price: '$19.99', image: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2014/08/mantarli-karides-guvec-yemekcom.jpg' },
        { name: 'Karnabahar Kızartması', content: 'Lezzetli bir Karnabahar Kızartması', price: '$14.99', image: 'https://cdn.yemek.com/mnresize/1920/1080/uploads/2019/10/firinda-karnabahar-kizartmasi-tarifi-yemekcom.jpg' },
        { name: 'Kavurmalı Pilav', content: 'Lezzetli bir Kavurmalı Pilav', price: '$10.99', image: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2019/08/kavurmali-pilav-yeni-onecikan.jpg' },
        { name: 'Kısır', content: 'Lezzetli bir Kısır', price: '$13.99', image: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2023/05/yogurma-kisir-sunum-yemekcom.jpg' },
        { name: 'Kuzu Güveç', content: 'Lezzetli bir Kuzu Güveç', price: '$11.99', image: 'https://image.hurimg.com/i/hurriyet/75/750x422/628e32ff4e3fe1246c20b659.jpg' },
        { name: 'Kuzu İncik', content: 'Lezzetli bir Kuzu İncik', price: '$12.99', image: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2014/10/kuzu-incik-yeni-onecikan.jpg' },
        { name: 'Kuzu Kelle Paça Çorbası', content: 'Lezzetli bir Kelle Paça Çorbası', price: '$10.99', image: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2023/07/kelle-paca-corbasi-yeni.jpg' },
        { name: 'Kuzu Tandır', content: 'Lezzetli bir Kuzu Tandır', price: '$18.99', image: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2018/07/bby-tandir-yemekcom.jpg' },
        { name: 'Künefe', content: 'Lezzetli bir Künefe', price: '$9.99', image: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2015/05/kunefe-reels-yemekcom-1.jpg' },
        { name: 'Mantı', content: 'Lezzetli bir Mantı', price: '$10.99', image: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2017/02/kayseri-mantisi-onecikan-yeni.jpg' },
        { name: 'Mercimek Çorbası', content: 'Lezzetli bir Mercimek Çorbası', price: '$10.99', image: 'https://cdn.yemek.com/mnresize/940/940/uploads/2022/03/suzme-mercimek-corbasi-one-cikan.jpg' },
        { name: 'Muhammara', content: 'Lezzetli bir Muhammara', price: '$19.99', image: 'https://cdn.yemek.com/mnresize/940/940/uploads/2022/05/nuray-ayan-muhamara.jpg' },
        { name: 'Paçanga Böreği', content: 'Lezzetli bir Paçanga Böreği', price: '$14.99', image: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2020/10/pacanga-yatay-1-yilbasi.jpg' },
        { name: 'Patlıcan Kebabı', content: 'Lezzetli bir Patlıcan Kebabı', price: '$13.99', image: 'https://image.hurimg.com/i/hurriyet/75/750x422/5cfe4af3c03c0e2740904345.jpg' },
        { name: 'Patso', content: 'Lezzetli bir Patso', price: '$10.99', image: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2023/05/patso-sunum-yemekcom.jpg' },
        { name: 'Pide', content: 'Lezzetli bir Pide', price: '$17.99', image: 'https://www.pidebypide.com/assets/images/pide1.jpg' },
        { name: 'Samsun Bafra Pidesi', content: 'Lezzetli bir Samsun Bafra Pidesi', price: '$18.99', image: 'https://cdn.yemek.com/mnresize/940/940/uploads/2020/05/bafra-pidesi-yemekcom-1.jpg' },
        { name: 'Simit', content: 'Enfes bir Simit', price: '$7.99', image: 'https://www.datocms-assets.com/48770/1625929118-simit-tarifi.jpg?auto=compress%2Cformat' },
        { name: 'Şiş Kebap', content: 'Lezzetli bir Şiş Kebap', price: '$18.99', image: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2023/04/sis-kebap-onecikan.jpg' },
        { name: 'Tavuklu Kaşarlı Tost', content: 'Lezzetli bir Tavuklu Kaşarlı Tost', price: '$10.99', image: 'https://cdn.yemek.com/mncrop/940/625/uploads/2021/05/bby-tavuk-ciger-sandvic-yemekcom.jpeg' },
        { name: 'Tavuklu Pilav', content: 'Lezzetli bir Pilav', price: '$12.99', image: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2014/12/tavuklu-pilav-one-cikan-yeni.jpg' },
        { name: 'Zeytinyağlı Yaprak Sarma', content: 'Lezzetli bir Yaprak Sarma', price: '$13.99', image: 'https://cdn.yemek.com/mnresize/940/940/uploads/2014/07/zeytinyagli-yaprak-sarmasi-yemekcom.jpg' },


    ];

    return (
        <div className='wrapper' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <br></br>
            <h1 id='food' >Yemeklerimiz</h1>

            <div className="meal-container">
                {meals.map((meal, index) => (
                    <div key={index} className={`meal-box ${index % 5 === 4 ? 'new-row' : ''}`} style={{ flexBasis: '18%' }}>
                        <div className="box-head">
                            <img src={meal.image} alt={meal.name} />
                            <h3>{meal.name}</h3>
                            <div className="prices">{meal.price}</div>
                        </div>
                        <div className="box-bottom">
                            <button onClick={() => handleOrder(meal.name, meal.price)}>Sipariş Ver</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
