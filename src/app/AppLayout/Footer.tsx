"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-3">SNAGIT</h2>
          <p className="text-sm">
            Your one-stop shop for the best products. Quality you can trust.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">Shop</Link>
            </li>
            <li>
              <Link href="#">About</Link>
            </li>
            <li>
              <Link href="#">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#">Electronics</Link>
            </li>
            <li>
              <Link href="#">Fashion</Link>
            </li>
            <li>
              <Link href="#">Home & Living</Link>
            </li>
            <li>
              <Link href="#">Accessories</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p className="text-sm">📍 Assam, India</p>
          <p className="text-sm">📞 +91 9876543210</p>
          <p className="text-sm">✉ support@snagit.com</p>
          <div className="flex gap-3 mt-3">
            {/* <Facebook className="cursor-pointer hover:text-white" />
            <Instagram className="cursor-pointer hover:text-white" />
            <Twitter className="cursor-pointer hover:text-white" /> */}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} SNAGIT. All rights reserved.
      </div>
    </footer>
  );
}
