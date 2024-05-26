import { Button } from '@/components/ui/button';
import React from 'react'
import axios from 'axios'

function Wallet() {
    const amount = 500;
    const currency = "INR";
    const receiptId = "qwsaq1";
    const [order, setOrder] = React.useState(null);
    let userData = {
        "displayName": "User",
        "displayPicture": "dummy.png",
        "email": "S",
    };
    if (localStorage.getItem("devxpairs") != null) {
        userData = JSON.parse(localStorage.getItem("devxpairs"));
    }
    const [userInfo, setUserInfo] = React.useState(userData);

    async function RazorpayPaymentInteg() {
        let data = '';
        let config = {
            method: 'get',
            body: JSON.stringify({
                amount,
                currency,
                receipt: receiptId,
            }),
            maxBodyLength: Infinity,
            url: 'http://localhost:3001/payment',
            headers: {},
            data: data
        };

        await axios.request(config)
            .then((response) => {
                setOrder(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        if (order) {
            var options = {
                key: "rzp_test_aij1VSFIpBU1C5",
                amount,
                currency,
                name: "Code Pairs",
                description: "Test Transaction",
                image: "https://master--code-pairs.netlify.app/assets/user-1582c938.png",
                order_id: order.id,
                handler: async function (response) {
                    const body = {
                        ...response,
                    };

                    const validateRes = await fetch(
                        "http://localhost:3001/validate",
                        {
                            method: "post",
                            body: JSON.stringify(body),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const jsonRes = await validateRes.json();
                    console.log(jsonRes);
                    if (jsonRes.msg === "success") {

                    } else {
                        alert("Payment Failed");
                    }
                },
                prefill: {
                    name: userInfo.displayName, //your customer's name
                    email: userInfo.email, //your customer's email
                },
                notes: {
                    address: "Code Pairs Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
            rzp1.open();

        }

    };
    async function getUserInfo() {
        var instance = new Razorpay({ key_id: 'rzp_test_aij1VSFIpBU1C5', key_secret: '9CZ9neRMXoNeEKAZiy9cdMTJ' })
        const data = await instance.orders.fetchPayments(order.id)
        console.log(data);
    }

    return (
        <>
            <Button onClick={RazorpayPaymentInteg}>Pay Now</Button>


        </>
    )
}

export default Wallet;