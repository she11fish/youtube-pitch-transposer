import React from "react";

const Footer = () => {
  return (
    <footer style={{ textAlign: "center", padding: "1rem", fontSize: "0.9rem" }}>
      <p>© 2023 YouTube Pitch Transposer. All rights reserved.</p>
      <p>
        Open-sourced under the{" "}
        <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">
          MIT License
        </a>
        .
      </p>
      <p>
        <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
          GitHub Repository
        </a>
      </p>
    </footer>
  );
};

export default Footer;