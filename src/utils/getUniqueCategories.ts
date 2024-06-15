import { slugifyStr } from "./slugify";
import { getCollection, type CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

interface Category {
  category: string;
  slug: string;
  lastPost: CollectionEntry<"blog">;
}

const getUniqueCategories = async () => {
  const posts = await getCollection("blog");

  const categories: Category[] = posts
    .filter(postFilter)
    .flatMap(post => post.data.categories)
    .map(category => ({
      slug: slugifyStr(category),
      category: category,
      lastPost: posts
        .filter(p => p.data.categories.includes(category))
        .sort(
          (a, b) =>
            new Date(b.data.modDatetime as Date).getTime() -
            new Date(a.data.modDatetime as Date).getTime()
        )[0],
    }))
    .filter(
      (value, index, self) =>
        self.findIndex(category => category.category === value.category) ===
        index
    )
    .sort((categoryA, categoryB) =>
      categoryA.category.localeCompare(categoryB.category)
    );

  return categories;
};

export default getUniqueCategories;
