import getNewsApiInfo from "../helpers/getNewApiInfo";
import { useState, useEffect } from "react";
import { Link } from "wouter";
const html = document.getElementById("html");

export default function News() {
  const [data, setData] = useState([]);

  const [detail, setDetail] = useState(false);
  const [articleData, setArticleData] = useState({
    title: "",
    author: "",
    description: "",
    content: "",
  });

  function htmlOverflow() {
    /* Modify class of the html tag depending of the openMenu State*/
    detail == true
      ? html.style.removeProperty("overflow")
      : html.style.setProperty("overflow", "hidden");
  }

  useEffect(() => {
    getNewsApiInfo()
      .then((res) => res.json())
      .then((dat) => setData(dat.articles));
  }, []);

  const handleClick = (event, articleData) => {
    event.preventDefault();

    setArticleData(() => ({
      title: articleData.title,
      author: articleData.author,
      description: articleData.description,
      content: articleData.content,
    }));

    setDetail(!detail);

    htmlOverflow();
  };
  const close = () => {
    event.preventDefault();
    setDetail(!detail);
    htmlOverflow();
  };
  return (
    <div className="noticias">
      <h2 className="temperatura-title">Noticias</h2>
      <div className="noticias-container">
        {data.map((article) => {
          return (
            <div className="article-card" key={article.url}>
              <p className="aticle-title"> {article.title}</p>
              <p className="aticle-description">{article.description}</p>
              <button
                className="buttom article-button"
                onClick={(event) => handleClick(event, article)}
              >
                Ver Noticia
              </button>
            </div>
          );
        })}
      </div>
      {detail == true ? (
        <>
          <div className="article-detail">
            <svg
              name="close"
              viewBox="0 0 512 512"
              className="close"
              onClick={() => close(event)}
            >
              <path
                className=""
                d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24   0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0  0034-34z"
              ></path>
            </svg>

            <div className="card-detail">
              <h3>{articleData.title}</h3>
              <p>Autor: {articleData.author}</p>
              <h3>Descripción</h3>
              <p>{articleData.description}</p>
              <h3>Contenido</h3>
              <p>{articleData.content}</p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
