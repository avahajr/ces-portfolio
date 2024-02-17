import React from "react";
import "./styles/main.css";
import BlogPost from "./components/BlogPost";
function App() {
  return (
    <div className="App">
      <BlogPost
        title="Heartboids"
        subtitle="Creative Embedded Systems - Module 1"
        date={new Date()}
        postNo={1}
      ></BlogPost>
    </div>
  );
}
export default App;
