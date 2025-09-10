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
    setCats((prevData) => [...prevData, ...data.data]);//...data.data,...data.data,...data.data
  };
  const observer = useRef(); //以下是老师的做法
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
    [isLoading]  //以上是老师的做法，好处是每次isLoading变化，我都disconnect and observe一次，一个page的数据量少，多invoke几次，直至loader在viewport边际外
  );
  // const observer = useRef();
  // const lastAnchor = useCallback(
  //   (node) => {
  //     console.log('dawei node', node)
  //     console.log('dawei isLoading', isLoading)
    
  //     if (observer.current) {console.log('haha'); observer.current.disconnect()};
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting) {
  //         fetchCats();
  //       }
  //     });
  //     observer.current.observe(node);
  //   },
  //   [] //以上是我的做法，从头到外fun只运行了一次，数据量少的时候，loader显示进入vieport后也不动了.数据量多的时候，loader会到viewport以外，然后每拉一次send one request
  // );
  return (
    <div className="App">
      <div>
        {cats.map((cat, i) => (
          <img
            key={i}
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
