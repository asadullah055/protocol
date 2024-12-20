"use client";
import {
  getDocumentByAuthors,
  getDocumentByCategory,
  getDocumentByTags,
} from "@/utils/doc-utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const Sidebar = ({ docs }) => {
  const pathName = usePathname();
  const [rootNods, setRootNods] = useState([]);
  const [nonRootNodeGrouped, setNonRootNodeGrouped] = useState({});
  useEffect(() => {
    let matchesDoc = docs;
    if (pathName.includes("/tags")) {
      const tag = pathName.split("/")[2];
      matchesDoc = getDocumentByTags(docs, tag);
    } else if (pathName.includes("/author")) {
      const author = pathName.split("/")[2];
      matchesDoc = getDocumentByAuthors(docs, author);
    } else if (pathName.includes("/categories")) {
      const categories = pathName.split("/")[2];
      matchesDoc = getDocumentByCategory(docs, categories);
    }
    const roots = matchesDoc.filter((doc) => !doc.parent);
    const nonRoots = Object.groupBy(
      matchesDoc.filter((doc) => doc.parent),
      ({ parent }) => parent
    );

    const nonRootsKey = Reflect.ownKeys(nonRoots);
    nonRootsKey.forEach((key) => {
      const foundRoots = roots.find((root) => root.id === key);
      if (!foundRoots) {
        const foundInDocs = docs.find((doc) => doc.id === key);
        roots.push(foundInDocs);
      }
    });
    roots.sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    setRootNods([...roots]);
    setNonRootNodeGrouped({ ...nonRoots });
  }, [pathName]);

  /* const roots = docs.filter((doc) => !doc.parent);
  const nonRoots = Object.groupBy(
    docs.filter((doc) => doc.parent),
    ({ parent }) => parent
  );
 */

  return (
    <nav className="lg:block my-10">
      <ul>
        <div className="relative mt-3 pl-2">
          <div className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"></div>
          <div className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"></div>
          <div className="absolute left-2 h-6 w-px bg-emerald-500"></div>
          <ul role="list" className="border-l border-transparent">
            {rootNods.map((rootNode) => (
              <li key={rootNode.id} className="relative">
                <Link
                  aria-current="page"
                  className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
                  href={`/docs/${rootNode.id}`}
                >
                  <span className="truncate">{rootNode.title}</span>
                </Link>
                {nonRootNodeGrouped[rootNode.id] && (
                  <ul role="list" className="border-l border-transparent">
                    {nonRootNodeGrouped[rootNode.id].map((subRoot) => (
                      <li key={subRoot.id}>
                        <Link
                          className="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                          href={`/docs/${rootNode.id}/${subRoot.id}`}
                        >
                          <span className="truncate">{subRoot.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </ul>
    </nav>
  );
};

export default Sidebar;
