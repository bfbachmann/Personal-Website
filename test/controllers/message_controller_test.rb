require 'test_helper'

class MessageControllerTest < ActionController::TestCase
  test "should get new" do
    get :new
    assert_response :success
  end

  test "should get create" do
    get :create
    assert_response :success
  end

  test "should get message_params" do
    get :message_params
    assert_response :success
  end

end