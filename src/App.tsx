import React from "react";
import "./styles/main.css";
import BlogPost1 from "./components/BlogPost1";
import BlogPost2 from "./components/BlogPost2";

function App() {
    return (
        <div className="App">
            <BlogPost1
                title="HeartBoids"
                subtitle="Creative Embedded Systems - Module 1"
                date={new Date(2024, 1, 18, 20, 1)}
                postNo={1}
                demo="https://www.youtube-nocookie.com/embed/NogfVlpFZs0?si=awBfx0Gx3MLE67HU"
            ></BlogPost1>
            <BlogPost2 title="Serial Flight Simulator" subtitle="Creative Embedded Systems - Module 2" date={new Date(2024, 2, 27, 19, 10)} postNo={2}
                       demo={"https://www.youtube.com/embed/JOeE-m3F6E4?si=4Uy9ZNWoAED-Dn4H"}/>

        </div>
    );
}

export default App;
