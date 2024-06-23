import { set } from "date-fns";

const data = [
    {
        displayName: "User",
        displayPicture: "dummy.png",
        email: "S",
        uid: "we",
    }
];


async function fetchData() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        token: localStorage.getItem("saathisessiontoken"),
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    await fetch("http://localhost:3001/validatetoken", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            data[0] = result;
        })
        .catch((error) => console.error(error));
}

fetchData();
export default data;
