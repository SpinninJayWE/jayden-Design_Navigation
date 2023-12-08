import { css } from "@emotion/react";

export default css`
  div {
    font-family: 'Arial', sans-serif;
    color: #333;
    line-height: 1.6;
  }

  /* 重新定义标题样式 */
  h1 {
    font-size: 2.5em;
    margin-bottom: 0.5em;
  }

  h2 {
    font-size: 2em;
    margin-bottom: 0.5em;
  }

  h3 {
    font-size: 1.8em;
    margin-bottom: 0.5em;
  }

  h4 {
    font-size: 1.5em;
    margin-bottom: 0.5em;
  }

  h5 {
    font-size: 1.2em;
    margin-bottom: 0.5em;
  }

  h6 {
    font-size: 1em;
    margin-bottom: 0.5em;
  }

  /* 重新定义表格样式 */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1em;
    border: 1px solid #ddd;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  /* 添加一些通用样式 */
  p {
    font-size: 16px;
    line-height: 2;
    margin-bottom: 1em;
  }

  a {
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  /* 重新定义无序列表样式 */
  ul {
    list-style-type: disc; /* 使用默认实心圆点 */
    padding: 0;
    margin-bottom: 1em;
  }

  ul li {
    margin-bottom: 0.5em;
  }

  /* 重新定义有序列表样式 */
  ol {
    list-style-type: decimal; /* 使用数字 */
    counter-reset: my-counter; /* 重置计数器 */
    padding: 0;
    margin-bottom: 1em;
  }

  ol li {
    counter-increment: my-counter; /* 增加计数器 */
    margin-bottom: 0.5em;
  }
`