const NOTION_INTEGRATION_SECRET = '<REDACTED>';
const NOTION_PAGE_ID = '9c5721a60014478b8aeaae323681eb5d';

const baseUrl = 'https://api.notion.com/v1';

function myFunction() {
  var query = '"Apps Script" stars:">=100"';
  var url =
    'https://api.github.com/search/repositories' +
    '?sort=stars' +
    '&q=' +
    encodeURIComponent(query);

  var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  Logger.log(response);
}

function tryout_notion() {
  const url = `${baseUrl}/databases/${NOTION_PAGE_ID}/query`;
  const method = 'post';

  const payload = {
    filter: {
      property: 'Tags',
      multi_select: {
        contains: 'Zonai Device',
      },
    },
  };

  const options = {
    muteHttpExceptions: true,
    method,
    headers: {
      Authorization: `Bearer ${NOTION_INTEGRATION_SECRET}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
  };

  if (payload) {
    options.payload = JSON.stringify(payload);
  }

  Logger.log(`url: ${url}, options: ${JSON.stringify(options)}`);
  const response = JSON.parse(UrlFetchApp.fetch(url, options));
  const { results } = response;
  Logger.log(JSON.stringify(results[0]));
}
