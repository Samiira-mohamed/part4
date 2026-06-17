const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})

describe('favorite blog', () => {
  const blogs = [
    { title: 'Blog A', author: 'Author A', likes: 3 },
    { title: 'Blog B', author: 'Author B', likes: 10 },
    { title: 'Blog C', author: 'Author C', likes: 7 }
  ]

  test('blog with most likes is returned', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, { title: 'Blog B', author: 'Author B', likes: 10 })
  })
})

describe('most blogs', () => {
  const blogs = [
    { title: 'Blog A', author: 'Robert C. Martin', likes: 3 },
    { title: 'Blog B', author: 'Robert C. Martin', likes: 5 },
    { title: 'Blog C', author: 'Edsger W. Dijkstra', likes: 7 },
    { title: 'Blog D', author: 'Robert C. Martin', likes: 2 }
  ]

  test('author with most blogs is returned', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  const blogs = [
    { title: 'Blog A', author: 'Edsger W. Dijkstra', likes: 10 },
    { title: 'Blog B', author: 'Edsger W. Dijkstra', likes: 7 },
    { title: 'Blog C', author: 'Robert C. Martin', likes: 5 }
  ]

  test('author with most likes is returned', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})