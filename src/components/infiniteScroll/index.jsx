import "./styles.css";
import { useState, useRef, useCallback } from "react";
import { Spinner } from "./spinner";
export default function App() {
  const [cats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const page = useRef(1);
  const fetchCats = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=cats&page=${page.current}`
    );
    const data = await response.json();
    setIsLoading(false);
    page.current += 1;
    setCats((prevData) => [...prevData, ...data.data]);
  };
  const observer = useRef();
  const lastAnchor = useCallback(
    (node) => {
      console.log('dawei node', node)
      console.log('dawei isLoading', isLoading)
      /*
      dawei node null
index.jsx:22 dawei isLoading false <=== before [dep] changes
index.jsx:21 dawei node <div class=​"spinner">​…​</div>​flex
index.jsx:22 dawei isLoading true


dawei node null
index.jsx:22 dawei isLoading true
index.jsx:21 dawei node <div class=​"spinner">​…​</div>​flex
index.jsx:22 dawei isLoading false

*/
      if (!node || isLoading) return;
    
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchCats();
        }
      });
      observer.current.observe(node);
    },
    [isLoading]
  );
  return (
    <div className="App">
      <div>
        {cats.map((cat) => (
          <img
            key={cat.id}
            src={cat?.thumbnail?.lqip}
            height="150"
            width="150"
          />
        ))}
      </div>
      <Spinner referrence={lastAnchor} /> {/*haha cheating by passing uisng reference instead of ref */}
    </div>
  );
}
