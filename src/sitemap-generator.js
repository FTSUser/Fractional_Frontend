require("babel-register")({
  presets: ["es2015", "react"],
});

const router = require("./router").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
  return new Sitemap(router)
    .build("https://vigorous-keller-71397f.netlify.app")
    .save("./public/sitemap.xml");
}

generateSitemap();

// require("babel-register");

// const router = require("./router").default;
// const Sitemap = require("react-router-sitemap").default;

// const filterConfig = {
//   isValid: false,
//   rules: [/\/auth/, /\*/],
// };

// // Setup some random projects
// const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
// const lotOfNames = [];

// function produceItem(arr, char) {
//   return arr.map((c) => {
//     lotOfNames.push(`${c}-${char}`);
//   });
// }

// alphabet.map((c) => produceItem(alphabet, c));

// const projects = {
//   projectName: lotOfNames,
//   achievement: lotOfNames,
// };

// const paramsConfig = {
//   "/projects/:projectName": [
//     { projectName: "hello-world" },
//     { projectName: "second-project" },
//     { projectName: ["third-project", "fourth-project"] },
//     projects,
//   ],
//   "/projects/:projectName/view": [
//     { projectName: "hello-world" },
//     { projectName: "second-project" },
//     { projectName: ["third-project", "fourth-project"] },
//     projects,
//   ],
//   "/projects/:projectName/achievements/:achievement": [
//     { projectName: "hello-world" },
//     { projectName: "second-project" },
//     { projectName: ["third-project", "fourth-project"] },
//     projects,
//   ],
// };

// new Sitemap(router)
//   .filterPaths(filterConfig)
//   .applyParams(paramsConfig)
//   .build("http://localhost:3000", { limitCountPaths: 5000 })
//   .save("./public/sitemap.xml");

// const path = require("path");
// const sm = require("sitemap");
// const fs = require("fs");

// // import config from ".";
// // import data from "../data.json";
// // import {
// //   getAllPostsForListing,
// //   getAllCategoriesForListing,
// // } from "../selectors/data";

// const OUTPUT_FILE = path.resolve(__dirname, "..", "public", "sitemap.xml");

// const postsUrls = Array(10)
//   .fill()
//   .map((post) => {
//     // const handle = [
//     //   post.handle.substring(0, 4),
//     //   post.handle.substring(5, 7),
//     //   post.handle.substring(8, 10),
//     //   post.handle.substring(11),
//     // ].join("/");
//     return {
//       url: `http://localhost:3000/abc`,
//       changefreq: "weekly",
//       priority: 0.8,
//     };
//   });

// const categoriesUrls = Array(10)
//   .fill()
//   .map((category) => ({
//     url: `http://localhost:3000/abc`,
//     changefreq: "weekly",
//     priority: 0.8,
//   }));

// const sitemap = sm.createSitemap({
//   hostname: "http://localhost:3000/abc",
//   cacheTime: 600000, //600 sec (10 min) cache purge period
//   urls: [
//     { url: "/", changefreq: "weekly", priority: 1 },
//     { url: "/archive", changefreq: "weekly", priority: 0.5 },
//     { url: "/search", changefreq: "weekly", priority: 0.5 },
//     { url: "/about-me", changefreq: "monthly", priority: 0.5 },
//     ...postsUrls,
//     ...categoriesUrls,
//   ],
// });

// fs.writeFileSync(OUTPUT_FILE, sitemap.toString());

// console.log(`Sitemap written at ${OUTPUT_FILE}`);
