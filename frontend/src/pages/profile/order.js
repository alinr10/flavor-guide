import React, { useState, useEffect } from "react";
import axios from "axios";
import gifHello from "../../../src/images/a-unscreen.gif";
import gifSearching from "../../../src/images/2-unscreen.gif";
import gifHappy from "../../../src/images/b-unscreen.gif";
import Select from "react-select";
import { jwtDecode } from "jwt-decode";

export default function ShowAI(props) {
  const [loading, setLoading] = useState(false);
  const [changeGif, setChangeGif] = useState(gifHello);
  const [analysisResult, setAnalysisResult] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [payment, setPayment] = useState(null);
  const CategoryOptions = [
    { label: "Kumpir", value: "Kumpir" },
    { label: "İskender", value: "İskender" },
    { label: "Adana Kebap", value: "Adana Kebap" },
    { label: "Lahmacun", value: "Lahmacun" },
    { label: "Hünkar Beğendi", value: "Hünkar Beğendi" },
    { label: "Ali Nazik Kebabı", value: "Ali Nazik Kebabı" },
    { label: "Mantı", value: "Mantı" },
    { label: "Börek", value: "Börek" },
    { label: "Döner", value: "Döner" },
    { label: "Mercimek Çorbası", value: "Mercimek Çorbası" },
    { label: "Balık Tava", value: "Balık Tava" },
    { label: "İmam Bayıldı", value: "İmam Bayıldı" },
    { label: "Ciğer Sote", value: "Ciğer Sote" },
    { label: "Simit", value: "Simit" },
    { label: "Pide", value: "Pide" },
    { label: "Kısır", value: "Kısır" },
    { label: "Muhammara", value: "Muhammara" },
    { label: "Hamsi Kuyma", value: "Hamsi Kuyma" },
    { label: "Kuzu Güveç", value: "Kuzu Güveç" },
    { label: "Karnabahar Kızartması", value: "Karnabahar Kızartması" },
    { label: "Tavuklu Pilav", value: "Tavuklu Pilav" },
    { label: "Kuzu Tandır", value: "Kuzu Tandır" },
    { label: "Kumpir", value: "Kumpir" },
    { label: "Kısır", value: "Kısır" },
    { label: "Fırın Tavuk", value: "Fırın Tavuk" },
    { label: "Mangal", value: "Mangal" },
    { label: "Baklava", value: "Baklava" },
    { label: "Kadayıf", value: "Kadayıf" },
    { label: "Künefe", value: "Künefe" },
    { label: "Fırın Makarna", value: "Fırın Makarna" },
    { label: "Fırın Tavuk", value: "Fırın Tavuk" },
    { label: "Çiğ Köfte", value: "Çiğ Köfte" },
    { label: "İslim Kebap", value: "İslim Kebap" },
    { label: "Kuzu İncik", value: "Kuzu İncik" },
    { label: "Hamsi Tava", value: "Hamsi Tava" },
    { label: "Karides Güveç", value: "Karides Güveç" },
    { label: "Zeytinyağlı Yaprak Sarma", value: "Zeytinyağlı Yaprak Sarma" },
    { label: "Pacanga Böreği", value: "Pacanga Böreği" },
    { label: "Tavuklu Kaşarlı Tost", value: "Tavuklu Kaşarlı Tost" },
    { label: "Manti", value: "Manti" },
    { label: "İskilip Dolması", value: "İskilip Dolması" },
    { label: "Beyti Kebap", value: "Beyti Kebap" },
    { label: "Kuzu Kelle Paça Çorbası", value: "Kuzu Kelle Paça Çorbası" },
    { label: "Çılbır", value: "Çılbır" },
    { label: "Samsun Bafra Pidesi", value: "Samsun Bafra Pidesi" },
    { label: "Havuç Tarator", value: "Havuç Tarator" },
    { label: "Ispanaklı Karnabahar", value: "Ispanaklı Karnabahar" },
  ];

  const userToken = localStorage.getItem('userToken')

  const user = jwtDecode(userToken)
  //const fullName = user.firstName + " " + user.lastName
  const userId = user.userId

  useEffect(() => {
    setCategoryOptions(CategoryOptions);
  }, []);

  useEffect(() => {
    setChangeGif(gifHello);
  }, []);

  useEffect(() => {
    if (loading) {
      setChangeGif(gifSearching);
    }
  }, [loading]);

  const order = () => {
    setLoading(true);

    axios
      .post("http://localhost:3001/order", {
        name,
        description,
        payment,
        userId
      })
      .then((response) => {
        console.log("Backend'den gelen yanıt: ", response.data);

        if (response.data.success) {
          alert('sipariş verildi')
        }
        setAnalysisResult(response.data);
      })
      .catch((error) => {
        console.error("API isteği hatası: ", error);
      })
      .finally(() => {
        setLoading(false);
        setChangeGif(gifHappy);
      });
  };


  const handleNameChange = (selectedCategory) => {
    setName(selectedCategory);
  };



  return (
    <>
      <div className="wrapper">
        <div className="content">
          <div className="container profile">
            <div
              className="profile__right"
              style={{
                display: "inline-block",
                fontSize: "20px",
                lineHeight: "40px",
              }}
            >
              <img
                style={{ position: "fixed", right: "400px", float: "right" }}
                src={changeGif}
                alt="Other GIF"
              />

              <div style={{}}>

                <div style={{ maxWidth: 600 }}>
                  <label>Foods</label>
                  <Select
                    value={name}
                    options={CategoryOptions}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    onChange={handleNameChange}
                    disabled={!name}
                    unstyled
                  ></Select>
                </div>

                <div style={{ maxWidth: 600 }}>
                  <label>Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description..."
                  />
                </div>

                <div style={{ maxWidth: 600 }}>
                  <label>Payment</label>
                  <input
                    type="text"
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                    placeholder="Enter payment..."
                  />
                </div>

                <button onClick={order} disabled={loading}>
                  {loading ? 'siparis veriliyor' : 'siparis ver'}
                </button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  );
}
