import "./App.css";
import Carousel from "./Carousel/Carousel";

function App() {
  return (
    <>
      <div className="w-[80%] mx-auto mt-10 carousel">
        <Carousel>
          <img src="/1.avif" />
          <img src="/2.avif" />
          <img src="/3.avif" />
          <img src="/4.avif" />
          <img src="/5.avif" />
          <img src="/6.avif" />
          <img src="/7.avif" />
        </Carousel>
      </div>
    </>
  );
}

export default App;
