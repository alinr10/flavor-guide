import OrderModel from '../models/Order.js';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyBmiAx35gZPSTEB97RFq__inXnQ8mDVlBw";
const genAI = new GoogleGenerativeAI(API_KEY);

const order = async (req, res) => {
  try {

    const { meal, userId, price } = req.body;


    console.log("meal : ", meal)


    console.log(userId, "orderr")

    const order = await OrderModel.create({
      name: meal,
      userId: userId,
      price: price
    });


    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error in order function:", error);

    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getOrder = async (req, res) => {
  try {

    const { userId } = req.query
    console.log(userId, "useraaa")
    const orders = await OrderModel.find({ userId: userId })

    console.log(orders, "getttt")

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error in order function:", error);

    res.status(500).json({ success: false, error: "Internal Server Error" });
  }





}


const run = async (menuItems) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // Her bir siparişin adını içeren bir dizi oluştur
  const orderNames = menuItems.map((item) => item.name);

  // AI'ya sormak üzere bir metin oluştur
  const prompt = `Bir müşterinin verdiği geçmiş siparişler şunlardır: ${orderNames.join(', ')}. Bu müşterinin önceki yemek siparişleridir. Bu yemeklere benzer vereceğim yemek listesinden bir tane yemek önerisi yap öneri yaparken sadece yemeğin ismini ver başka bir şey yazma. yemek listesi :  [Kumpir, İskender, Adana Kebap, Lahmacun, Hünkar Beğendi, Ali Nazik Kebabı, Baklava, Balık Tava, Beyti Kebap, Börek, Ciğer Sote, Çiğ Köfte, Çılbır, Tavuk Döner, Fırın Makarna, Fırın Tavuk, Hamsi Tava, Havuç Tarator, İmam Bayıldı, İskilip Dolması, İslim Kebap, Ispanaklı karnabahar, Kadayıf, Karides Güveç, Karnabahar Kızartması, Kavurmalı Pilav, Kısır, Kuzu Güveç, Kuzu İncik, Kuzu Kelle Paça Çorbası, Kuzu Tandır, Künefe, Mantı, Mercimek Çorbası, Muhammara, Paçanga Böreği, Patlıcan Kebabı, Patso, Pide, Samsun Bafra Pidesi, Simit, Şiş Kebap, Tavuklu Kaşarlı Tost, Tavuklu Pilav, Zeytinyağlı Yaprak Sarma]`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
};

const personalized = async (req, res) => {
  const { userId } = req.query;
  console.log(userId, "useraaa");

  try {
    const orders = await OrderModel.find({ userId: userId });

    // Siparişlerden sadece isimleri al
    const orderNames = orders.map((order) => order.name);

    // AI'ya sormak üzere bir metin oluştur
    const aiResponse = await run(orders);


    console.log(aiResponse, " ai res")
    res.json({ recommendation: aiResponse });
  } catch (error) {
    console.error("Siparişleri alma sırasında bir hata oluştu:", error);
    res.status(500).json({ error: "Bir hata oluştu." });
  }
};



export { order, getOrder, personalized }