import React, { useState, useEffect } from "react";
import axios from "axios";
import gifHello from "../../../src/images/a-unscreen.gif";
import gifSearching from "../../../src/images/2-unscreen.gif";
import gifHappy from "../../../src/images/b-unscreen.gif";
import Select from "react-select";
import { jwtDecode } from "jwt-decode";

function Personalized() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const user = jwtDecode(token);
                const userId = user.userId


                const response = await axios.get(`http://localhost:3001/order/getorder`, { params: { userId } }, { withCredentials: true });

                console.log(response)

                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="wrapper">

            <table>
                <thead>
                    <tr>
                        <th>Sipariş ID</th>
                        <th>Tarih</th>
                        <th>Toplam Tutar</th>
                        {/* Diğer başlık sütunları eklenebilir */}
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.date}</td>
                            <td>{order.totalAmount}</td>
                            {/* Diğer veri sütunları eklenebilir */}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default Personalized;
