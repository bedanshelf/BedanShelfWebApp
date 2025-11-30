export default function Footer() {
  return (
    <footer className="bg-textdark text-background py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between">
        <div>
          <h2 className="text-lg font-bold text-card">Bedan BookShop</h2>
          <p className="text-sm mt-2 max-w-xs text-textmuted">
            Your trusted online book store for San Beda SHS students.
          </p>
        </div>

        <div className="mt-6 md:mt-0">
          <h3 className="font-semibold text-card mb-2">Quick Links</h3>
          <ul className="space-y-2 text-textmuted">
            <li className="hover:text-secondary cursor-pointer">Home</li>
            <li className="hover:text-secondary cursor-pointer">Books</li>
            <li className="hover:text-secondary cursor-pointer">About</li>
            <li className="hover:text-secondary cursor-pointer">Contact</li>
          </ul>
        </div>

        <div className="mt-6 md:mt-0">
          <h3 className="font-semibold text-card mb-2">Contact</h3>
          <p className="text-sm text-textmuted">
            San Beda University – SHS Dept.
          </p>
          <p className="text-sm text-textmuted">
            Email: bookstore@sanbeda.edu.ph
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-secondary mt-6">
        © {new Date().getFullYear()} Bedan BookShop. All rights reserved.
      </p>
    </footer>
  );
}
