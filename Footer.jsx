import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <a href="#home" className="wordmark"><span className="wordmark-mark">i.</span> irosha<span className="wordmark-period">/</span></a>
      <span>Made with curiosity · Sri Lanka</span>
      <a href="#home" className="back-top">Back to top <ArrowUpRight size={14} /></a>
      <span className="footer-copy">© {new Date().getFullYear()} Irosha</span>
    </footer>
  );
}
