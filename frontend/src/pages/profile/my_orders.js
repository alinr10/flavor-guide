import React, { useState, useEffect } from "react";
import axios from "axios";
import gifHello from "../../../src/images/a-unscreen.gif";
import gifSearching from "../../../src/images/2-unscreen.gif";
import gifHappy from "../../../src/images/b-unscreen.gif";
import Select from "react-select";
import { jwtDecode } from "jwt-decode";
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

function Personalized() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("userToken");
                const user = jwtDecode(token);
                const userId = user.userId

                console.log("user ", userId)


                const response = await axios.get(`http://localhost:3001/order/getorder`, {
                    params: { userId },
                    withCredentials: true
                });

                console.log(response)

                setOrders(response.data.orders);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="wrapper">


            <Paper elevation={3} style={{ margin: '20px', padding: '20px' }}>
                <Table style={{ width: '100%', color: 'white' }}>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#3f51b5' }}>
                            <TableCell style={{ width: '50%', color: 'white', fontWeight: 'bold' }}>Sipariş Adı</TableCell>
                            <TableCell style={{ width: '50%', color: 'white', fontWeight: 'bold' }}>Tarih</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.orderId}>
                                <TableCell>{order.name}</TableCell>
                                <TableCell>
                                    {new Date(order.date).toLocaleString('tr-TR', {
                                        day: 'numeric',
                                        month: 'numeric',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        second: 'numeric',
                                        timeZone: 'Europe/Istanbul',
                                    })}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

        </div>

    );
};

export default Personalized;
