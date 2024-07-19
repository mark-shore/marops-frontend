import './styles/globals.css';
import './styles/spinner.css';

export const metadata = {
  title: 'MarOps Cohort Analysis',
  description: 'MarOps Cohort Analysis',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}