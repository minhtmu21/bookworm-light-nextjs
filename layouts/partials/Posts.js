import config from "@config/config.json";
import { dateFormat } from "@lib/utils/dateFormat";
import { humanize, slugify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Posts = ({ posts, authors }) => {
  const { summary_length } = config.settings;
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
      {posts.map((posts, i) => (
        <div key={`key-${i}`} className={i === 0 ? "sm:col-span-2" : undefined}>
          {posts.frontmatter.image && (
            <Image
              className="rounded-lg"
              src={posts.frontmatter.image}
              alt={posts.frontmatter.title}
              width={i === 0 ? "925" : "445"}
              height={i === 0 ? "475" : "230"}
              layout="responsive"
            />
          )}
          <ul className="mt-4 text-text">
            <li className="mb-2 mr-4 inline-block">
              {authors
                .filter((author) =>
                  posts.frontmatter.author
                    .map((author) => slugify(author))
                    .includes(slugify(author.frontmatter.title))
                )
                .map((author, i) => (
                  <Link
                    href={`/authors/${slugify(author.frontmatter.title)}`}
                    key={`author-${i}`}
                  >
                    <a className="inline-block hover:text-primary">
                      <span className="mr-2 align-top">
                        <Image
                          src={author.frontmatter.image}
                          alt={posts.frontmatter.author}
                          height={25}
                          width={25}
                          className="h-6 w-6 rounded-full"
                        />
                      </span>
                      <span>{author.frontmatter.title}</span>
                    </a>
                  </Link>
                ))}
            </li>
            <li className="mb-2 mr-4 inline-block">
              {dateFormat(new Date(posts.frontmatter.date))}
            </li>
            <li className="mb-2 mr-4 inline-block">
              <ul>
                {posts.frontmatter.categories.map((category, i) => (
                  <li className="inline-block" key={`category-${i}`}>
                    <Link href={`/categories/${slugify(category)}`}>
                      <a className="mr-3 hover:text-primary">
                        &#9635; {humanize(category)}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <h3 className="mb-2">
            <Link href={`/posts/${posts.slug}`} passHref>
              <a className="block hover:text-primary">
                {posts.frontmatter.title}
              </a>
            </Link>
          </h3>
          <p className="text-text">
            {posts.content.slice(0, Number(summary_length))}...
          </p>
        </div>
      ))}
    </div>
  );
};

export default Posts;