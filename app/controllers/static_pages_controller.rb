class StaticPagesController < ApplicationController

  def about
  end

  def projects
    render layout: "projects"
  end

  def visualizer
  	render layout: "three_demo"
  end

  def particles
  	render layout: "three_demo"
  end

end