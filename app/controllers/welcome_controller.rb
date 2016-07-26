class WelcomeController < ApplicationController
  def index
  	articles = Article.last(6).reverse
  	@articles1to3 = articles[1..3]
  	@articles4to6 = articles[4..6]
  	@photos = Photo.all

  	url = "https://github.com/bfbachmann.atom"
	@feed = Feedjira::Feed.fetch_and_parse url
  end
end
