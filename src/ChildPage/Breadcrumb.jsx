import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Breadcrumb = ({ paths }) => {
  return (
    <nav className="text-gray-600 text-sm mb-4" aria-label="breadcrumb">
      <ol className="flex items-center space-x-1">
        {paths.map((path, index) => (
          <li key={index} className="flex items-center">
            <a
              href={path.link}
              className="hover:text-rose-500 transition-colors"
            >
              {path.name}
            </a>
            {index < paths.length - 1 && (
              <FontAwesomeIcon icon={faAngleRight} className="mx-2" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
