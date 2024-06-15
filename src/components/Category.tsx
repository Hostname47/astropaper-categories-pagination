import { descriptions } from "@pages/categories/descriptions";
import { slugifyStr } from "@utils/slugify";
import type { CollectionEntry } from "astro:content";
import React from "react";

type CategoryProps = {
  title: string;
  lastPost?: CollectionEntry<"blog">;
};

type CategoryKeys = keyof typeof descriptions;

function Category({ title, lastPost }: CategoryProps) {
  return (
    <li className="my-6">
      <a
        href={`/categories/${slugifyStr(title)}`}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        <h2>{title}</h2>
      </a>
      <div className="my-1 flex gap-1">
        <a href={`/posts/${lastPost?.slug}`} className="text-sm">
          <b>Lastest post</b>: {lastPost?.data.title}
        </a>{" "}
      </div>
      <p className="text-sm">
        <b>Description</b>:{" "}
        {descriptions[title as CategoryKeys] ??
          `Posts relevant to everyting related to ${title.toLowerCase()} `}
      </p>
    </li>
  );
}

export default Category;
