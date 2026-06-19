function getCategoryKeys(post) {
  if (!post || !post.categories || !post.categories.data) return [];
  return post.categories.data
    .map(category => category.path || category.slug || category.name)
    .filter(Boolean);
}

function setCategoryPagination(page) {
  if (!page || page.layout !== 'post') return;

  const currentCategories = getCategoryKeys(page);

  if (!currentCategories.length) {
    page.prev = null;
    page.next = null;
    return;
  }

  const posts = [];
  hexo.locals.get('posts').sort('date', -1).each(post => {
    const postCategories = getCategoryKeys(post);
    if (postCategories.some(category => currentCategories.includes(category))) {
      posts.push(post);
    }
  });

  const index = posts.findIndex(post => post.path === page.path);
  page.next = index > 0 ? posts[index - 1] : null;
  page.prev = index > -1 ? posts[index + 1] || null : null;
}

hexo.extend.filter.register('template_locals', function applyCategoryPagination(locals) {
  setCategoryPagination(locals.page);
  return locals;
});
