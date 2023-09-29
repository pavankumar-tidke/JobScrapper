from scrapfly import ScrapflyClient, ScrapeConfig

client = ScrapflyClient(key="YOUR_API_KEY")
result = client.scrape(ScrapeConfig(
    url="https://www.indeed.com/jobs?q=python&l=Texas",
    asp=True,
    # ^ enable Anti Scraping Protection
))
print(result.content)  # print page HTML