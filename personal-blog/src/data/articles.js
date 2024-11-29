import { useEffect, useState } from "react";

// 自动导入所有markdown文件
const importAll = (r) => {
  let files = {};
  r.keys().forEach((key) => {
    const fileContent = r(key).default || r(key);
    files[key] = fileContent;
  });
  return files;
};

// 使用 require.context 自动导入 articles 目录下的所有 .md 文件
const markdownFiles = importAll(require.context("./articles", true, /\.md$/));

// 从文件路径中提取年份
const extractDateFromPath = (path) => {
  const match = path.match(/\/(\d{4})\//);
  if (!match) return null;
  const year = parseInt(match[1]);
  return { year };
};

// 简单的frontmatter解析器
const parseFrontmatter = (content) => {
  console.log("#########", content);
  if (!content || typeof content !== "string") {
    console.error("Invalid content provided to parseFrontmatter");
    return null;
  }

  try {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);

    if (!match) {
      console.error("No frontmatter found in content");
      return null;
    }

    const frontmatter = {};
    const lines = match[1].split("\n");

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith("#")) {
        const colonIndex = trimmedLine.indexOf(":");
        if (colonIndex !== -1) {
          const key = trimmedLine.slice(0, colonIndex).trim();
          const value = trimmedLine.slice(colonIndex + 1).trim();
          frontmatter[key] = value;
        }
      }
    });

    return {
      frontmatter,
      content: content.replace(frontmatterRegex, "").trim(),
    };
  } catch (error) {
    console.error("Error parsing frontmatter:", error);
    return null;
  }
};

async function fetchMarkdownContent(path) {
  return new Promise((resolve, reject) => {
    fetch(path)
      .then((response) => response.text())
      .then((data) => {
        // 这里的data就是读取到的Markdown文档内容
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// 加载所有文章数据
const loadArticles = async () => {
  try {
    const articlesPromises = Object.entries(markdownFiles).map(
      async ([path, content], index) => {
        try {
          if (!content) {
            console.error(`No content found for file at ${path}`);
            return null;
          }

          const con = await fetchMarkdownContent(content);
          const parsed = parseFrontmatter(con);
          if (!parsed) {
            console.error(`Failed to parse article at ${path}`);
            return null;
          }

          const { frontmatter, content: articleContent } = parsed;
          const dateInfo = extractDateFromPath(path);

          if (
            !frontmatter.title ||
            !frontmatter.date ||
            !frontmatter.category ||
            !dateInfo
          ) {
            console.error(
              `Missing required frontmatter fields in ${path}`,
              frontmatter
            );
            return null;
          }

          // 提取摘要（第一个非空、非标题段落）
          const summary =
            articleContent
              .split(/\r?\n/)
              .find((line) => line.trim() && !line.startsWith("#"))
              ?.trim() || "";

          return {
            id: index + 1,
            title: frontmatter.title,
            date: frontmatter.date,
            category: frontmatter.category,
            path: path,
            content: articleContent,
            summary: summary,
            year: dateInfo.year,
            month: parseInt(frontmatter.date.split("-")[1]),
          };
        } catch (error) {
          console.error(`Error processing article ${path}:`, error);
          return null;
        }
      }
    );

    // 等待所有文章处理完成
    const articles = await Promise.all(articlesPromises);

    // 过滤无效文章并按日期排序
    const validArticles = articles
      .filter((article) => article !== null)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log("Processed articles:", validArticles);
    return validArticles;
  } catch (error) {
    console.error("Error in loadArticles:", error);
    return [];
  }
};

// 获取按年份分组的文章
export const getArticlesByYear = (articles) => {
  const groupedArticles = {};
  articles.forEach((article) => {
    if (!groupedArticles[article.year]) {
      groupedArticles[article.year] = [];
    }
    groupedArticles[article.year].push(article);
  });
  return groupedArticles;
};

// 获取按分类分组的文章
export const getArticlesByCategory = (articles) => {
  const groupedArticles = {};
  articles.forEach((article) => {
    if (!groupedArticles[article.category]) {
      groupedArticles[article.category] = [];
    }
    groupedArticles[article.category].push(article);
  });
  return groupedArticles;
};

// 自定义Hook来获取文章数据
export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles()
      .then((loadedArticles) => {
        setArticles(loadedArticles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error in useArticles:", error);
        setLoading(false);
      });
  }, []);

  return { articles, loading };
};

export default useArticles;
