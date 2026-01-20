export default function Footer() {
  return (
    <footer className="text-center mt-12 text-xs text-gray-500">
      <p className="mb-2">100% Client-side • No Server Needed</p>
      <p className="mb-1">
        Made by{' '}
        <a
          href="https://wooncloud.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          wooncloud
        </a>
      </p>
      <p className="text-xs">© {new Date().getFullYear()} BitLens. All rights reserved.</p>
    </footer>
  );
}
