const fs = require('fs');
const path = require('path');

const target = path.join(
  hexo.base_dir,
  'node_modules',
  'hexo-theme-butterfly',
  'layout',
  'includes',
  'pagination.pug'
);

const patchedBlock = `  if globalPageType === 'post'
    - const getCategoryPath = function(category) { return category && (category.path || category.slug || category.name) }
    - const currentCategories = page.categories && page.categories.data ? page.categories.data.map(getCategoryPath).filter(Boolean) : []
    - const categoryTimeline = []
    - if (currentCategories.length) {
    -   site.posts.sort('date', -1).each(function(article) {
    -     const articleCategories = article.categories && article.categories.data ? article.categories.data.map(getCategoryPath).filter(Boolean) : []
    -     if (articleCategories.some(function(item) { return currentCategories.includes(item) })) {
    -       categoryTimeline.push(article)
    -     }
    -   })
    - }
    - let categoryPrev = null
    - let categoryNext = null
    - if (currentCategories.length) {
    -   const currentIndex = categoryTimeline.findIndex(function(article) { return article.path === page.path })
    -   if (currentIndex > -1) {
    -     categoryPrev = categoryTimeline[currentIndex - 1] || null
    -     categoryNext = categoryTimeline[currentIndex + 1] || null
    -   }
    - }
    - let paginationOrder = theme.post_pagination === 2 ? { prev: categoryNext, next: categoryPrev } : { prev: categoryPrev, next: categoryNext }

    nav#pagination.pagination-post`;

const postPaginationPattern = /  if globalPageType === 'post'\n[\s\S]*?\n    nav#pagination\.pagination-post/;

function patchButterflyPagination() {
  if (!fs.existsSync(target)) {
    hexo.log.warn(`Butterfly pagination template not found, skip patch: ${target}`);
    return;
  }

  const current = fs.readFileSync(target, 'utf8');

  if (current.includes(patchedBlock)) return;

  if (!postPaginationPattern.test(current)) {
    hexo.log.warn('Butterfly pagination template post block not found; skip pagination patch.');
    return;
  }

  fs.writeFileSync(target, current.replace(postPaginationPattern, patchedBlock));
  hexo.log.info('Patched Butterfly post pagination by category.');
}

patchButterflyPagination();
