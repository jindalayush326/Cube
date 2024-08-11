import "./App.css";
import CustomerList from "./List";
import CustomerDetails from "./Details";
import { useCallback, useRef, useState } from "react";

function App() {
  const [customers, setCustomers] = useState(
    new Array(5).fill().map((_, index) => `Customer ${index + 1}`)
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const leftDivRef = useRef(null);

  function handleActiveDiv(index) {
    setActiveIndex(index);
  }

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = leftDivRef.current;
    if (scrollTop + clientHeight >= scrollHeight -1 ) {
      setIsLoading(true)
      setTimeout(()=> {
        setCustomers((prevCustomers) =>
        prevCustomers.concat(
          new Array(5).fill().map((_, index) => `Customer ${prevCustomers.length + index + 1}`)
        )
      );
      setIsLoading(false)
      }, 1000)
    }
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "space-around" }}
      className="App"
    >
      <div
      className="left-div"
        style={{
          width: "30%",
          overflowY: "auto",
          maxHeight: "calc(100vh)",
        }}
        ref={leftDivRef}
        onScroll={handleScroll}
      >
        <CustomerList
          customers={customers}
          activeIndex={activeIndex}
          handleActiveDiv={handleActiveDiv}
          setCustomers={setCustomers}
        />
        {isLoading && <h2>Loading...</h2>}
      </div>
      <div className="right-div" style={{ width: "70%", backgroundColor: "#f9f9f9" }}>
        <CustomerDetails activeIndex={activeIndex} />
      </div>
    </div>
  );
}

export default App;