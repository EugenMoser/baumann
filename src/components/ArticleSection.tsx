import { ArticleProps } from "src/types/Product";

interface ArticleSectionProps {
  articles: ArticleProps[];
}

function ArticleSection({ articles }: ArticleSectionProps): React.JSX.Element {
  console.log("HIIIIIIIEEEER", articles);

  return (
    <>
      <h1>Article Infos</h1>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>{article.number}</li>
        ))}
      </ul>
    </>
  );
}

export default ArticleSection;
