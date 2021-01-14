import cardImage from "./assets/image_1.jpeg";
import cardImage2 from "./assets/image_2.jpeg";
import cardImage3 from "./assets/image_3.jpeg";

const richtext1 = `
<p>Wagtail has been born out of many years of experience building websites, 
learning approaches that work and ones that don’t, 
and striking a balance between power and simplicity, structure and flexibility. 
We hope you’ll find that Wagtail is in that sweet spot.</p>
`;

const mockStreamFieldData = [
  {
    type: "h2",
    value: "The Zen of Wagtail",
  },
  {
    type: "paragraph",
    value: richtext1,
  },
  {
    type: "thumbnail_gallery",
    value: [
      {
        url: cardImage,
      },
      {
        url: cardImage2,
      },
      {
        url: cardImage3,
      },
      {
        url: cardImage2,
      },
      {
        url: cardImage,
      },
    ],
  },
  {
    type: "image_carousel",
    value: [
      {
        url: cardImage2,
      },
      {
        url: cardImage3,
      },
      {
        url: cardImage2,
      },
    ],
  },
  {
    type: "h2",
    value: "ImageText Example",
  },
  {
    type: "image_text",
    value: {
      image: {
        url: cardImage,
      },
      text: `<div class="rich-text"><p><b>Wagtail</b> CMS's multi-site feature is awesome! Client can edit content of
          different sites in an efficient way.</p></div>`,
      reverse: true,
    },
  },
  {
    type: "image_text",
    value: {
      image: {
        url: cardImage,
      },
      text: `<div class="rich-text"><p><b>Wagtail</b> CMS's multi-site feature is awesome! Client can edit content of
          different sites in an efficient way.</p></div>`,
      reverse: false,
    },
  },
];

const mockPost = (mockAxios) => {

  mockAxios
    .onGet(`/api/blog/posts/?limit=2&offset=0&category=*&tag=*`).reply(200, {
    results: [{ id: 1 }, { id: 2 }],
    count: 4,
  });

  mockAxios
    .onGet(`/api/blog/posts/?limit=2&offset=2&category=*&tag=*`).reply(200, {
    results: [{ id: 3 }, { id: 4 }],
    count: 4,
  });

  mockAxios
    .onGet(`/api/blog/posts/?limit=2&offset=0&category=*&tag=react`)
    .reply(200, {
      results: [{ id: 2 }, { id: 4 }],
      count: 2,
    });

  mockAxios
    .onGet(`/api/blog/posts/?limit=2&offset=0&category=*&tag=wagtail`)
    .reply(200, {
      results: [],
      count: 0,
    });

  mockAxios
    .onGet(`/api/blog/posts/?limit=2&offset=0&category=*&tag=django`)
    .reply(200, {
      results: [],
      count: 0,
    });

  mockAxios
    .onGet(`/api/blog/posts/?limit=2&offset=0&category=programming&tag=*`)
    .reply(200, {
      results: [{ id: 1 }, { id: 3 }],
      count: 2,
    });

  mockAxios
    .onGet(`/api/blog/posts/?limit=2&offset=0&category=life&tag=*`)
    .reply(200, {
      results: [],
      count: 0,
    });

  mockAxios.onGet(`/api/cms/pages/1/`).reply(200, {
    id: 1,
    title: "Love React 1",
    excerpt: "category: programming",
    header_image_url: {
      url: cardImage,
    },
    // py datetime.strftime('%s000')
    pub_date: 1597720114000,
    body: mockStreamFieldData,
  });

  mockAxios.onGet(`/api/cms/pages/2/`).reply(200, {
    id: 2,
    title: "Love React 2",
    excerpt: "tag: react",
    header_image_url: {
      url: cardImage2,
    },
    // py datetime.strftime('%s000')
    pub_date: 1597720114002,
    body: mockStreamFieldData,
  });

  mockAxios.onGet(`/api/cms/pages/3/`).reply(200, {
    id: 3,
    title: "Love React 3",
    excerpt: "category: programming",
    header_image_url: {
      url: cardImage,
    },
    // py datetime.strftime('%s000')
    pub_date: 1597720114002,
    body: mockStreamFieldData,
  });

  mockAxios.onGet(`/api/cms/pages/4/`).reply(200, {
    id: 4,
    title: "Love React 4",
    excerpt: "tag: react",
    header_image_url: {
      url: cardImage,
    },
    // py datetime.strftime('%s000')
    pub_date: 1597720114002,
    body: mockStreamFieldData,
  });

};

const mockTag = (mockAxios) => {
  const API_REQUEST = "/api/blog/tags/";
  mockAxios.onGet(API_REQUEST).reply(200, {
    results: [
      {
        slug: "wagtail",
        name: "Wagtail",
      },
      {
        slug: "django",
        name: "Django",
      },
      {
        slug: "react",
        name: "React",
      },
    ],
  });
};

const mockCategory = (mockAxios) => {
  const API_REQUEST = "/api/blog/categories/";

  mockAxios.onGet(API_REQUEST).reply(200, {
    results: [
      {
        slug: "programming",
        name: "Programming",
      },
      {
        slug: "life",
        name: "Life",
      },
    ],
  });
};

export { mockStreamFieldData, mockCategory, mockTag, mockPost};
