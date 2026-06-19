const fs = require('fs');
const path = require('path');

const target = path.join(
  __dirname,
  '..',
  'node_modules',
  'hexo-theme-butterfly',
  'layout',
  'includes',
  'pagination.pug'
);

const patchedBlock = `  if globalPageType === 'post'
    - const currentCategory = page.categories && page.categories.data && page.categories.data.length ? page.categories.data[0].path : null
    - const categoryTimeline = []
    - if (currentCategory) {
    -   site.posts.sort('date', -1).each(function(article) {
    -     if (article.categories && article.categories.data && article.categories.data.some(function(item) { return item.path === currentCategory })) {
    -       categoryTimeline.push(article)
    -     }
    -   })
    - }
    - let categoryPrev = page.next
    - let categoryNext = page.prev
    - if (currentCategory) {
    -   const currentIndex = categoryTimeline.findIndex(function(article) { return article.path === page.path })
    -   if (currentIndex > -1) {
    -     categoryPrev = categoryTimeline[currentIndex - 1] || null
    -     categoryNext = categoryTimeline[currentIndex + 1] || null
    -   }
    - }
    - let paginationOrder = theme.post_pagination === 2 ? { prev: categoryNext, next: categoryPrev } : { prev: categoryPrev, next: categoryNext }

    nav#pagination.pagination-post`;

const originalBlock = `  if globalPageType === 'post'
    - let paginationOrder = theme.post_pagination === 2 ? { prev: page.prev, next: page.next } : { prev: page.next, next: page.prev }

    nav#pagination.pagination-post`;

if (!fs.existsSync(target)) {
  console.warn(`Butterfly pagination template not found, skip patch: ${target}`);
  process.exit(0);
}

const current = fs.readFileSync(target, 'utf8');

if (current.includes(patchedBlock)) {
  process.exit(0);
}

if (!current.includes(originalBlock)) {
  console.warn('Butterfly pagination template shape changed; skip pagination patch.');
  process.exit(0);
}

fs.writeFileSync(target, current.replace(originalBlock, patchedBlock));
