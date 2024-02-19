import React from "react";
import "./styles/main.css";
import BlogPost from "./components/BlogPost";
function App() {
  return (
    <div className="App">
      <BlogPost
        title="HeartBoids"
        subtitle="Creative Embedded Systems - Module 1"
        date={new Date(2024, 1, 18, 20, 1)}
        postNo={1}
        demo="https://www.youtube-nocookie.com/embed/NogfVlpFZs0?si=awBfx0Gx3MLE67HU"
      ></BlogPost>
    </div>
  );
}
export default App;
