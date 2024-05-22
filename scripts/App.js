import LoginButton from "./auth.js";
import { useEffect } from "react";
import { gapi } from "gapi-script";

const clientID = "176915472690-fd1ks98ttrnl59a3rdnss0btptobr463.apps.googleusercontent.com";

function App() {
    useEffect(() => {
        function start() {
            gapi.load("client:auth2", () => {
                gapi.client.init({
                    clientId: clientID,
                    scope: ""
                }).then(() => {
                    // สามารถทำสิ่งต่าง ๆ เพิ่มเติมที่ต้องการหลังจากการเริ่มต้นแล้วได้
                    console.log("Google API initialized successfully");
                }).catch((error) => {
                    console.error("Error initializing Google API:", error);
                });
            });
        }
        start();
    }, []); // ให้ useEffect ทำงานเมื่อคอมโพเนนต์ถูกโหลดเพียงครั้งเดียว

    return (
        <div className="App">
            <LoginButton />
        </div>
    );
}

export default App;
