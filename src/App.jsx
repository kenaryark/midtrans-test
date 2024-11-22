import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState("");

  const dataPayment = {
    nama: "Ken",
    order_id: "order-10",
    total: 100000,
    no_telp: "081292502255",
    item: "PS 5",
    qty: 1,
  };

  const process = async () => {
    try {
      const response = await axios.post(
        // "http://localhost:5000/api/process-transaction",
        "https://consolerentapideploytest-production.up.railway.app/api/process-transaction",
        dataPayment,
        { withCredentials: true }
      );

      const result = response.data;
      console.log(result);
      setToken(result.token);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          localStorage.setItem("Pembayaran", JSON.stringify(result));
        },
        onPending: (result) => {
          localStorage.setItem("Pembayaran", JSON.stringify(result));
        },
        onError: (error) => {
          console.log(error);
          setToken("");
        },
        onClose: () => {
          console.log("Anda belum menyelesaikan pembayaran");
          setToken("");
        },
      });
    }
  }, [token]);

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = "SB-Mid-client-wJ_pLXueR21FUDe9";
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={process}>proses</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
