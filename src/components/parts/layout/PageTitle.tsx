import React from "react";

interface PageTitleProps {
    title: string,
}

const PageTitle = ({title}:PageTitleProps) => (
  <h1 className="text-3xl text-center mb-6 font-medium">{title}</h1>
);

export default PageTitle;
