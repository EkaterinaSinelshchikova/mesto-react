import React from "react";

export function Footer(props) {
  return (
    <footer className="footer">
      <span className="footer__copyright">&copy; {new Date().getFullYear()} Mesto Russia</span>
    </footer>
  );
}
