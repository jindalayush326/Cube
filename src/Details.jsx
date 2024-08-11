import React, { useEffect, useState } from "react";
import "./Details.css";

const Details = ({ activeIndex }) => {
  const [res, setRes] = useState([]);
  const [loading, setLoading] = useState(false);
  const img = "nature"; 
  const apiKey = "rmweb19xYFsInrVZXbgElAAU4Y7IyAhD6d-Pa3At5hA"; 

  const fetchRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${apiKey}&per_page=9`
      );
      const data = await response.json();
      setRes(data.results); 
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [activeIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRes((prevRes) => {
        if (prevRes.length === 0) return prevRes; // Add a check to avoid errors when the array is empty
        const randomIndex = Math.floor(Math.random() * prevRes.length);
        const randomImage = prevRes[randomIndex];
        return prevRes
          .filter((_, index) => index !== randomIndex)
          .concat(randomImage);
      });
    }, 10000);

    return () => clearInterval(intervalId);
  }, [res]);

  return (
    <div>
      <div className="customer-details">
        <h2>Customer {activeIndex + 1} Details Here</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
          aliquam ex porro odit provident, eum aspernatur unde itaque voluptatem
          consequuntur ut consectetur distinctio illum incidunt aut quas facilis
          doloribus at. Maiores est, possimus quaerat numquam incidunt in cumque
          corporis aperiam. Ipsa architecto qui velit quibusdam.
        </p>
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="image-container">
          {res.map((val) => (
            <div key={val.id}>
              <img
                className="img-fluid img-thumbnail"
                src={val.urls.small}
                alt={val.alt_description || "Unsplash Image"}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Details;
