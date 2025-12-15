import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  interface NavItem {
    name: string;
    path: string;
    roles?: string[]; // optional: roles allowed to see this link
  }

  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
  ];

  const navigateTo = (route: string) => {
    navigate(route, { replace: true });
  };

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
            {navItems.map((item) => (
              <li
                key={item.name + item.path}
                onClick={() => navigateTo(item.path)}
                className="hover:text-secondary cursor-pointer"
              >
                {item.name}
              </li>
            ))}
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
