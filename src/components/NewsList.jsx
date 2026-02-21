import "./NewsList.css"
const NewsList = ({articles}) => {
    if(articles.length === 0) return null;
    return (
        <div className="news-container">
            <h3 style={{textAlign: 'center',marginBottom: '30px'}}>Local and Global Highlights 📰</h3>
            <div className="news-grid">
                {articles.map((article, index) => (
                        <article className="news-card" key={index}>
                            {article.urlToImage && <img src={article.urlToImage} className="article-image" alt="news" />}
                            <div className="news-content">
                                <h4>{article.title}</h4>
                                <p>{article.description ? article.description.slice(0,100) + "..." : "No description available for this headline."}</p>
                                <a href={article.url} target="_blank" className="read-more-btn" rel="norefferer">Read Full Story →</a>
                            </div>
                        </article>
                ))}
            </div>
        </div>
    )
}

export default NewsList;