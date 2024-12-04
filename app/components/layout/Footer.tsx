import Link from "next/link";

export default function Footer() {
    return (
      <footer className="bg-muted py-6 border-t mt-24 ">
        <div className="container text-center mx-auto px-4">
          <ul className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <li>
              <Link href="/help" className="hover:underline">
                Help
              </Link>
            </li>
            <li>
              <Link href="/status" className="hover:underline">
                Status
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:underline">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    );
  }