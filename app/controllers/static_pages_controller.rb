class StaticPagesController < ApplicationController

  def about
  end

  def projects
  end

  def visualizer
  	render layout: "visualizer"
  end

end