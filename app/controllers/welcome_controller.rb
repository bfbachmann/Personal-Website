class WelcomeController < ApplicationController
  def index
  	@articles = Article.all.order(:created_at).reverse_order
  	@articles1to3 = @articles[1..3]
  	@articles4to6 = @articles[4..6]
  	@articles7to9 = @articles[7..9]
  end
end
