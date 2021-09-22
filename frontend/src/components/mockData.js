export const blogPageData = {
  page_type: "BlogPage",
  page_content: {
    id: 3,
    slug: "blogpage",
    title: "BlogPage",
    url: "/",
    last_published_at: "2021-08-11T02:44:45.918000Z"
  },
  categories_list: [
    {
      name: "Programming",
      slug: "programming",
      url: "/category/programming/"
    },
    {
      name: "Life",
      slug: "life",
      url: "/category/life/"
    }
  ],
  tags_list: [
    {
      name: "Django",
      slug: "django",
      url: "/tag/django/"
    },
    {
      name: "Wagtail",
      slug: "wagtail",
      url: "/tag/wagtail/"
    },
    {
      name: "React",
      slug: "react",
      url: "/tag/react/"
    }
  ],
  children_pages: [
    {
      page_type: "PostPage",
      page_content: {
        id: 4,
        slug: "postpage1",
        title: "PostPage1",
        url: "/postpage1/",
        last_published_at: "2021-08-11T02:52:16.766000Z",
        tags: [
          {
            name: "Django",
            slug: "django",
            id: 1
          }
        ],
        categories: [
          {
            name: "Programming",
            slug: "programming",
            id: 1
          }
        ],
        body: [
          {
            type: "h1",
            value: "The Zen of Wagtail",
            id: "886b6fb8-472a-47b0-9bef-2317ea04799a"
          },
          {
            type: "paragraph",
            value: "<p>Wagtail has been born out of many years of experience building websites, learning approaches that work and ones that don’t, and striking a balance between power and simplicity, structure and flexibility. We hope you’ll find that Wagtail is in that sweet spot.</p>",
            id: "6b051ad8-d1ba-4dab-84be-1d30b4e272e9"
          },
          {
            type: "image_carousel",
            value: [
              {
                url: "/media/images/image_2.original.jpg",
                width: 1280,
                height: 853,
                alt: "image_2.jpeg"
              },
              {
                url: "/media/images/image_1.original.jpg",
                width: 1280,
                height: 853,
                alt: "image_1.jpeg"
              }
            ],
            id: "7231f723-5770-4173-a17e-a86a0b68bac1"
          },
          {
            type: "image_text",
            value: {
              reverse: false,
              text: "<p>Wagtail is not an instant website in a box.</p><p>You can’t make a beautiful website by plugging off-the-shelf modules together - expect to write code.</p>",
              image: {
                url: "/media/images/image_3.width-800.jpg",
                width: 800,
                height: 533,
                alt: "image_3.jpeg"
              }
            },
            id: "b32bc7bb-0e71-448b-968d-67be3492659f"
          },
          {
            type: "image_text",
            value: {
              reverse: true,
              text: "<p>A CMS should get information out of an editor’s head and into a database, as efficiently and directly as possible.</p>",
              image: {
                url: "/media/images/image_1.width-800.jpg",
                width: 800,
                height: 533,
                alt: "image_1.jpeg"
              }
            },
            id: "ab6f3090-b05d-4c07-a3b0-c105ddf823a6"
          }
        ],
        header_image: {
          url: "/media/images/image_3.max-1000x800.jpg",
          width: 1000,
          height: 666,
          alt: "image_3.jpeg"
        },
        content_type_str: "blog.postpage"
      }
    },
    {
      page_type: "PostPage",
      page_content: {
        id: 5,
        slug: "postpage2",
        title: "PostPage2",
        url: "/postpage2/",
        last_published_at: "2021-08-11T02:51:51.605000Z",
        tags: [
          {
            name: "React",
            slug: "react",
            id: 3
          }
        ],
        categories: [],
        body: [
          {
            type: "h1",
            value: "The Zen of Wagtail",
            id: "886b6fb8-472a-47b0-9bef-2317ea04799a"
          },
          {
            type: "paragraph",
            value: "<p>Wagtail has been born out of many years of experience building websites, learning approaches that work and ones that don’t, and striking a balance between power and simplicity, structure and flexibility. We hope you’ll find that Wagtail is in that sweet spot.</p>",
            id: "6b051ad8-d1ba-4dab-84be-1d30b4e272e9"
          },
          {
            type: "image_carousel",
            value: [
              {
                url: "/media/images/image_2.original.jpg",
                width: 1280,
                height: 853,
                alt: "image_2.jpeg"
              },
              {
                url: "/media/images/image_1.original.jpg",
                width: 1280,
                height: 853,
                alt: "image_1.jpeg"
              }
            ],
            id: "7231f723-5770-4173-a17e-a86a0b68bac1"
          },
          {
            type: "image_text",
            value: {
              reverse: false,
              text: "<p>Wagtail is not an instant website in a box.</p><p>You can’t make a beautiful website by plugging off-the-shelf modules together - expect to write code.</p>",
              image: {
                url: "/media/images/image_3.width-800.jpg",
                width: 800,
                height: 533,
                alt: "image_3.jpeg"
              }
            },
            id: "b32bc7bb-0e71-448b-968d-67be3492659f"
          },
          {
            type: "image_text",
            value: {
              reverse: true,
              text: "<p>A CMS should get information out of an editor’s head and into a database, as efficiently and directly as possible.</p>",
              image: {
                url: "/media/images/image_1.width-800.jpg",
                width: 800,
                height: 533,
                alt: "image_1.jpeg"
              }
            },
            id: "ab6f3090-b05d-4c07-a3b0-c105ddf823a6"
          }
        ],
        header_image: {
          url: "/media/images/image_2.max-1000x800.jpg",
          width: 1000,
          height: 666,
          alt: "image_2.jpeg"
        },
        content_type_str: "blog.postpage"
      }
    }
  ],
  paginator: {
    per_page: 2,
    current_page: 1,
    num_pages: 2
  },
  filter_meta: {
    filter_type: null,
    filter_term: null
  }
}
