(function () {
  var ticking = false

  function getHeadingIdFromLink(link) {
    var href = link.getAttribute('href') || ''
    if (href.charAt(0) !== '#') return ''

    try {
      return decodeURIComponent(href.slice(1))
    } catch (e) {
      return href.slice(1)
    }
  }

  function setActiveToc(link, tocContent) {
    tocContent.querySelectorAll('.active').forEach(function (item) {
      item.classList.remove('active')
    })

    if (!link) return

    link.classList.add('active')

    var parent = link.parentNode
    while (parent && !parent.matches('.toc')) {
      if (parent.matches && parent.matches('li')) parent.classList.add('active')
      parent = parent.parentNode
    }

    var sidebarHeight = tocContent.clientHeight
    var itemOffsetTop = link.offsetTop
    var itemHeight = link.clientHeight
    var scrollTop = tocContent.scrollTop
    var middlePosition = (sidebarHeight - itemHeight) / 2
    tocContent.scrollTop = scrollTop + (itemOffsetTop - scrollTop - middlePosition)
  }

  function updateTocActive() {
    ticking = false

    var article = document.getElementById('article-container')
    var cardToc = document.getElementById('card-toc')
    if (!article || !cardToc) return

    var tocContent = cardToc.querySelector('.toc-content')
    if (!tocContent) return

    var headings = article.querySelectorAll('h1,h2,h3,h4,h5,h6')
    var tocLinks = tocContent.querySelectorAll('.toc-link')
    if (!headings.length || !tocLinks.length) return

    var activeLine = Math.min(window.innerHeight * 0.25, 220)
    var activeId = ''

    headings.forEach(function (heading) {
      if (heading.getBoundingClientRect().top <= activeLine) {
        activeId = heading.id
      }
    })

    if (!activeId) return

    var activeLink = Array.prototype.find.call(tocLinks, function (link) {
      return getHeadingIdFromLink(link) === activeId
    })

    if (activeLink && !activeLink.classList.contains('active')) {
      setActiveToc(activeLink, tocContent)
    }
  }

  function requestUpdate() {
    if (ticking) return
    ticking = true
    window.requestAnimationFrame(updateTocActive)
  }

  function init() {
    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }

  document.addEventListener('pjax:complete', requestUpdate)
})()
