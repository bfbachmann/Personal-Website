class WelcomeController < ApplicationController
  def index
  	articles = Article.all.order(:created_at).reverse_order
  	@articles1to3 = articles[1..3]
  	@articles4to6 = articles[4..6]
  	@photos = Photo.all

  	url = "https://github.com/bfbachmann.atom"
	@feed = Feedjira::Feed.fetch_and_parse url
  end
end
