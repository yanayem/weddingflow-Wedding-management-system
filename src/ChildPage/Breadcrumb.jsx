import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathnames = location.pathname.split("/").filter(Boolean);

  const crumbs = [
    { name: "Home", link: "/" },
    ...pathnames.map((item, index) => {
      const link = "/" + pathnames.slice(0, index + 1).join("/");
      return {
        name: item.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        link,
      };
    }),
  ];

  if (location.pathname === "/") return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600">
      {crumbs.map((c, i) => (
        <span key={i}>
          <button
            onClick={() => navigate(c.link)}
            className="hover:text-rose-500"
          >
            {c.name}
          </button>
          {i < crumbs.length - 1 && " / "}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
