async function merge() {
  const urls = document.getElementById("feeds").value.split("\n");
  let items = [];

  for (let url of urls) {
    const res = await fetch(
      "https://api.allorigins.win/raw?url=" + encodeURIComponent(url)
    );
    const text = await res.text();
    const xml = new DOMParser().parseFromString(text, "text/xml");

    xml.querySelectorAll("item").forEach(item => {
      items.push(item);
    });
  }

  let rss =
`<rss version="2.0">
<channel>
<title>Birleşik RSS</title>
${items.map(i => i.outerHTML).join("\n")}
</channel>
</rss>`;

  document.getElementById("output").textContent = rss;
}
